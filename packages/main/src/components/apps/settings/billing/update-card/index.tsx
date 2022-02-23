import { Button, Spinner } from "@doar/components";
import { FC, useEffect, useState } from "react";
/* icons */
import MasterCardIcon from "@doar/shared/images/credit-card-icons/SVG/mastercard.svg";
import VisaIcon from "@doar/shared/images/credit-card-icons/SVG/visa.svg";
import AEIcon from "@doar/shared/images/credit-card-icons/SVG/american-express.svg";
import DiscoverIcon from "@doar/shared/images/credit-card-icons/SVG/discover.svg";
import { CreditCard } from "react-feather";
/* redux */
import { doRetrievePaymentMethod } from "src/redux/slices/settings/billing/creditCard";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
/* helpers */
import {
    FORMATTED_CARD_BRAND,
    UNFORMATTED_CARD_BRAND,
} from "src/helpers/settings/creditCard/constant";
/* styles */
import { classic } from "@doar/shared/styled/colors";
import { StyledCard, StyledCardBody, StyledLabel } from "../style";
import {
    StyledActionsWrap,
    StyledCardLoading,
    StyledCreditCardWrap,
    StyledPaymentDesc,
    StyledPaymentIcon,
    StyledPaymentNumber,
    StyledPaymentNumberWrap,
    StyledPlanInfo,
} from "./style";
/* components */
import AddCreditCard from "./add-credit-card";

const UpdateCard: FC = () => {
    const dispatch = useAppDispatch();
    const [isOpenAddCard, setOpenAddCard] = useState(false);
    const { card, loading } = useAppSelector(
        (store) => store.setting.billing.creditCard
    );

    useEffect(() => {
        dispatch(doRetrievePaymentMethod());
    }, [dispatch]);

    const getIcon = (brand: string): string => {
        if (brand === UNFORMATTED_CARD_BRAND.visa) {
            return VisaIcon;
        }
        if (brand === UNFORMATTED_CARD_BRAND.amex) {
            return AEIcon;
        }
        if (brand === UNFORMATTED_CARD_BRAND.discover) {
            return DiscoverIcon;
        }
        if (brand === UNFORMATTED_CARD_BRAND.mastercard) {
            return MasterCardIcon;
        }
        return "";
    };

    const renderCardIcons = () => {
        if (card?.card?.brand) {
            return <StyledPaymentIcon src={getIcon(card?.card?.brand)} />;
        }
        return <CreditCard color={classic.gray400} />;
    };

    const getFormatCardBrand = (brand: string): string => {
        if (brand === UNFORMATTED_CARD_BRAND.visa) {
            return FORMATTED_CARD_BRAND.visa;
        }
        if (brand === UNFORMATTED_CARD_BRAND.amex) {
            return FORMATTED_CARD_BRAND.amex;
        }
        if (brand === UNFORMATTED_CARD_BRAND.discover) {
            return FORMATTED_CARD_BRAND.discover;
        }
        if (brand === UNFORMATTED_CARD_BRAND.mastercard) {
            return FORMATTED_CARD_BRAND.mastercard;
        }
        return "";
    };

    return (
        <StyledCreditCardWrap>
            {loading ? (
                <StyledCardLoading>
                    <Spinner color="primary" />
                </StyledCardLoading>
            ) : (
                <StyledCard>
                    <StyledCardBody>
                        <StyledLabel>Current payment method</StyledLabel>
                        <StyledActionsWrap>
                            {renderCardIcons()}
                            {card?.card?.last4 ? (
                                <StyledPaymentNumberWrap>
                                    <StyledPaymentNumber>
                                        **** {String(card?.card?.last4)}
                                    </StyledPaymentNumber>
                                    <StyledPaymentDesc>
                                        Default payment method
                                    </StyledPaymentDesc>
                                </StyledPaymentNumberWrap>
                            ) : (
                                <StyledPaymentDesc>
                                    No default payment method
                                </StyledPaymentDesc>
                            )}
                            <Button
                                variant="outlined"
                                color="light"
                                ml="auto"
                                onClick={() => setOpenAddCard(true)}
                            >
                                {card?.card?.last4
                                    ? "Update card on file"
                                    : "Add card details"}
                            </Button>
                        </StyledActionsWrap>
                        <StyledPlanInfo>
                            {card?.card?.brand
                                ? getFormatCardBrand(card?.card?.brand)
                                : ""}
                            {card?.card?.exp_month && card?.card?.exp_year
                                ? ` - Expire ${String(
                                      card?.card?.exp_month
                                  )}/${String(card?.card?.exp_year)}`
                                : ""}
                        </StyledPlanInfo>
                    </StyledCardBody>
                </StyledCard>
            )}
            <br />
            <AddCreditCard
                show={isOpenAddCard}
                onClose={() => setOpenAddCard(false)}
            />
        </StyledCreditCardWrap>
    );
};

export default UpdateCard;
