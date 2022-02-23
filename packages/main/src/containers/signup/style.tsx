import styled, { device } from "@doar/shared/styled";
import { Media, MediaBody } from "@doar/components";

export const StyledMedia = styled(({ ...rest }) => <Media {...rest} />)`
    height: 100%;
    position: relative;
    align-items: stretch;
    justify-content: center;
`;

export const StyledCheck = styled.li`
    font-size: 16px;
    color: #8392a5;
    margin-bottom: 10px;
`;

export const StyledMediaBody = styled(({ ...rest }) => <MediaBody {...rest} />)`
    display: none;
    ${device.large} {
        display: flex;
        position: relative;
        align-items: center;
        display: flex;
        padding-left: 50px;
        flex-direction: column;
        align-items: flex-start
    }
    ${device.xlarge} {
        padding-left: 130px;
        padding-right: 60px;
    }
`;

export const StyledImage = styled.div``;

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
        margin-right: 50px;
    }
    ${device.xlarge} {
        margin-right: 60px;
        width: 340px;
    }
`;
