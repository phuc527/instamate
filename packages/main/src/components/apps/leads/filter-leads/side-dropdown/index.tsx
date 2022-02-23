import classNames from "classnames";
import { FC, ReactElement, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import SmoothCollapse from "react-smooth-collapse";
import { StyledDropdownToggle, StyledWrap } from "./style";

interface IProps {
    title: ReactElement;
    content: ReactElement;
    hasFullBorder?: boolean;
}
const SideDropdown: FC<IProps> = ({ title, content, hasFullBorder }) => {
    const [show, setShow] = useState(false);
    return (
        <StyledWrap
            className={classNames({
                hasFullBorder,
            })}
        >
            <StyledDropdownToggle
                className="dropdownToggle"
                onClick={() => setShow(!show)}
            >
                {title}
                <div className="arrow">
                    {show ? (
                        <ChevronRight size={21} />
                    ) : (
                        <ChevronDown size={21} />
                    )}
                </div>
            </StyledDropdownToggle>
            <SmoothCollapse expanded={show}>
                <div className="dropdownContent">{content}</div>
            </SmoothCollapse>
        </StyledWrap>
    );
};

export default SideDropdown;
