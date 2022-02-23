import styled from "@doar/shared/styled";

export const StyledIFrame = styled.iframe`
    width: 100%;
    height: 100%;
    &.dragIframe {
        width: 100%;
        height: 100%;
    }
`;

export const StyledDrag = styled.div`
    height: 100%;
    &.dragWrap {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 20px 0px;
    }
`;

export const StyledDragAndResize = styled.div`
    & .drag {
        min-height: 375px !important;
        max-height: 520px !important;
        min-width: 275px !important;
        max-width: 400px !important;
        right: 0;
        left: unset !important;;
    }
    & .noDrag {
        min-height: 75% !important;
        max-height: 100% !important;
        min-width: 275px !important;
        max-width: 400px !important;
    }
    &.noDrag {
        position: absolute;
        z-index: 999;
        display: block;
        width: 400px;
        height: 100%;
        right: 0;
    }
    &.drag {
        position: absolute;
        z-index: 1000000;
        display: block;
        width: 400px;
        height: 63%;
        right: 0;
        bottom: 0;
    }
`;