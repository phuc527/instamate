import styled, { themeGet } from "@doar/shared/styled";

export const StyledSwitchWrap = styled.div`
    & button {
        border: 0;
        border-radius: 30px;
        cursor: pointer;
        height: 28px;
        position: relative;
        width: 50px;
        justify-content: space-between;
        &:hover {
            background-color: ${themeGet("colors.gray200")};
        }
        &.off .pin {
            left: 2px;
        }
        &.on {
            background-color: ${themeGet("colors.primary")};
            & .pin {
                left: 24px;
            }
        }
        & .enableText {
            color: ${themeGet("colors.gray400")};
        }
        & .disableText {
            color: ${themeGet("colors.gray400")};
        }
    }
    & .pin {
        background-color: white;
        border-radius: 30px;
        height: 24px;
        position: absolute;
        width: 24px;
        transition: left ease 0.5s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
