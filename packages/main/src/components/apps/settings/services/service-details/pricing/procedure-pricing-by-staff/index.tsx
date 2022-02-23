import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Table,
} from "@doar/components";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { PRICING_TYPE } from "src/helpers/settings/services/constant";
import { useAppSelector } from "src/redux/hooks";
import { FormUpdateProcedureStaff } from "src/types/api/service";
import { Staff } from "src/types/api/staff";
import SimpleSwitch from "../../../procedures-table/simple-switch";
import Duration from "../default-price/duration";
import PriceType from "../default-price/price-type";
import {
    StyledCard,
    StyledInputWrap,
    StyledNoPriceStaff,
    StyledTd,
    StyledTdHeader,
    StyledTitlePanel,
} from "./style";

interface IPricingStaff {
    staffId: number;
    staffName: string;
    photo: string;
    duration: number;
    type: string;
    minPrice: number;
    maxPrice: number;
    discount: number;
    isEnable: boolean;
}

interface IProps {
    filterStaff: Staff | null;
}
const ProcedurePricingByStaff: FC<IProps> = ({ filterStaff }) => {
    const methods = useFormContext<FormUpdateProcedureStaff>();
    const { register, watch, getValues, reset, setValue } = methods;
    const { procedureStaffs, staffs } = useAppSelector((store) => ({
        procedureStaffs: store.setting.services.procedureStaff.procedureStaffs,
        staffs: store.setting.manage_users.activeStaffs.staffs,
    }));
    const [pricingStaffs, setPricingStaffs] = useState<IPricingStaff[] | []>(
        []
    );

    useEffect(() => {
        if (procedureStaffs && staffs) {
            const newPriceStaff: IPricingStaff[] | [] = staffs.map((staff) => {
                const priceStaff = procedureStaffs.find(
                    (i) => i.staff_id === staff.id
                );
                if (priceStaff) {
                    return {
                        staffId: staff.id,
                        staffName: `${staff.first_name} ${staff.last_name}`,
                        photo: staff.photo,
                        duration: priceStaff.duration || 0,
                        type: priceStaff.pricing_type || PRICING_TYPE.fixed,
                        minPrice: priceStaff.min_cost || 0,
                        maxPrice: priceStaff.max_cost || 0,
                        discount: priceStaff.discount || 0,
                        isEnable: true,
                    };
                }
                return {
                    staffId: staff.id,
                    staffName: `${staff.first_name} ${staff.last_name}`,
                    photo: staff.photo,
                    duration: 0,
                    type: PRICING_TYPE.fixed,
                    minPrice: 0,
                    maxPrice: 0,
                    discount: 0,
                    isEnable: false,
                };
            });

            setPricingStaffs(newPriceStaff);

            reset({
                procedures: newPriceStaff?.map((i) => ({
                    staffId: i.staffId,
                    minPrice: i.minPrice,
                    maxPrice: i.maxPrice,
                    duration: i.duration,
                    priceType: i.type,
                    discount: i.discount,
                    enable: i.isEnable,
                })),
                addons: getValues("addons"),
            });
        }
    }, [reset, procedureStaffs, staffs, getValues]);

    const onChangeType = (type: string, index: number) => {
        setValue(`procedures.${index}.priceType`, type);
        if (type !== PRICING_TYPE.range) {
            setValue(`procedures.${index}.maxPrice`, 0);
        } else
            setValue(
                `procedures.${index}.maxPrice`,
                procedureStaffs ? procedureStaffs[index].max_cost || 0 : 0
            );
    };

    return (
        <div>
            <StyledTitlePanel>Procedures pricing by staff</StyledTitlePanel>
            <StyledCard>
                <Table hover>
                    <thead>
                        <tr>
                            <StyledTdHeader />
                            <StyledTdHeader />
                            <StyledTdHeader className="tdHead">
                                DURATION
                            </StyledTdHeader>
                            <StyledTdHeader className="tdHead">
                                TYPE
                            </StyledTdHeader>
                            <StyledTdHeader className="tdHead">
                                MIN PRICE
                            </StyledTdHeader>
                            <StyledTdHeader className="tdHead">
                                MAX PRICE
                            </StyledTdHeader>
                            <StyledTdHeader className="tdHead">
                                SPECIAL PRICE
                            </StyledTdHeader>
                            <StyledTdHeader />
                        </tr>
                    </thead>
                    <tbody>
                        {pricingStaffs?.map((item, index) => {
                            return (
                                <tr
                                    key={item.staffId}
                                    className={classNames({
                                        disabled: !watch(
                                            `procedures.${index}.enable`
                                        ),
                                        hidden:
                                            filterStaff?.id !== item.staffId,
                                    })}
                                >
                                    <StyledTd />
                                    <StyledTd className="switchBtn">
                                        <input
                                            hidden
                                            {...register(
                                                `procedures.${index}.enable`
                                            )}
                                        />
                                        <SimpleSwitch
                                            state={
                                                watch(
                                                    `procedures.${index}.enable`
                                                )
                                                    ? "on"
                                                    : "off"
                                            }
                                            onSwitch={(state) =>
                                                setValue(
                                                    `procedures.${index}.enable`,
                                                    state
                                                )
                                            }
                                        />
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <input
                                                hidden
                                                {...register(
                                                    `procedures.${index}.duration`
                                                )}
                                            />
                                            <Duration
                                                value={
                                                    watch(
                                                        `procedures.${index}.duration`
                                                    ) || 0
                                                }
                                                disabled={
                                                    !watch(
                                                        `procedures.${index}.enable`
                                                    )
                                                }
                                                onChangeDuration={(duration) =>
                                                    setValue(
                                                        `procedures.${index}.duration`,
                                                        duration
                                                    )
                                                }
                                            />
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <input
                                                hidden
                                                {...register(
                                                    `procedures.${index}.priceType`
                                                )}
                                            />
                                            <PriceType
                                                value={
                                                    watch(
                                                        `procedures.${index}.priceType`
                                                    ) || ""
                                                }
                                                disabled={
                                                    !watch(
                                                        `procedures.${index}.enable`
                                                    )
                                                }
                                                onChangeType={(type) =>
                                                    onChangeType(type, index)
                                                }
                                            />
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <InputGroup>
                                                <InputGroupAddon dir="prepend">
                                                    <InputGroupText>
                                                        $
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    id={`service-details-min-price-${index}`}
                                                    disabled={
                                                        !watch(
                                                            `procedures.${index}.enable`
                                                        )
                                                    }
                                                    {...register(
                                                        `procedures.${index}.minPrice`
                                                    )}
                                                />
                                            </InputGroup>
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <InputGroup>
                                                <InputGroupAddon dir="prepend">
                                                    <InputGroupText>
                                                        $
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    id={`service-details-max-price-${index}`}
                                                    disabled={
                                                        watch(
                                                            `procedures.${index}.priceType`
                                                        ) !==
                                                            PRICING_TYPE.range ||
                                                        !watch(
                                                            `procedures.${index}.enable`
                                                        )
                                                    }
                                                    {...register(
                                                        `procedures.${index}.maxPrice`
                                                    )}
                                                />
                                            </InputGroup>
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <InputGroup>
                                                <InputGroupAddon dir="prepend">
                                                    <InputGroupText>
                                                        $
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    id={`service-details-special-price-${index}`}
                                                    disabled={
                                                        !watch(
                                                            `procedures.${index}.enable`
                                                        )
                                                    }
                                                    {...register(
                                                        `procedures.${index}.discount`
                                                    )}
                                                />
                                            </InputGroup>
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd />
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {pricingStaffs && pricingStaffs?.length <= 0 ? (
                    <StyledNoPriceStaff>
                        No staff pricing found
                    </StyledNoPriceStaff>
                ) : (
                    ""
                )}
            </StyledCard>
        </div>
    );
};

export default ProcedurePricingByStaff;
