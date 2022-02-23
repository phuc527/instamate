import styled, { themeGet } from "@doar/shared/styled";

export const StyledLabel = styled.span`
    color: ${themeGet("colors.text2")};
    margin-left: 10px;
`;

export const StyledLabelWrap = styled.div`
    display: flex;
    align-items: center;
    & .icon {
        height: 20px;
    }
`;

export const StyledCreateAt = styled.div`
    & .contactPage {
        & .calendar {
            position: unset;
        }
    }
    & .textFont {
        margin: 0;
        color: #7987a1;
    }
    & .datePicker {
        padding: 10px 0;
        & #createEndDate {
            color: #7987a1;
        }
        & #createStartDate {
            color: #7987a1;
        }
    }
`;
