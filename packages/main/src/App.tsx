import { GoogleAddress } from "@doar/shared/data/api-keys";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { doFetchAuthProfile } from "./redux/slices/authentication";
import Mentions from "./pages/apps/mentions";
import Room from "./containers/apps/ticket/room";
import { doCheckMeetingRoom } from "./redux/slices/ticket/ui";
import { clearRoom } from "./redux/slices/ticket/daily";
import { getCSRFToken } from "./api/authentication/authentication";
import Preloader from "./components/preloader";
import history from "./utils/history";

const SignIn = lazy(() => import("./pages/signin"));
const BusinessProject = lazy(() => import("./pages/business-project"));
const BusinessLocation = lazy(() => import("./pages/business-location"));
const BusinessConnectGmail = lazy(
    () => import("./pages/business-connect-gmail")
);
const InvitationSignUp = lazy(() => import("./pages/invitation-signup"));
const SignUp = lazy(() => import("./pages/signup"));
const VerifyAccount = lazy(() => import("./pages/verify-account"));
const ForgotPassword = lazy(() => import("./pages/forgot-password"));
const ResetPassword = lazy(() => import("./pages/reset-password"));
const ErrorNotFound = lazy(() => import("./pages/error-404"));
const Error500 = lazy(() => import("./pages/error-500"));
const Error503 = lazy(() => import("./pages/error-503"));
const Error505 = lazy(() => import("./pages/error-505"));
const Ticket = lazy(() => import("./pages/apps/tickets"));
const Contact = lazy(() => import("./pages/apps/contacts"));
const Settings = lazy(() => import("./pages/apps/settings"));
const Calendar = lazy(() => import("./pages/apps/calendar"));
const Leads = lazy(() => import("./pages/apps/leads"));

const App: React.FC = () => {
    // Always call to setup cookie for csrf protection.
    const dispatch = useAppDispatch();
    const [roomURL, setRoomURL] = useState("");
    const meetingRoom = useAppSelector((store) => store.ticket.daily.room);

    useEffect(() => {
        if (window.location.pathname.split("/")[1] === "invite") {
            getCSRFToken()
                .then(() => {})
                .catch(() => {});
        } else {
            getCSRFToken()
                .then(() => {
                    dispatch(doFetchAuthProfile());
                })
                .catch(() => {});
        }
    }, [dispatch]);

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${String(
            GoogleAddress
        )}&libraries=places`;
        document.body.appendChild(script);
    });

    useEffect(() => {
        if (meetingRoom?.url) {
            setRoomURL(meetingRoom?.url);
        }
    }, [meetingRoom]);
    const handleLeave = () => {
        setRoomURL("");
        dispatch(clearRoom());
        dispatch(
            doCheckMeetingRoom({
                room: roomURL,
            })
        );
    };

    return (
        <>
            <Router history={history}>
                <Suspense fallback={<Preloader />}>
                    <div>
                        {roomURL && (
                            <Room
                                url={roomURL}
                                onLeave={handleLeave}
                                callLead="Call Lead"
                            />
                        )}
                        <Switch>
                            <Route exact path="/login" component={SignIn} />
                            <Route
                                exact
                                path="/business/project"
                                component={BusinessProject}
                            />
                            <Route
                                exact
                                path="/business/location"
                                component={BusinessLocation}
                            />
                            <Route
                                exact
                                path="/business/gmail"
                                component={BusinessConnectGmail}
                            />
                            <Route
                                exact
                                path="/signup/:token?"
                                component={SignUp}
                            />
                            <Route
                                exact
                                path="/invite/:token?"
                                component={InvitationSignUp}
                            />
                            <Route
                                exact
                                path="/verify-account"
                                component={VerifyAccount}
                            />
                            <Route
                                exact
                                path="/forgot-password"
                                component={ForgotPassword}
                            />
                            <Route
                                exact
                                path="/reset-password/:token"
                                component={ResetPassword}
                            />
                            <Route
                                exact
                                path="/error-500"
                                component={Error500}
                            />
                            <Route
                                exact
                                path="/error-503"
                                component={Error503}
                            />
                            <Route
                                exact
                                path="/error-505"
                                component={Error505}
                            />
                            <Route exact path="/tickets" component={Ticket} />
                            <Route exact path="/contacts" component={Contact} />
                            <Route
                                exact
                                path="/apps/calendar"
                                component={Calendar}
                            />
                            <Route
                                exact
                                path="/tickets/:id"
                                component={Ticket}
                            />
                            <Route path="/settings" component={Settings} />
                            <Route
                                exact
                                path="/mentions"
                                component={Mentions}
                            />
                            <Route exact path="/leads/:id" component={Leads} />
                            <Route path="*" component={ErrorNotFound} />
                        </Switch>
                    </div>
                </Suspense>
            </Router>
            <ToastContainer />
            {/* <SettingsCard /> */}
        </>
    );
};

export default App;
