import styled from "@doar/shared/styled";
import { ModalClose, ModalBody, Text } from "@doar/components";

export const StyledBody = styled(({ ...rest }) => <ModalBody {...rest} />)`
    padding: 20px;
    & .line1{
        margin-bottom: 12px;
    }
`;

export const StyledText = styled(({ ...rest }) => <Text {...rest} />)`
    font-size: 15px;
    font-weight: 500;
`;

export const StyledClose = styled(({ ...rest }) => <ModalClose {...rest} />)`
    font-weight: 300;
    font-size: 28px;
    line-height: 0.87;
    position: absolute;
    top: 20px;
    right: 15px;
`;

export const StyledTitle = styled.h6`
    letter-spacing: 0.5px;
    font-size: 15px;
    margin-bottom: 0px;
    padding: 5px;
    font-weight: 600;
`;