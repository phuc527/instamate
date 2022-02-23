import { ColorProps, LayoutProps, SpaceProps, TypographyProps } from "@doar/shared";
import { ElementType, FC } from "react";
import {StyledMentionDisplay, StyledMentionOtherDisplay, StyledText} from "../../../../../widgets/mentions/styles";
import {useAppSelector} from "../../../../../../redux/hooks";

interface IProps extends SpaceProps, ColorProps, TypographyProps, LayoutProps {
    as?: ElementType;
    className?: string;
    value: string;
    highlightValue?: string;
}

export const MentionsHighlightDisplay: FC<IProps> = ({ as, className, highlightValue, value, ...restProps }) => {
    const displayValues = [];
    let index = 0;
    const regexp = new RegExp('@\\[(.*?)]\\(\\d+\\)', 'g');
    const staff = useAppSelector(state => state.authentication.user?.staff);
    const staffMention = [staff?.first_name,
        staff?.last_name,
    ].join(" ").replace(' ', '.');
    const highlight = highlightValue ?? staffMention;

    let match = regexp.exec(value);
    while (match !== null) {
        displayValues.push(<span key={`text-${index}`}>{value.substring(index, match.index)}</span>);
        displayValues.push(highlight === `${match[1]}`? <StyledMentionDisplay key={match.index}>@{match[1]}</StyledMentionDisplay>: <StyledMentionOtherDisplay key={match.index}>@{match[1]}</StyledMentionOtherDisplay>);
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