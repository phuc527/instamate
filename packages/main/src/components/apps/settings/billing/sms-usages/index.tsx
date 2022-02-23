import {
    Button,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Spinner,
} from "@doar/components";
import moment from "moment";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { formatMetric } from "src/helpers/stringHelpers";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useForm } from "react-hook-form";
import { doGetSms } from "src/redux/slices/settings/billing/sms";
import { FormUpdateAutoRecharge } from "src/types/api/sms";
import { doUpdateProject } from "src/redux/slices/project";
import { hasKey } from "@doar/shared/methods";
import RechargeSMS from "./recharge-sms";
import { StyledCard, StyledCardBody, StyledLabel } from "../style";
import {
    StyledActionsWrap,
    StyledAutoRechargeWrap,
    StyledButtonWrap,
    StyledInputLabel,
    StyledLoadingWrap,
    StyledMetric,
    StyledMetricLabel,
    StyledMetricsWrap,
    StyledNumber,
    StyledRangeOfMonth,
    StyledSaveButton,
    StyledSwitchBtnWrap,
    StyledTitleBtn,
} from "./style";
import SimpleSwitch from "../../services/procedures-table/simple-switch";

const SMSUsages: FC = () => {
    const dispatch = useAppDispatch();
    const {
        smsBalance,
        textReceived,
        textSent,
        loading,
        autoRecharge,
        project,
    } = useAppSelector((store) => ({
        smsBalance: store.setting.billing.sms.smsBalance,
        textReceived: store.setting.billing.sms.textReceived,
        textSent: store.setting.billing.sms.textSent,
        loading: store.setting.billing.sms.loading,
        autoRecharge: store.setting.billing.sms.autoRecharge,
        project: store.project.project,
    }));
    const {
        register,
        reset,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FormUpdateAutoRecharge>({
        defaultValues: {
            autoRecharge: false,
            rechargeBalanceTo: 0,
            whenBalanceFallsBelow: 0,
        },
    });
    const [isOpenRecharge, setOpenRecharge] = useState(false);

    useEffect(() => {
        dispatch(doGetSms(moment.utc().startOf("month").unix()));
    }, [dispatch]);

    useEffect(() => {
        const { isAutoRecharge, rechargeBalanceTo, whenBalanceFallsBelow } =
            autoRecharge;
        reset({
            autoRecharge: isAutoRecharge,
            rechargeBalanceTo,
            whenBalanceFallsBelow,
        });
    }, [autoRecharge, reset]);

    const onUpdateAutoRecharge = () => {
        if (project?.id) {
            dispatch(
                doUpdateProject({
                    id: project.id,
                    form: {
                        phone: project.phone,
                        auto_recharge: getValues("autoRecharge") || false,
                        auto_recharge_balance_to_in_cents:
                            (getValues("rechargeBalanceTo") || 0) * 100,
                        auto_recharge_when_balance_falls_below_in_cents:
                            (getValues("whenBalanceFallsBelow") || 0) * 100,
                    },
                })
            );
        }
    };

    return (
        <div>
            <StyledCard>
                <StyledCardBody>
                    {loading ? (
                        <StyledLoadingWrap>
                            <Spinner color="primary" />
                        </StyledLoadingWrap>
                    ) : (
                        <div>
                            <StyledActionsWrap>
                                <div>
                                    <StyledLabel>Text usage</StyledLabel>
                                    <StyledRangeOfMonth>
                                        {moment()
                                            .startOf("month")
                                            .format("MMMM Do")}{" "}
                                        to {moment().format("MMMM Do")}
                                    </StyledRangeOfMonth>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    ml="auto"
                                    onClick={() => setOpenRecharge(true)}
                                >
                                    Recharge SMS
                                </Button>
                            </StyledActionsWrap>
                            <StyledMetricsWrap>
                                <StyledMetric>
                                    <StyledNumber>
                                        {formatMetric(smsBalance)}
                                    </StyledNumber>
                                    <StyledMetricLabel>
                                        CURRENT BALANCE
                                    </StyledMetricLabel>
                                </StyledMetric>
                                <StyledMetric>
                                    <StyledNumber>
                                        {formatMetric(textSent)}
                                    </StyledNumber>
                                    <StyledMetricLabel>
                                        TEXTS SENT
                                    </StyledMetricLabel>
                                </StyledMetric>
                                <StyledMetric>
                                    <StyledNumber>
                                        {formatMetric(textReceived)}
                                    </StyledNumber>
                                    <StyledMetricLabel>
                                        TEXTS RECEIVED
                                    </StyledMetricLabel>
                                </StyledMetric>
                            </StyledMetricsWrap>
                            <StyledSwitchBtnWrap>
                                <StyledTitleBtn>
                                    Auto recharge balance
                                </StyledTitleBtn>
                                <input hidden {...register("autoRecharge")} />
                                <SimpleSwitch
                                    state={watch("autoRecharge") ? "on" : "off"}
                                    onSwitch={(state) =>
                                        setValue("autoRecharge", state)
                                    }
                                />
                            </StyledSwitchBtnWrap>
                            <StyledAutoRechargeWrap
                                className={classNames({
                                    show: watch("autoRecharge"),
                                    hide: !watch("autoRecharge"),
                                })}
                            >
                                <br />
                                <Row>
                                    <Col col>
                                        <StyledInputLabel>
                                            Recharge balance to
                                        </StyledInputLabel>
                                        <InputGroup mt="5px">
                                            <InputGroupAddon dir="prepend">
                                                <InputGroupText>
                                                    $
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                id="auto-recharge-balance-to"
                                                {...register(
                                                    "rechargeBalanceTo"
                                                )}
                                                state={
                                                    errors?.rechargeBalanceTo
                                                        ? "error"
                                                        : "success"
                                                }
                                                showState={
                                                    !!hasKey(
                                                        errors,
                                                        "rechargeBalanceTo"
                                                    )
                                                }
                                                feedbackText={
                                                    errors?.rechargeBalanceTo
                                                        ?.message
                                                }
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col col>
                                        <StyledInputLabel>
                                            When balance falls below
                                        </StyledInputLabel>
                                        <InputGroup mt="5px">
                                            <InputGroupAddon dir="prepend">
                                                <InputGroupText>
                                                    $
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                id="auto-recharge-when-balance-falls-below"
                                                {...register(
                                                    "whenBalanceFallsBelow"
                                                )}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <StyledButtonWrap>
                                    <StyledSaveButton
                                        variant="contained"
                                        onClick={onUpdateAutoRecharge}
                                    >
                                        Save
                                    </StyledSaveButton>
                                </StyledButtonWrap>
                            </StyledAutoRechargeWrap>
                        </div>
                    )}
                </StyledCardBody>
            </StyledCard>
            <RechargeSMS
                show={isOpenRecharge}
                onClose={() => setOpenRecharge(false)}
            />
            <br />
        </div>
    );
};

export default SMSUsages;
