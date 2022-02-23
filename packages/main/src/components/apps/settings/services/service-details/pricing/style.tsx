import { Button } from "@doar/components";
import styled from "@doar/shared/styled";

export const StyledPricingWrap = styled.div`
    position: relative;
    &.default {
        & .defaultPricing {
            display: block;
        }
        & .advancedPricing {
            display: none;
        }
    }
    &.advanced {
        & .defaultPricing {
            display: none;
        }
        & .advancedPricing {
            display: block;
        }
    }
`;

export const StyledToggleButtonWrap = styled.div`
    position: absolute;
    right: 0;
`;

export const StyledButtonWrap = styled.div`
    text-align: end;
    margin: 10px 0;
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    margin-left: auto;
    visibility: visible;
    height: 38px;
    & div {
        height: 15px;
    }
`;
