import { Button, Card } from "@doar/components";
import styled, { themeGet, css } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    width: 100%;
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.gray900")};
        `}
`;

export const StyledHoursWrap = styled.div`
    display: flex;
    margin: 8px 0 0 0;
    font-size: 15px;
    font-weight: 400;
    align-items: stretch;
    border: 1px solid ${themeGet("colors.border")};
    border-radius: 10px;
    overflow: hidden;
`;

export const StyledDayLabel = styled.div`
    min-width: 110px;
    padding: 10px;
    background: #ddefff;
    display: flex;
    align-items: center;
`;

export const StyledTimesWrap = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 0;
    &.borderTop {
        border-top: 1px solid ${themeGet("colors.border")};
    }
`;

export const StyledMultiTimeWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledTime = styled.div`
    margin: 0 10px;
    color: ${themeGet("colors.gray700")};
    min-width: 50px;
`;

export const StyledActionWrap = styled.span`
    margin-left: auto;
    height: 20px;
    cursor: pointer;
    visibility: hidden;
`;
interface LocationInfo {
    $isHidden?: boolean;
}
export const StyledInfo = styled.div<LocationInfo>`
    ${({ $isHidden }) =>
        $isHidden &&
        css`
            display: none;
        `}
`;

export const StyledHiddenInput = styled.input`
    display: none;
`;

export const StyledHoursTitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

export const StyledGoogleMapWrap = styled.div`
    margin-bottom: 30px;
`;

export const StyledEditRegion = styled.div`
    display: flex;
    width: 100%;
`;

export const StyledInputWrap = styled.div`
    width: 100%;
    margin-right: 20px;
`;

export const StyledSaveBtn = styled(({ ...rest }) => <Button {...rest} />)`
    margin-left: auto;
    min-height: 38px;
`;
