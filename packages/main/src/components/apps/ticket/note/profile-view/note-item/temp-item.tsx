import {
    Anchor,
    Avatar,
    CardBody,
    Heading,
    Media,
    MediaBody,
    Text,
} from "@doar/components";
import moment from "moment";
import { FC } from "react";
import { MoreVertical } from "react-feather";
import { useAppSelector } from "src/redux/hooks";
import { StyledCard, StyledLeftHeader, StyledTime } from "./style";

const TempNoteItem: FC<{ note: string }> = ({ note }) => {
    const authStaff = useAppSelector(
        (store) => store.authentication.user?.staff
    );
    return (
        <StyledCard mb={["10px", null, null, "15px"]}>
            <CardBody p={["20px", "20px", null, "25px"]}>
                <Media alignItems="center" mb="20px">
                    <Avatar status="online">
                        <img
                            src={
                                authStaff?.photo ||
                                `https://ui-avatars.com/api/?name=${String(
                                    authStaff?.first_name
                                )}+${String(authStaff?.last_name)}`
                            }
                            alt="avatar"
                        />
                    </Avatar>
                    <MediaBody ml="15px">
                        <Heading mb="3px">
                            {[authStaff?.first_name, authStaff?.last_name].join(
                                " "
                            )}
                        </Heading>
                    </MediaBody>
                    <StyledLeftHeader>
                        <StyledTime>{moment(new Date()).fromNow()}</StyledTime>
                        <Anchor path="#!" variant="link3">
                            <MoreVertical width={18} height={18} />
                        </Anchor>
                    </StyledLeftHeader>
                </Media>
                <Text mb="20px">{note}</Text>
            </CardBody>
        </StyledCard>
    );
};

export default TempNoteItem;
