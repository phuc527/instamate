import { Button } from "@doar/components";
import classNames from "classnames";
import { FC } from "react";
import { StyledSwitchWrap } from "./style";

interface IProps {
    state: "on" | "off";
    onSwitch: (state: boolean) => void;
}
const SimpleSwitch: FC<IProps> = ({ state, onSwitch }) => {
    const onSwitchBtn = () => {
        if (state === "on") {
            onSwitch(false);
        } else onSwitch(true);
    };
    return (
        <StyledSwitchWrap className="switchContainer" onClick={onSwitchBtn}>
            <Button
                color="light"
                className={classNames({
                    on: state === "on",
                    off: state === "off",
                })}
            >
                <span className="pin" />
            </Button>
        </StyledSwitchWrap>
    );
};

export default SimpleSwitch;
