import { Button } from "@doar/components";
import classNames from "classnames";
import { FC } from "react";
import { StyledSwitchWrap } from "./style";

interface IProps {
    state: "on" | "off";
    onSwitch: (state: boolean) => void;
    width?: number;
    height?: number;
    textOnMode?: string;
    textOffMode?: string;
    disabled?: boolean;
}
const Switch: FC<IProps> = ({
    state,
    onSwitch,
    width,
    height,
    textOffMode,
    textOnMode,
    disabled,
}) => {
    const onSwitchBtn = () => {
        if (state === "on") {
            onSwitch(false);
        } else onSwitch(true);
    };
    return (
        <StyledSwitchWrap
            className="switchContainer"
            $width={width}
            $height={height}
            onClick={onSwitchBtn}
        >
            <Button
                color="light"
                className={classNames({
                    on: state === "on",
                    off: state === "off",
                })}
                disabled={disabled}
            >
                <span className="enableText">{textOnMode}</span>
                <span className="disableText">{textOffMode}</span>
                <span className="pin">
                    {state === "on"
                        ? textOnMode
                        : state === "off" && textOffMode}
                </span>
            </Button>
        </StyledSwitchWrap>
    );
};

export default Switch;
