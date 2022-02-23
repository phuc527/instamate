import { Button } from "@doar/components";
import styled, { css } from "@doar/shared/styled";

interface IProps {
    $showSidebar: boolean;
}

export const StyledContent = styled.div<IProps>`
    ${({ $showSidebar }) =>
        $showSidebar &&
        css`
            left: 200px !important;
        `}
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 1200;
    transition: all 0.2s ease 0s;
`;

export const StyledShowBtn = styled(({ ...rest }) => <Button {...rest} />)`
    display: none;
    &.showFilter {
        @media (max-width: 991px) {
            position: relative;
            background-color: rgb(255, 255, 255);
            border-color: rgb(192, 204, 218);
            color: rgb(28, 39, 60);
            box-shadow: rgb(28 39 60 / 10%) -5px 0px 10px;
            left: 100%;
        } 
    }
    @media (max-width: 991px) {
        top: 110px;
        width: 25px;
        height: 35px;
        border-width: 1px 1px 1px 0px;
        border-style: solid;
        border-image: initial;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        transition: all 0.2s ease 0s;
        z-index: 1;
        position: fixed;
        background-color: #8392a5;
        border-color: transparent;
        color: rgb(255, 255, 255);
    }
    `;