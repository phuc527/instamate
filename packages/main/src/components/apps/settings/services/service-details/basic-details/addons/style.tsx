import { Button, Card, Input, Textarea } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledTitleWrap = styled.div`
    display: flex;
`;

export const StyledTitlePanel = styled.div`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const StyledTdHeader = styled.td`
    padding: 10px 20px !important;
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle !important;
    height: 48px;
    &.addonName {
        width: 40%;
    }
    &.actions {
        width: 150px;
    }
`;

export const StyledTr = styled.tr`
    &:hover {
        & .actionsBtn {
            visibility: visible !important;
        }
    }
`;

export const StyledTd = styled.td`
    padding: 10px 20px !important;
    vertical-align: middle !important;
    white-space: break-spaces !important;
    &.name {
        font-weight: 500;
    }
    &.actions {
        text-align: center;
        & .actionsBtn {
            visibility: hidden;
            cursor: pointer;
        }
    }
    &.createAddon {
        vertical-align: top !important;
    }
    &.description {
        display: flex;
        & div {
            width: 80px;
            margin-left: 10px;
            text-align: end;
            & button {
                margin-bottom: 5px;
            }
        }
    }
    & .createAddonBtn {
        display: inline-flex;
    }
    & .inputWrap {
        display: none;
        width: 100%;
    }
    & textarea {
        display: none;
    }
    & .addAddonActions {
        display: none;
    }
    &.isCreating {
        & .createAddonBtn {
            display: none;
        }
        & .inputWrap {
            display: inline-block;
        }
        & textarea {
            display: inline-block;
        }
        & .addAddonActions {
            display: flex;
            flex-direction: column;
        }
    }
`;

export const StyledNoAddons = styled.div`
    padding: 0 20px;
    margin-bottom: 20px;
    text-align: center;
`;

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
    &.hide {
        display: none;
    }
`;
export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    &.hide {
        display: none;
    }
`;
export const StyledTextarea = styled(({ ...rest }) => <Textarea {...rest} />)`
    &.hide {
        display: none;
    }
`;

export const StyledNoDescription = styled.span`
    color: ${themeGet("colors.gray500")};
`;
