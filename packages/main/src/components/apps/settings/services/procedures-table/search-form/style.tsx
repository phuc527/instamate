import styled, { device } from "@doar/shared/styled";

export const StyledForm = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    & .searchInput {
        border: none;
        &:focus {
            box-shadow: none;
        }
    }
    margin-bottom: 10px;
    ${device.small} {
        width: calc(100% - 200px);
        margin-bottom: 0;
    }
`;
