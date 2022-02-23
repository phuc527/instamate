import styled, { device } from "@doar/shared/styled";
import { Media, MediaBody } from "@doar/components";

export const StyledMedia = styled(({ ...rest }) => <Media {...rest} />)`
    position: relative;
    height: 100%;
    align-items: stretch;
    justify-content: center;
`;

export const StyledMediaBody = styled(({ ...rest }) => <MediaBody {...rest} />)`
    align-items: center;
    display: none;
    ${device.large} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const StyledImage = styled.div`
    width: 600px;
`;

export const StyledImgText = styled.div`
    font-size: 1.53125rem;
    font-weight: 600;
    left: 0px;
    bottom: -10px;
    margin: 20px 0px 20px 0px;
`;

export const StyledSignin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 340px;
    ${device.large} {
        margin-left: 50px;
    }
    ${device.xlarge} {
        margin-left: 60px;
        width: 340px;
    }
`;
