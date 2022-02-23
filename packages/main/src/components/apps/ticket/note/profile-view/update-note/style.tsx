import styled, { css, themeGet } from "@doar/shared/styled";
import Mentions, {
    MentionProps,
} from "../../../../../widgets/mentions/Mentions";

const link3 = css`
    color: ${themeGet("colors.text3")};
    &:hover {
        color: ${themeGet("colors.text2")};
    }
`;

export const StyledWrap = styled.form`
    background-color: #fff;
    position: fixed !important;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border-top: 1px solid ${themeGet("colors.border")};
    position: relative;
    width: 400px;
    z-index: 10;
    padding: 5px 12px 12px 12px;
    min-height: 85px;
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.gray900")};z
        `}
`;

export const StyledShare = styled.div`
    margin-right: auto;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
`;

export const StyledMentions = styled(({ ...props }) => (
    <Mentions {...props} />
))<MentionProps>`
    width: 100%;
    margin: 0;
`;

export const RightBtn = styled.div`
    max-width: 50px;
    flex-basis: 50px;
    border-left: 1px solid ${themeGet("colors.border")};
    align-items: center;
    justify-content: center;
    display: flex;
`;

export const RightBtnLink = styled.a`
    ${link3}
    line-height: 1;
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 25px;
`;

export const StyledIcon = styled.div`
    width: 14px;
    height: 14px;
`;
