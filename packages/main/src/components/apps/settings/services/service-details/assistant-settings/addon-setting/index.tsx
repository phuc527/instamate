import { Col, Row, Spinner } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ADDON_SELECTION_TYPE } from "src/helpers/settings/services/constant";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import Switch from "../../../procedures-table/switch-button";
import ServiceDropdown from "../../service-dropdown";
import {
    StyledBtnWrap,
    StyledCard,
    StyledLabel,
    StyledSaveButton,
    StyledSelectionWrap,
    StyledTitlePanel,
    StyledTooltipWrap,
} from "./style";

interface FormUpdateProcedure {
    addonsEnable: boolean;
    addonsRequired: boolean;
    selectType: string;
    numberToSelect: number;
}

const AddonsSetting: FC = () => {
    const SELECTION_TYPES = [
        { id: 1, name: "Single select" },
        { id: 2, name: "Multi select" },
    ];

    const { register, reset, setValue, watch, getValues } =
        useForm<FormUpdateProcedure>({
            defaultValues: {
                addonsEnable: false,
                addonsRequired: false,
                selectType: ADDON_SELECTION_TYPE.single,
                numberToSelect: 0,
            },
        });
    const dispatch = useAppDispatch();
    const { procedure, loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [numberToSelectOptions, setNumberToSelectOptions] = useState([
        {
            id: 1,
            name: "1",
        },
    ]);

    const generateOptions = (length: number) => {
        const result: { id: number; name: string }[] = [];

        for (let i = 1; i <= length; i += 1) {
            result.push({
                id: i,
                name: String(i),
            });
        }
        return result;
    };

    useEffect(() => {
        if (procedure) {
            reset({
                addonsEnable: procedure.addons_enabled || false,
                addonsRequired: procedure.addons_required || false,
                selectType: procedure.addons_select_type,
                numberToSelect: procedure.minimum_number_of_addons_to_select,
            });

            if (procedure.addons_select_type === ADDON_SELECTION_TYPE.multi) {
                setNumberToSelectOptions(
                    generateOptions(procedure?.procedure_addons?.length || 1)
                );
            }
        }
    }, [procedure, reset]);

    const onSave = () => {
        const { addonsEnable, addonsRequired, numberToSelect, selectType } =
            getValues();
        if (procedure?.id) {
            dispatch(
                doUpdateProcedure({
                    id: procedure.id,
                    form: {
                        addons_enabled: addonsEnable,
                        addons_required: addonsRequired,
                        ...(procedure?.procedure_addons?.length && {
                            addons_select_type: selectType,
                        }),
                        ...(procedure?.procedure_addons?.length && {
                            minimum_number_of_addons_to_select: numberToSelect,
                        }),
                    },
                    onSuccess: () => {
                        toastSuccess("Updated successfully!");
                    },
                    onFail: (err) => toastError(err),
                })
            );
        }
    };

    const formatType = (str: string) =>
        str.split("_").map((i) => i[0].toUpperCase() + i.substring(1))[0];

    const onChangeSelectType = (data: { id: number; name: string }) => {
        if (procedure) {
            const value =
                data.id === 1
                    ? ADDON_SELECTION_TYPE.single
                    : ADDON_SELECTION_TYPE.multi;
            if (value === ADDON_SELECTION_TYPE.multi) {
                setNumberToSelectOptions(
                    generateOptions(procedure?.procedure_addons?.length || 1)
                );
            } else {
                setNumberToSelectOptions([
                    {
                        id: 1,
                        name: "1",
                    },
                ]);
            }
            setValue("selectType", value);
        }
    };

    return (
        <div>
            <StyledTitlePanel>Addon settings</StyledTitlePanel>
            <StyledCard>
                <Row>
                    <Col col>
                        <StyledLabel>Has addons</StyledLabel>
                        <input hidden {...register("addonsEnable")} />
                        <Switch
                            state={watch("addonsEnable") ? "on" : "off"}
                            width={100}
                            textOnMode="Yes"
                            textOffMode="No"
                            onSwitch={(state) =>
                                setValue("addonsEnable", state)
                            }
                        />
                    </Col>
                    <Col col>
                        <StyledTooltipWrap>
                            <StyledLabel>Addon required</StyledLabel>
                            <input hidden {...register("addonsRequired")} />
                            <Switch
                                state={watch("addonsRequired") ? "on" : "off"}
                                width={100}
                                textOnMode="Yes"
                                textOffMode="No"
                                onSwitch={(state) =>
                                    setValue("addonsRequired", state)
                                }
                            />
                            <div className="tooltip">
                                This is used to determine if an addon selection
                                is required with this procedure
                            </div>
                        </StyledTooltipWrap>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col col>
                        <StyledLabel>Selection type</StyledLabel>
                        <input hidden {...register("selectType")} />
                        <StyledSelectionWrap
                            $disabled={
                                !!(
                                    procedure &&
                                    procedure?.procedure_addons?.length <= 0
                                )
                            }
                        >
                            <ServiceDropdown
                                value={formatType(watch("selectType"))}
                                items={SELECTION_TYPES}
                                onChange={onChangeSelectType}
                            />
                        </StyledSelectionWrap>
                    </Col>
                    <Col col>
                        <StyledLabel>Min number to select</StyledLabel>
                        <input hidden {...register("numberToSelect")} />
                        <StyledSelectionWrap
                            $disabled={
                                !!(
                                    procedure &&
                                    procedure?.procedure_addons?.length <= 0
                                )
                            }
                        >
                            <ServiceDropdown
                                value={watch("numberToSelect").toString()}
                                items={numberToSelectOptions}
                                onChange={(data) =>
                                    setValue(
                                        "numberToSelect",
                                        Number(data.name)
                                    )
                                }
                            />
                        </StyledSelectionWrap>
                    </Col>
                </Row>
                <StyledBtnWrap>
                    <StyledSaveButton variant="contained" onClick={onSave}>
                        {loading ? <Spinner /> : "Save"}
                    </StyledSaveButton>
                </StyledBtnWrap>
            </StyledCard>
        </div>
    );
};

export default AddonsSetting;
