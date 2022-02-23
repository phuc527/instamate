import { Spinner } from "@doar/components";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedureStaff } from "src/redux/slices/settings/services/procedureStaff";
import { FormUpdateProcedureStaff } from "src/types/api/service";
import { Staff } from "src/types/api/staff";
import { toastError, toastSuccess } from "src/utils/toast";
import Switch from "../../procedures-table/switch-button";
import AddonsPricingByStaff from "./addons-pricing-by-staff";
import DefaultPrice from "./default-price";
import DefaultPricingAddon from "./default-pricing-addon";
import ProcedurePricingByStaff from "./procedure-pricing-by-staff";
import StaffFilter from "./staff-filter";
import {
    StyledButtonWrap,
    StyledPricingWrap,
    StyledSaveButton,
    StyledToggleButtonWrap,
} from "./style";

const Pricing: FC = () => {
    const DEFAULT_MODE = 1;
    const ADVANCED_MODE = 0;
    const dispatch = useAppDispatch();
    const methods = useForm<FormUpdateProcedureStaff>();
    const { staffs, procedure, procedureStaffs, loading } = useAppSelector(
        (store) => ({
            staffs: store.setting.manage_users.activeStaffs.staffs,
            procedureStaffs:
                store.setting.services.procedureStaff.procedureStaffs,
            procedure: store.setting.services.procedure.procedure,
            loading: store.setting.services.procedureStaff.loading,
        })
    );

    const [mode, setMode] = useState(DEFAULT_MODE);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    useEffect(() => {
        if (staffs && staffs.length > 0) {
            setSelectedStaff(staffs[0]);
        }
    }, [staffs]);

    const onSave = () => {
        if (procedureStaffs && procedure) {
            const { procedures, addons } = methods.getValues();

            const enableAddons = addons.filter((i) => i.enable);

            dispatch(
                doUpdateProcedureStaff({
                    procedureId: procedure.id,
                    procedureStaffs: procedures,
                    addonStaffs: enableAddons,
                    onSuccess: () => toastSuccess("Updated successfully!"),
                    onFail: (err) => toastError(err),
                })
            );
        }
    };

    return (
        <FormProvider {...methods}>
            <StyledPricingWrap
                className={classNames({
                    default: mode === DEFAULT_MODE,
                    advanced: mode === ADVANCED_MODE,
                })}
            >
                <StyledToggleButtonWrap>
                    <Switch
                        width={220}
                        textOnMode="Default price"
                        textOffMode="Price by staff"
                        state={mode === DEFAULT_MODE ? "on" : "off"}
                        onSwitch={(state) =>
                            setMode(state ? DEFAULT_MODE : ADVANCED_MODE)
                        }
                    />
                </StyledToggleButtonWrap>
                <div className="defaultPricing">
                    <br />
                    <DefaultPrice />
                    <br />
                    <DefaultPricingAddon />
                </div>
                <div className="advancedPricing">
                    <StaffFilter
                        selectedStaff={selectedStaff}
                        onChange={(staff) => setSelectedStaff(staff)}
                    />
                    <br />
                    <ProcedurePricingByStaff filterStaff={selectedStaff} />
                    <br />
                    <AddonsPricingByStaff filterStaff={selectedStaff} />
                    <StyledButtonWrap>
                        <StyledSaveButton variant="contained" onClick={onSave}>
                            {loading ? (
                                <Spinner size="xs" color="white" />
                            ) : (
                                "Save"
                            )}
                        </StyledSaveButton>
                    </StyledButtonWrap>
                </div>
            </StyledPricingWrap>
        </FormProvider>
    );
};

export default Pricing;
