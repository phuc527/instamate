import { Button, Card } from "@doar/components";
import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledCardWrap = styled.div`
    margin: 10px;
    width: 100%;
    ${device.xlarge} {
        width: 60%;
    }
`;

export const StyledCardWithoutLocation = styled(({ ...rest }) => (
    <Card {...rest} />
))`
    height: 50vh;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledButtonFilterWrap = styled.div`
    display: flex;
    margin-left: auto;
`;

export const StyledButtonTrash = styled(({ ...rest }) => <Button {...rest} />)`
    background: transparent;
    border: none;
    margin-right: 10px;
    &:hover {
        background: ${themeGet("colors.gray200")};
        cursor: pointer;
    }
`;

export const StyledLocationTitleWrap = styled.div`
    display: flex;
    align-items: center;
`;
