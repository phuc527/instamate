import { Button, ModalHeader, Card } from "@doar/components";
import styled, { themeGet, css } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    padding: 15px 25px 25px;
`;

export const StyledTitlePanel = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    margin-bottom: 10px;
    color: ${themeGet("colors.gray600")};
`;

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledBtnWrap = styled.div`
    margin: 10px 0;
    text-align: end;
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    visibility: visible;
    height: 38px;
    & div {
        height: 15px;
    }
`;

export const StyledSelectionWrap = styled.div<{ $disabled: boolean }>`
    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
        `}
`;

export const StyledTooltipWrap = styled.div`
    width: fit-content;
    & .tooltip {
        display: none;
        position: absolute;
        bottom: 120%;
        z-index: 1000;
        color: #fff;
        background: #000000d4;
        padding: 10px 20px;
        border-radius: 8px;
        width: 220px;
        animation: blur 0.2s;
        @keyframes blur {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0.6;
            }
            100% {
                opacity: 1;
            }
        }
        &:after {
            content: "";
            position: absolute;
            top: 99%;
            left: 44px;
            margin-left: -5px;
            border-width: 10px;
            border-style: solid;
            border-color: #000000d4 transparent transparent transparent;
        }
    }
    &:hover {
        & .tooltip {
            display: block;
        }
    }
`;
