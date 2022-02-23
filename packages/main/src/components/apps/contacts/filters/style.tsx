import styled from "@doar/shared/styled";

export const StyledGroup = styled.div`
    background-color: white;
    & .contactPage {
        width: 100%;
        border-right: none;
        &.show {
            position: fixed;
        }
    }
    &.showFilter {
        display: block; 
        position: absolute;
        top: 0px;
        right: 0px;
        width: 250px;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-left: 1px solid rgb(192, 204, 218);
        box-shadow: rgb(28 39 60 / 10%) 0px 0px 15px;
        padding: 0px 0px 0px 20px;
        overflow-y: auto;
        & .contactPage {
            width: 100%;
            border-right: none;
            &.show {
                position: fixed;
            }
        }
    }
`;