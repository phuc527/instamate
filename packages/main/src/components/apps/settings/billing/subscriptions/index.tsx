import { Button, Spinner } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { formatUnixTime } from "src/helpers/settings/invoice";
import { formatMetric, upperCaseFirstLetter } from "src/helpers/stringHelpers";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetSubscription } from "src/redux/slices/settings/billing/subscription";
import Title from "../../title";
import { StyledCard, StyledCardBody, StyledLabel } from "../style";
import CancelConfirmation from "./cancel-confirmation";
import {
    StyledCanceledText,
    StyledDetail,
    StyledDetailLabel,
    StyledLoading,
    StyledStatus,
    StyledStatusWrap,
    StyledTitlePlan,
} from "./style";

const Subscriptions: FC = () => {
    const dispatch = useAppDispatch();
    const { subscription, user, loading, userLoading } = useAppSelector(
        (store) => ({
            subscription: store.setting.billing.subscription.subscription,
            user: store.authentication.user,
            loading: store.setting.billing.subscription.loading,
            userLoading: store.authentication.loading,
        })
    );
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    useEffect(() => {
        if (user?.project.owner.id) {
            dispatch(doGetSubscription(user.project.owner.id));
        }
    }, [dispatch, user?.project.owner.id]);

    return (
        <div>
            <Title>Billing</Title>
            <StyledCard>
                <StyledCardBody>
                    {loading || userLoading ? (
                        <StyledLoading>
                            <Spinner color="primary" />
                        </StyledLoading>
                    ) : (
                        <div>
                            <StyledLabel>Current plan</StyledLabel>
                            <StyledTitlePlan>
                                {subscription?.name
                                    ? upperCaseFirstLetter(subscription?.name)
                                    : ""}
                            </StyledTitlePlan>
                            <br />
                            <StyledDetailLabel>
                                Next Payment Due:
                            </StyledDetailLabel>
                            <StyledDetail>
                                {subscription?.next_payment_due
                                    ? formatUnixTime(
                                          subscription?.next_payment_due,
                                          "MMMM Do, YYYY"
                                      )
                                    : ""}
                            </StyledDetail>
                            <br />
                            <StyledDetailLabel>Amount:</StyledDetailLabel>
                            <StyledDetail>
                                {subscription?.amount
                                    ? `$${formatMetric(
                                          subscription?.amount / 100
                                      )}/mo`
                                    : "$0"}
                            </StyledDetail>
                            <br />
                            <StyledDetailLabel>Status:</StyledDetailLabel>
                            {subscription?.ends_at ? (
                                <StyledCanceledText>
                                    This subscription is canceled.
                                </StyledCanceledText>
                            ) : (
                                ""
                            )}
                            <StyledStatusWrap>
                                <StyledStatus>
                                    {subscription?.stripe_status
                                        ? upperCaseFirstLetter(
                                              subscription.stripe_status
                                          )
                                        : ""}
                                </StyledStatus>
                                <Button
                                    variant="outlined"
                                    color="light"
                                    onClick={() => setShowCancelConfirm(true)}
                                    disabled={!!subscription?.ends_at}
                                >
                                    Cancel
                                </Button>
                            </StyledStatusWrap>
                        </div>
                    )}
                </StyledCardBody>
            </StyledCard>
            <br />
            <CancelConfirmation
                show={showCancelConfirm}
                onClose={() => setShowCancelConfirm(false)}
            />
        </div>
    );
};

export default Subscriptions;
