import { ColorProps, LayoutProps, SpaceProps, TypographyProps } from "@doar/shared";
import { ElementType, FC } from "react";
import {StyledMentionDisplay, StyledText} from "./styles";

interface IProps extends SpaceProps, ColorProps, TypographyProps, LayoutProps {
    as?: ElementType;
    className?: string;
    value: string;
}

export const MentionsDisplay: FC<IProps> = ({ as, className, value, ...restProps }) => {
    const displayValues = [];
    let index = 0;
    const regexp = new RegExp('@\\[(.*?)]\\(\\d+\\)', 'g');

    let match = regexp.exec(value);
    while (match !== null) {
        displayValues.push(<span key={`text-${index}`}>{value.substring(index, match.index)}</span>);
        displayValues.push(<StyledMentionDisplay key={match.index}>@{match[1]}</StyledMentionDisplay>);
        index = regexp.lastIndex;
        match = regexp.exec(value);
    }
    displayValues.push(value.substring(index));
    return (
        <StyledText as={as} className={className} {...restProps}>
            {displayValues}
        </StyledText>
    );
};