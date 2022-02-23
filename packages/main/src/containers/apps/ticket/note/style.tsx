import styled, { themeGet } from "@doar/shared/styled";
import ScrollBar from "src/components/scrollbar";

export const StyledNote = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${themeGet("colors.border")};
    height: calc(100% - 315px);
`;

export const StyledContent = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const StyledNoteWrapper = styled(ScrollBar)``;

export const StyledLoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;
export const StyledFormTitle = styled.h6`
    margin-bottom: 0;
    margin-top: 10px;
    margin-left: 10px;
`;
