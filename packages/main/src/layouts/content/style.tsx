/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, {
    border as borderStyle,
    BorderProps,
    css,
    device,
    space,
    SpaceProps,
    themeGet,
} from "@doar/shared/styled";

interface IProps extends SpaceProps, BorderProps {
    $fullHeight?: boolean;
    $align: "top" | "center" | "bottom";
}

const conentCSS = css<IProps>`
    padding: 20px;
    ${device.large} {
        padding: 25px;
        margin-top: 30px;
    }
    ${device.xlarge} {
        padding: 30px;
    }
    ${({ $fullHeight }) =>
        $fullHeight &&
        css`
            min-height: calc(100vh - 107px);
            display: flex;
            flex-direction: column;
            justify-content: center;
        `}

    ${({ $align }) =>
        $align &&
        $align !== "center" &&
        css`
            & > .container {
                flex: 1;
            }
        `}
	${({ borderBottom, borderBottomWidth }) =>
        (borderBottom || borderBottomWidth) &&
        css`
            border-bottom-style: solid;
            border-bottom-color: ${themeGet("colors.border")};
        `}
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            color: ${themeGet("colors.gray500")};
        `}
    ${space};
    ${borderStyle};
`;

export const StyledContent = styled(
    ({
        p,
        px,
        py,
        m,
        mx,
        my,
        mt,
        borderBottomWidth,
        $fullHeight,
        $align,
        ...rest
    }) => <div {...rest} />
)<IProps>`
    ${conentCSS}
`;
