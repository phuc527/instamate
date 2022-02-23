import { CardBody } from "@doar/components";
import styled, { themeGet, device, css } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    ${device.small} {
        padding: 3rem;
    }
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)<{
    $practiceInfo?: boolean;
}>`
    padding: 15px 15px 15px 15px;
    ${device.small} {
        padding: 25px 25px 25px 25px;
    }
    ${({ $practiceInfo }) =>
        $practiceInfo &&
        css`
            padding: 15px 0 15px 15px;
            ${device.small} {
                padding: 25px 0 25px 25px;
            }
        `}
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
`;

export const StyledInfoWrap = styled.div`
    position: relative;
    width: calc(100% + 20px);
    left: -10px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: 500;
    min-height: 58px;
    & .d-none {
        display: none;
    }
    &:hover {
        background: ${themeGet("colors.gray100")};
        cursor: pointer;
        & .actionWrap {
            visibility: visible;
        }
    }
    &.practiceInfo {
        width: calc(100% - 5px);
    }
`;

export const StyledInfo = styled.div`
    font-size: 16px;
    font-weight: 500;
`;
