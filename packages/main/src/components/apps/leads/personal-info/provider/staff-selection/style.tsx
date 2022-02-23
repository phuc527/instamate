import styled, { themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    display: flex;
    height: 38px;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    border: 1px solid ${themeGet("colors.text4")};
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    .dropdown {
        width: 100%;
    }
    .dropdown-toggle {
        color: ${themeGet("colors.text2")};
        background: #fff;
        border: none;
        padding: 5px 10px;
        width: 100%;
        justify-content: start;
        &:focus {
            box-shadow: none;
        }
        .selectedStaffName {
            margin-left: 10px;
        }
        .staffInfo {
            display: flex;
            align-items: center;
        }
        .arrow {
            margin-left: auto;
            height: 20px;
        }
    }
    .dropdown-menu {
        width: 100%;
    }
    .saveBtn {
        margin-left: auto;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
`;

export const StyledDropdownItem = styled.div`
    display: flex;
    align-items: center;
    .staffName {
        margin-left: 10px;
    }
    width: 100%;
    padding: 6px 15px;
    clear: both;
    font-weight: 400;
    color: #1c273c;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    transition: all 0.2s ease-in-out;
    &:hover {
        background: ${themeGet("colors.gray200")};
    }
`;
