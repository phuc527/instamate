import { FC, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ServiceDetails from "src/components/apps/settings/services/service-details";
import OverlayScrollBar from "src/components/overlay-scroll-bar";
import { StyledContent, StyledMain } from "./style";

const Practice = lazy(
    () => import("../../../../components/apps/settings/practice")
);
const Services = lazy(() => import("src/components/apps/settings/services"));
const Notification = lazy(
    () => import("src/components/apps/settings/notification")
);
const ManageUsers = lazy(
    () => import("src/components/apps/settings/manage-users")
);
const ChannelDetail = lazy(
    () => import("src/components/apps/settings/channels/detail")
);
const Channels = lazy(() => import("src/components/apps/settings/channels"));
const Billing = lazy(() => import("src/components/apps/settings/billing"));

const Main: FC = () => {
    return (
        <StyledMain>
            <OverlayScrollBar>
                <StyledContent>
                    <Switch>
                        <Route
                            exact
                            path="/settings/practice"
                            component={Practice}
                        />
                        <Route
                            exact
                            path="/settings/billing"
                            component={Billing}
                        />
                        <Route
                            exact
                            path="/settings/services"
                            component={Services}
                        />
                        <Route
                            exact
                            path="/settings/manage-users"
                            component={ManageUsers}
                        />
                        <Route
                            exact
                            path="/settings/notification"
                            component={Notification}
                        />
                        <Route
                            exact
                            path="/settings/channels"
                            component={Channels}
                        />
                        <Route
                            exact
                            path="/settings/channels/:id/"
                            component={Channels}
                        />
                        <Route
                            exact
                            path="/settings/channels/:id/:channel"
                            component={ChannelDetail}
                        />
                        <Route
                            exact
                            path="/settings/services/:id"
                            component={ServiceDetails}
                        />
                        <Route
                            render={() => <Redirect to="/settings/practice" />}
                        />
                    </Switch>
                </StyledContent>
            </OverlayScrollBar>
        </StyledMain>
    );
};

export default Main;
