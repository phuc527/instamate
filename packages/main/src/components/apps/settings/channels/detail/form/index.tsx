import React, { FC } from "react";
import { Channel } from "src/types/api/channel";
import EmailForm from "./email-form";

interface Props {
    channel: Channel;
}
const ChannelDetailForm: FC<Props> = ({ channel }) => {
    return <>{channel.name === "email" && <EmailForm channel={channel} />}</>;
};

export default ChannelDetailForm;
