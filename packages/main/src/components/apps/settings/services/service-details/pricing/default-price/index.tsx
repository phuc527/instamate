import {
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Spinner,
} from "@doar/components";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PRICING_TYPE } from "src/helpers/settings/services/constant";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import Duration from "./duration";
import PriceType from "./price-type";
import {
    StyledCard,
    StyledLabel,
    StyledMaxPriceWrap,
    StyledPriceOptionsWrap,
    StyledSaveButton,
    StyledTitlePanel,
} from "./style";

interface FormUpdatePricing {
    minPrice: number;
    maxPrice: number;
    duration: number;
    discount: number;
    pricingType: string;
}

const DefaultPrice: FC = () => {
    const dispatch = useAppDispatch();
    const { loading, procedure } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const { register, reset, getValues, setValue, watch } =
        useForm<FormUpdatePricing>({
            defaultValues: {
                minPrice: 0,
                maxPrice: 0,
                duration: 0,
                discount: 0,
                pricingType: "",
            },
        });

    useEffect(() => {
        if (procedure) {
            reset({
                minPrice: procedure.min_cost || 0,
                maxPrice: procedure.max_cost || 0,
                discount: procedure.discount || 0,
                duration: procedure.duration || 0,
                pricingType: procedure.pricing_type,
            });
        }
    }, [procedure, reset]);

    const onChangeType = (type: string) => {
        setValue("pricingType", type);
        if (type !== PRICING_TYPE.range) {
            setValue("maxPrice", 0);
        } else setValue("maxPrice", procedure?.max_cost || 0);
    };

    const onSavePrice = () => {
        dispatch(
            doUpdateProcedure({
                id: procedure?.id || 0,
                form: {
                    min_cost: getValues("minPrice") || 0,
                    max_cost: getValues("maxPrice") || 0,
                    pricing_type: getValues("pricingType"),
                    discount: getValues("discount") || 0,
                    duration: getValues("duration") || 0,
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                },
                onFail: (error) => toastError(error),
            })
        );
    };

    return (
        <div>
            <StyledTitlePanel>Default Price</StyledTitlePanel>
            <StyledCard>
                <Row>
                    <Col col={12} xl={6} lg={6}>
                        <Row>
                            <Col col={6}>
                                <StyledLabel>Duration</StyledLabel>
                                <Duration
                                    value={watch("duration")}
                                    onChangeDuration={(duration) =>
                                        setValue("duration", duration)
                                    }
                                />
                                <input hidden {...register("duration")} />
                            </Col>
                            <Col col={6}>
                                <StyledLabel>Price type</StyledLabel>
                                <PriceType
                                    value={watch("pricingType")}
                                    onChangeType={onChangeType}
                                />
                                <input hidden {...register("pricingType")} />
                            </Col>
                        </Row>
                    </Col>
                    <Col col={12} xl={6} lg={6} className="allPrice">
                        <Row>
                            <Col col={6}>
                                <StyledLabel>
                                    {watch("pricingType") === PRICING_TYPE.range
                                        ? "Min price"
                                        : "Price"}
                                </StyledLabel>
                                <InputGroup>
                                    <InputGroupAddon dir="prepend">
                                        <InputGroupText>$</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="number"
                                        id="service-details-min-price"
                                        {...register("minPrice")}
                                    />
                                </InputGroup>
                                {watch("pricingType") === PRICING_TYPE.range ? (
                                    <StyledMaxPriceWrap>
                                        <StyledLabel>Max Price</StyledLabel>
                                        <InputGroup>
                                            <InputGroupAddon dir="prepend">
                                                <InputGroupText>
                                                    $
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                id="service-details-max-price"
                                                {...register("maxPrice")}
                                            />
                                        </InputGroup>
                                    </StyledMaxPriceWrap>
                                ) : (
                                    ""
                                )}
                            </Col>
                            <Col col={6}>
                                <StyledLabel>Special price</StyledLabel>
                                <StyledPriceOptionsWrap>
                                    <InputGroup>
                                        <InputGroupAddon dir="prepend">
                                            <InputGroupText>$</InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="number"
                                            id="service-details-special-price"
                                            {...register("discount")}
                                        />
                                    </InputGroup>
                                </StyledPriceOptionsWrap>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <StyledPriceOptionsWrap>
                            <StyledSaveButton
                                variant="contained"
                                onClick={onSavePrice}
                            >
                                {loading ? (
                                    <Spinner color="white" size="xs" />
                                ) : (
                                    "Save"
                                )}
                            </StyledSaveButton>
                        </StyledPriceOptionsWrap>
                    </Col>
                </Row>
            </StyledCard>
        </div>
    );
};

export default DefaultPrice;
