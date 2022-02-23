import styled, { themeGet, device, css } from "@doar/shared/styled";
import { Card } from "@doar/components";
import {Mention} from "react-mentions";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.gray900")};
        `}

    box-shadow: none;
`;

export const StyledRole = styled.span`
    display: block;
    color: ${themeGet("colors.text3")};
    font-size: 13px;
`;

export const StyledTime = styled.span`
    font-size: 12px;
    color: ${themeGet("colors.text3")};
    align-self: center;
    margin-right: 7px;
    display: none;
    ${device.small} {
        display: block;
    }
`;

export const StyledGrayBox = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    border: 1px solid ${themeGet("colors.border")};
    background-color: ${themeGet("colors.gray50")};
    ${device.small} {
        padding-left: 20px;
        padding-right: 20px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.dark")};
        `}
`;

export const StyledLeftHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledWrap = styled.form`
    background-color: #fff;
    /* border-radius: ${themeGet("radii.rounded")}; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    padding: 10px;

    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.gray900")};
        `}
`;

export const StyledEditNoteInput = styled.textarea`
    margin-left: 10px;
    background: transparent;
    padding: 0;
    border: none;
    padding-top: 11px;
    resize: none;
    border-bottom: 2px solid rgb(25, 118, 210);
`;
export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 25px;
`;
export const StyledMention = styled(Mention)`
    background: red;
`;