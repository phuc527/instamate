import { Badge } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    padding: 10px;
`;

export const StyledDefaultBadge = styled(({ ...rest }) => <Badge {...rest} />)`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
`;

export const StyledBadge = styled(({ ...rest }) => (
    <StyledDefaultBadge {...rest} />
))`
    color: #fff !important;
    background-color: ${themeGet("colors.danger")} !important;
    border-radius: 100%;
`;
