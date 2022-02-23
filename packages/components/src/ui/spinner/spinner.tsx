import { FC, useMemo } from "react";
import Loader, { LoaderProps } from "react-loader-spinner";
import { useTheme } from "@doar/shared/styled";
import { get } from "lodash-es";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export interface IProps extends Omit<LoaderProps, "type"> {
    /**
     * Pass extra classes
     */
    className?: string;
    /**
     *  Default is `border`.
     */
    variant?: "border" | "grow";
    /**
     * Default is `text`.
     */
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark"
        | "white";
    /**
     * Default is `md`.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    type?:
        | "Audio"
        | "BallTriangle"
        | "Bars"
        | "Circles"
        | "Grid"
        | "Hearts"
        | "Oval"
        | "Puff"
        | "Rings"
        | "TailSpin"
        | "ThreeDots"
        | "Watch"
        | "RevolvingDot"
        | "Triangle"
        | "Plane"
        | "MutatingDots"
        | "CradleLoader";
}

export const Spinner: FC<IProps> = ({
    className,
    size = "md",
    color = "primary",
    type = "Oval",
    ...restProps
}) => {
    const theme = useTheme();
    const sizeValue = useMemo(() => {
        switch (size) {
            case "xs":
                return 16;
            case "sm":
                return 16 * 1.5;
            case "md":
                return 16 * 2;
            case "lg":
                return 16 * 2.5;
            case "xl":
                return 16 * 3;
            default:
                return 16 * 2;
        }
    }, [size]);

    return (
        <Loader
            type={type}
            color={get(theme, `colors.${color}`)}
            height={sizeValue}
            width={sizeValue}
            timeout={0}
            {...restProps}
        />
    );
};
