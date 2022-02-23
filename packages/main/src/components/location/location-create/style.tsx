import styled, { themeGet, device, css } from "@doar/shared/styled";

export const StyledGrayBox = styled.div`
    margin-bottom: 15px;
    padding: 16px;
    border-radius: 5px;
    border: 1px solid ${themeGet("colors.border")};
    background-color: ${themeGet("colors.gray50")};
    ${device.small} {
        margin-bottom: 15px;
    border-radius: 5px;
    padding: 16px;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.dark")};
        `}
`;

export const StyledGrayBoxItem = styled.div`
    grid-row-gap: 16px;
    grid-column-gap: 32px;
    display: grid;
    grid-auto-flow: row;
    --itemSize: 1fr;
    width: 90%;
    grid-template-columns: repeat(3,var(--itemSize));
    grid-template-rows: repeat(3,var(--itemSize));
    .region { grid-area: 2 / 2 /2 / 4 }
    @media (max-width: 768px) {
        --itemSize: none;
        .region { grid-area: auto}
        width: 70%
    }
`;

export const StyledButton = styled.div`
   display: flex;
   & .btnPrev {
       margin-right: 10px;
   }
`;

export const StyledGrayBoxEdit = styled.div`
    display: flex;
    height: 0;
    justify-content: flex-end;
    --itemSize: 1fr;
`;
