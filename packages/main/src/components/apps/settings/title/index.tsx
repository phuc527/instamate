import { FC } from "react";
import { SpaceProps } from "@doar/shared/styled";
import { StyledTitle } from "./style";

type IProps = SpaceProps;

const Title: FC<IProps> = ({ children, ...restProps }) => {
    return <StyledTitle {...restProps}>{children}</StyledTitle>
}

export default Title;