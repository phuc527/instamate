import {
    CardHeader,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Spinner,
    Table,
} from "@doar/components";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PRICING_TYPE } from "src/helpers/settings/services/constant";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedureAddons } from "src/redux/slices/settings/services/procedure";
import { ProcedureAddon } from "src/types/api/authentication";
import { FormUpdateProcedureAddon } from "src/types/api/service";
import { toastError, toastSuccess } from "src/utils/toast";
import SearchForm from "../../../procedures-table/search-form";
import Duration from "../default-price/duration";
import PriceType from "../default-price/price-type";
import {
    StyledButtonWrap,
    StyledCard,
    StyledInputWrap,
    StyledNoPriceStaff,
    StyledSaveButton,
    StyledTd,
    StyledTdHeader,
    StyledTitlePanel,
} from "./style";

const DefaultPricingAddon: FC = () => {
    const { register, watch, getValues, reset, setValue } =
        useForm<FormUpdateProcedureAddon>();
    const dispatch = useAppDispatch();
    const { addons, loading } = useAppSelector((store) => ({
        addons: store.setting.services.procedure.addons,
        loading: store.setting.services.procedure.loadingUpdateAddon,
    }));
    const [searchValue, setSearchValue] = useState("");
    const [filteredAddons, setFilteredAddons] = useState<
        ProcedureAddon[] | null
    >(null);

    useEffect(() => {
        if (addons) {
            setFilteredAddons(addons);
            reset({
                addons: addons.map((i) => ({
                    id: i.id,
                    minPrice: i.min_cost || 0,
                    maxPrice: i.max_cost || 0,
                    duration: i.duration || 0,
                    priceType: i.pricing_type || PRICING_TYPE.fixed,
                    discount: i.discount || 0,
                })),
            });
        }
    }, [addons, reset]);

    const onChangeType = (type: string, index: number) => {
        setValue(`addons.${index}.priceType`, type);
        if (type !== PRICING_TYPE.range) {
            setValue(`addons.${index}.maxPrice`, 0);
        } else
            setValue(
                `addons.${index}.maxPrice`,
                addons ? addons[index].max_cost || 0 : 0
            );
    };

    const onSave = () => {
        const addonsArr = getValues("addons");

        dispatch(
            doUpdateProcedureAddons({
                form: addonsArr?.map((i) => ({
                    id: i.id,
                    data: {
                        min_cost: Number(i.minPrice) || 0,
                        max_cost: Number(i.maxPrice) || 0,
                        duration: i.duration,
                        discount: i.discount,
                        pricing_type: i.priceType,
                    },
                })),
                onSuccess: () => toastSuccess("Updated successfully!"),
                onFail: (err) => toastError(err),
            })
        );
    };

    const onSearchAddon = (value: string) => {
        setSearchValue(value);
        if (addons) {
            const newAddons = addons.filter((i) =>
                i.name.toLowerCase().includes(value.toLowerCase())
            );

            if (newAddons) {
                setFilteredAddons(newAddons);
                reset({
                    addons: newAddons.map((i) => ({
                        id: i.id,
                        minPrice: i.min_cost || 0,
                        maxPrice: i.max_cost || 0,
                        duration: i.duration || 0,
                        priceType: i.pricing_type || PRICING_TYPE.fixed,
                        discount: i.discount || 0,
                    })),
                });
            }
        }
    };

    return (
        <div>
            <StyledTitlePanel>Default addons pricing</StyledTitlePanel>
            <StyledCard>
                <CardHeader>
                    <SearchForm
                        placeholder="Search for addon name"
                        value={searchValue}
                        onSearch={onSearchAddon}
                    />
                </CardHeader>
                <Table hover>
                    <thead>
                        <tr>
                            <StyledTdHeader />
                            <StyledTdHeader className="tdName">
                                ADDON NAME
                            </StyledTdHeader>
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
                        {filteredAddons?.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <StyledTd />
                                    <StyledTd className="tdName">
                                        <StyledInputWrap>
                                            {item.name}
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <input
                                                hidden
                                                {...register(
                                                    `addons.${index}.duration`
                                                )}
                                            />
                                            <Duration
                                                value={
                                                    watch(
                                                        `addons.${index}.duration`
                                                    ) || 0
                                                }
                                                onChangeDuration={(duration) =>
                                                    setValue(
                                                        `addons.${index}.duration`,
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
                                                    `addons.${index}.priceType`
                                                )}
                                            />
                                            <PriceType
                                                value={
                                                    watch(
                                                        `addons.${index}.priceType`
                                                    ) || ""
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
                                                    id={`service-details-addons-min-price-${index}`}
                                                    {...register(
                                                        `addons.${index}.minPrice`
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
                                                    id={`service-details-addons-max-price-${index}`}
                                                    disabled={
                                                        watch(
                                                            `addons.${index}.priceType`
                                                        ) !== PRICING_TYPE.range
                                                    }
                                                    {...register(
                                                        `addons.${index}.maxPrice`
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
                                                    id={`service-details-addons-special-price-${index}`}
                                                    {...register(
                                                        `addons.${index}.discount`
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
                {filteredAddons && filteredAddons?.length <= 0 ? (
                    <StyledNoPriceStaff>
                        No addon pricing found
                    </StyledNoPriceStaff>
                ) : (
                    <StyledButtonWrap>
                        <StyledSaveButton variant="contained" onClick={onSave}>
                            {loading ? (
                                <Spinner color="white" size="xs" />
                            ) : (
                                "Save"
                            )}
                        </StyledSaveButton>
                    </StyledButtonWrap>
                )}
            </StyledCard>
        </div>
    );
};

export default DefaultPricingAddon;
