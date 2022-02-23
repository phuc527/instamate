import { Avatar, AvatarInitial, Media, Text } from "@doar/components";
import { FC } from "react";
import { StyledMediaBody, StyledSender } from "./style";

interface IProps {
    color?: string;
    image?: string;
    name: string;
    time: string;
}

const Sender: FC<IProps> = ({ color, image, name, time }) => {
    return (
        <Media alignItems="center">
            <Avatar size="sm">
                {!image && (
                    <AvatarInitial bg={color}>
                        {name.substring(0, 1)}
                    </AvatarInitial>
                )}
                {image && <img src={image} alt={name} />}
            </Avatar>
            <StyledMediaBody ml="10px">
                <StyledSender>{name}</StyledSender>
                <Text fontSize="11px" color="text3">
                    {time}
                </Text>
            </StyledMediaBody>
        </Media>
    );
};

export default Sender;
