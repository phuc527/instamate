import styled, { themeGet, device, css } from "@doar/shared/styled";
import { Card, CardHeader } from "@doar/components";

export const StyledContentItem = styled.div`
    text-align: center;
    margin-top: 0px;
    color: ${themeGet("colors.text3")};
    margin-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const StyledLabelWrap = styled.div`
    text-align: center;
    margin-top: 0px;
    font-size: 20px;
    color: ${themeGet("colors.text")};
    margin-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    @media (min-width: 992px) {
        width: 30%;
        margin: auto;
    }
    width: 100%;
    box-shadow: none;
`;

export const StyledHeader = styled(({ ...rest }) => <CardHeader {...rest} />)`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledGrayBox = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border: 1px solid ${themeGet("colors.border")};
    background-color: ${themeGet("colors.gray50")};
    ${device.small} {
        display: flex;
        flex-wrap: wrap;
        padding-left: 20px;
        padding-right: 20px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.dark")};
        `}
`;
