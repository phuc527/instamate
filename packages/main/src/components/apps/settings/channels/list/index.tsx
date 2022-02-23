import { Spinner } from "@doar/components";
import { FC } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getChannelsApi } from "src/api/channel/channel";
import { ChannelApp } from "src/types/api/app";
import { Channel } from "src/types/api/channel";
import { StyledListItem, StyledLoading } from "./style";

interface Props {
    channelApp: ChannelApp;
}
const ChannelList: FC<Props> = ({ channelApp }) => {
    const history = useHistory();
    const { isLoading, data } = useQuery("fetchChannels", () =>
        getChannelsApi({ channel_app_id: channelApp.id })
    );

    const handleSelectChannel = (channel: Channel) => {
        history.push(`/settings/channels/${channelApp.id}/${channel.id}`);
    };

    return (
        <>
            {isLoading ? (
                <StyledLoading>
                    <Spinner />
                </StyledLoading>
            ) : (
                <ul>
                    {data?.data?.map((app) => (
                        <StyledListItem
                            key={app.id}
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelectChannel(app)}
                        >
                            {app.name}
                        </StyledListItem>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ChannelList;
