import { Card, CardBody, CardHeader } from "@doar/components";
import styled, { device, themeGet, css } from "@doar/shared/styled";

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
    cursor: pointer;
    &.staffProcedure {
        cursor: auto;
    }
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 0;
    overflow: auto;
`;

export const StyledCardHeader = styled(({ ...rest }) => (
    <CardHeader {...rest} />
))`
    display: flex;
    align-items: center;
    font-weight: 400;
    flex-wrap: wrap;
    ${device.small} {
        flex-wrap: nowrap;
    }
`;

export const StyledTable = styled.table`
    width: 100%;
    margin-bottom: 1rem;
    color: ${themeGet("colors.text")};
    border-collapse: collapse;
    & tbody tr:hover {
        background-color: ${themeGet("colors.athens")} !important;
    }
    & .dragIcon {
        text-align: center !important;
    }
`;

export const StyledTdHeader = styled.td`
    padding: 8px 10px 8px;
    border-top: none !important;
    font-size: 11px !important;
    color: ${themeGet("colors.gray600")};
    vertical-align: middle !important;
    height: 48px;
    line-height: 1.5;
    border-top: 1px solid ${themeGet("colors.border")};
`;

export const StyledTd = styled.td<{ $width?: number }>`
    padding: 8px 10px 8px;
    vertical-align: middle !important;
    white-space: break-spaces !important;
    line-height: 1.5;
    border-top: 1px solid ${themeGet("colors.border")};
    ${({ $width }) =>
        $width &&
        css`
            width: ${$width}px !important;
        `}
`;

export const StyledLoading = styled.div`
    height: 460px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledNoProcedure = styled.div`
    padding: 10px;
    text-align: center;
    margin-bottom: 20px;
`;

export const StyledLabelCheck = styled.div`
    & .button {
        background-color: white;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
        height: 100px;
        position: relative;
        width: 200px;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    & .pin {
        background-color: white;
        border-radius: 20px;
        height: 25px;
        left: 17px;
        position: absolute;
        width: 25px;
        transition: left ease 0.5s;
        ${device.medium} {
            left: 472px;
        }
    }
    button:hover {
        background-color: lightgray;
    }
    button:focus,
    button:active {
        outline: none;
    }
    button::-moz-focus-inner {
        border: 0;
    }

    button.on {
        background-color: #0168fa;
    }

    button.on .pin {
        left: 501px;
    }
`;

export const StyledBadge = styled.div`
    padding: 6px 10px;
    font-size: 13px;
    font-weight: 300;
    width: 45px;
    text-align: center;
    border-radius: 4px;
    &.surgicalBadge {
        background: #99cffe;
        color: #062990;
    }
    &.nonSurgicalBadge {
        background: ${themeGet("colors.gray200")};
        color: black;
    }
`;
