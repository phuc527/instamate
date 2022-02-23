import { CardBody, ModalBody, ModalHeader } from "@doar/components";
import styled from "@doar/shared/styled";

export const StyledWrap = styled.div`
    padding: 10px;
`;

export const StyledChannelItem = styled.div`
    display: flex;
`;

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
`;

export const StyledChannelModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    border-bottom: 0;
`;
export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const StyledChannelModalBody = styled(({ ...rest }) => (
    <ModalBody {...rest} />
))`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    max-height: 800px;
    overflow-y: auto;
`;

export const StyledSpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
`;

export const StyledChannelName = styled.span`
    display: flex;
    align-items: center;
    svg,
    img {
        margin-right: 5px;
    }
    @media (min-width: 375px) {
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
