import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
    ${device.large} {
        width: calc(100% - (280px + 350px + 400px));
    }
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 70px);
        pointer-events: none;
    }
    .container {
        height: 100%;
        .row {
            height: 100%;
        }
    }
`;

export const StyledTitle = styled.div`
    font-weight: 500;
    color: ${themeGet("colors.text2")};
    margin: 10px 10px 20px;
`;

export const StyledInfo = styled.div`
    margin: 10px 0;
    color: ${themeGet("colors.text2")};
    display: flex;
    align-items: center;
    .providerName {
        font-size: 14px;
        color: ${themeGet("colors.text2")};
    }
`;

export const StyledButtonsWrap = styled.div`
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    .icon {
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
`;

export const StyledNoInfo = styled.div`
    color: ${themeGet("colors.gray500")};
`;

export const StyledInfoWrap = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 10px;
    height: 56px;
    &:not(.bmi):hover {
        background: ${themeGet("colors.gray50")};
        .editIcon {
            display: block;
        }
    }
    .label {
        margin-right: 10px;
        color: ${themeGet("colors.gray800")};
    }
    .content {
        position: relative;
        width: 60%;
        color: ${themeGet("colors.black")};
        &.email {
            color: ${themeGet("colors.primary")};
        }
        display: flex;
        justify-content: end;
        margin-left: auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .editForm {
        width: 60%;
        text-align: end;
        display: none;
        margin-left: auto;
    }
    .editIcon {
        display: none;
        margin-top: 5px;
    }
    &.editable {
        &:hover {
            .editIcon {
                display: none;
            }
        }
        .content {
            display: none;
        }
        .editForm {
            display: block;
        }
    }
`;

export const StyledPhoneIcon = styled.span`
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: #d7f4de;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;
