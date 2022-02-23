import { FC } from "react";
import {
    Avatar,
    MediaBody,
    Text,
} from "@doar/components";
import {StyledMedia, StyledTop} from "../../../../components/apps/ticket/group-item/style";
import {MentionsHighlightDisplay} from "./mention-hightlight-display";

interface IProps {
    image?: string;
    name: string;
    time: string;
    excerpt: string;
    status?: string;
    onClick?: () => void;
}

const GroupItem: FC<IProps> = ({
    image,
    name,
    time,
    excerpt,
    status,
    onClick,
}) => {
    return (
        <StyledMedia className={status} onClick={onClick}>
            <Avatar status="online">
                <img
                    src={image}
                    alt="avatar"
                />
            </Avatar>
            <MediaBody ml="15px">
                <StyledTop>
                    <Text as="b" fontSize="12px">@{name}</Text>
                    <Text as="span" fontSize="12px">
                        mention you at
                    </Text>
                    <Text as="span" fontSize="11px">
                        {time}
                    </Text>
                </StyledTop>
                <MentionsHighlightDisplay value={excerpt} />
            </MediaBody>
        </StyledMedia>
    );
};

GroupItem.defaultProps = {
    status: "read",
};

export default GroupItem;
