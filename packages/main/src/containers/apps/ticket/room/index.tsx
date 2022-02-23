import DailyIframe from "@daily-co/daily-js";
import { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "src/redux/hooks";
import { Rnd } from "react-rnd";
import { StyledIFrame, StyledDrag, StyledDragAndResize } from "./style";


interface IProps {
    url: string;
    onLeave: () => void;
    callLead?: string;
}

const Room: FC<IProps> = ({
    url,
    onLeave,
    callLead
}) => {
    const iframeRef = useRef() as React.MutableRefObject<HTMLIFrameElement>;
    const { path } = useAppSelector((store) => store.ticket.ui);
    /* eslint-disable consistent-return */
    useEffect(() => {
        const daily = DailyIframe.wrap(iframeRef.current, {
            showLeaveButton: true,
            showFullscreenButton: true
        });

        daily.on('left-meeting', () => {
            onLeave()
        });

        daily.join({ url }).then(() => { }, () => { });

        return () => {
            daily.destroy().then(() => { }, () => { });
        };
    }, [url, onLeave]);

    useEffect(() => {
        if (path === 'logout') {
            return onLeave()
        }
    }, [path, onLeave])

    const [state, setState] = useState({ x: 0, y: 0, width: 400, height: 1200 });
    const [stateDrag, setStateDrag] = useState({ x: 0, y: 0, width: 222, height: 464 });
    const style = {
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0",
    } as const;
    return (
        <StyledDragAndResize className={classNames({
            "drag": path !== callLead,
            "noDrag": path === callLead
        })}>
            <Rnd
                className={classNames({
                    "drag": path !== callLead,
                    "noDrag": path === callLead
                })}
                style={style}
                size={path !== callLead ? { width: stateDrag.width, height: stateDrag.height } : { width: state.width, height: state.height }}
                position={path !== callLead ? { x: stateDrag.x, y: stateDrag.y } : { x: state.x, y: state.y }}
                onDragStop={(e, d) => {
                    setStateDrag({ ...stateDrag, x: d.x, y: d.y })
                    setState({ ...state, x: d.x, y: d.y })
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    setStateDrag({
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                        ...position
                    })
                    setState({
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                        ...position
                    })
                }}
            >
                <StyledDrag className={classNames({
                    "dragWrap": path !== callLead,
                })}>
                    <StyledIFrame id="room__meeting" className={classNames({
                        "dragIframe": path !== callLead,
                    })} ref={iframeRef} title="room" allow="camera; microphone; fullscreen; display-capture; autoplay;" key={url} />
                </StyledDrag>
            </Rnd>
        </StyledDragAndResize>
    )
};

export default Room;