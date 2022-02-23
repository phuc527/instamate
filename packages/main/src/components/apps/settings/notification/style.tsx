import { Card, CardBody } from "@doar/components";
import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    ${device.small} {
        padding: 3rem;
    }
`;

export const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
    box-shadow: none;
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    padding: 13px 15px 15px 15px;
    ${device.small}{
        padding: 20px 25px 25px 25px;
    }
`;

export const StyledLabel = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

export const StyledText = styled.p`
    margin: 5px 0px 0px 10px;
    text-align: center;
    color: ${themeGet("colors.gray600")};
    font-size: 14px;
`;

export const StyledInput = styled.input`
    height: 15px;
    width: 15px;
    margin-top: 6px;
`;

export const StyledLabelCheckBox = styled.div`
    display: flex;
`;

export const StyledLabelCheck = styled.div`
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 32px;
    grid-auto-flow: row;
    grid-template-columns: 210px repeat(2,var(--itemSizeColums));
    grid-template-rows: repeat(1,var(--itemSize));
    --itemSize: none;
    --itemSizeColums: none;
    .region { grid-area: auto}    
    width: 70%;
    margin-bottom: 20px;
    ${device.medium}{
      --itemSize: 1fr;
      --itemSizeColums: 120px;
      .region { grid-area: 2 / 2 /2 / 4 };
    }

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
      height: 20px;
      left: 20px;
      position: absolute;
      width: 20px;
      transition: left ease .5s;
      ${device.medium}{
        left: 27px;
      }
    }
    button:hover { background-color: lightgray; }
    button:focus,
    button:active { outline: none; }
    button::-moz-focus-inner { border: 0; }
    
    button.on {
      background-color: #0168fa;
    }
    
    button.on .pin {
      left: 50px;
      ${device.medium}{
        left: 61px;
      }
    }
`
