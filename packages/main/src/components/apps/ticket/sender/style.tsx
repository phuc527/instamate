import { MediaBody } from "@doar/components";
import styled, { device } from "@doar/shared/styled";

export const StyledMediaBody = styled(({ ...rest }) => <MediaBody {...rest} />)`
    display: none;
    ${device.medium} {
        display: block;
    }
`;

export const StyledSender = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 220px;
    font-size: 13px;
    margin-bottom: 2px;
`;
