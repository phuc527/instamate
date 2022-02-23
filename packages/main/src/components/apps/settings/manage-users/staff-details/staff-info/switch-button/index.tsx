/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Button } from '@doar/components';
import classNames from 'classnames';
import { FC } from 'react';
import { StyledSwitchWrap } from './style';

interface IProps {
    state: "on" | "off";
    onSwitch: (state: boolean) => void;
    width?: number;
    height?: number;
    disabled?: boolean;
}
const Switch: FC<IProps> = ({
    state,
    onSwitch,
    width,
    height,
    disabled,
}) => {
    const onSwitchBtn = () => {
        if (state === "on") {
            onSwitch(false);
        }
        else onSwitch(true);
    }
    return (
        <StyledSwitchWrap
            className='switchContainer'
            $width={width}
            $height={height}
            onClick={onSwitchBtn}
        >
            <Button
                color='light'
                className={classNames({
                    "on": state === "on",
                    "off": state === "off"
                })}
                disabled={disabled}
            >
                <span className="pin" />
            </Button>
        </StyledSwitchWrap>
    )
}

export default Switch;
