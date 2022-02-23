import { FC, useState } from "react";
import { CheckCircle, Clock } from "react-feather";
import { Message } from "src/types/api/ticket";
import {
    StyledAnswer,
    StyledCard,
    StyledCardBody,
    StyledContent,
    StyledContentWrapper,
    StyledQualificationItem,
    StyledQualificationStatus,
    StyledQuestion,
    StyledSeenAllText,
} from "./style";

interface Props {
    message: Message;
}

const Qualification: FC<Props> = ({ message }) => {
    const [seeAll, setSeeAll] = useState(false);
    return (
        <StyledCard>
            <StyledCardBody>
                <StyledContentWrapper>
                    <StyledContent>
                        {message.messageable.qualification?.values &&
                            Object.entries(
                                message.messageable.qualification?.values
                            )
                                .filter((i, index) => index === 0)
                                .map(([k, v]) => (
                                    <StyledQualificationItem key={k}>
                                        <StyledQuestion>{k}</StyledQuestion>
                                        <StyledAnswer>{String(v)}</StyledAnswer>
                                    </StyledQualificationItem>
                                ))}
                    </StyledContent>
                    <StyledQualificationStatus
                        pass={Boolean(message.messageable.qualification?.pass)}
                    >
                        {message.messageable.qualification?.pass ? (
                            <>
                                <CheckCircle width={18} />
                                <span>Qualified</span>
                            </>
                        ) : (
                            <>
                                <Clock width={18} />
                                <span>Manual Review</span>
                            </>
                        )}
                    </StyledQualificationStatus>
                </StyledContentWrapper>
                <StyledContentWrapper>
                    <StyledContent>
                        {message.messageable.qualification?.values &&
                            Object.entries(
                                message.messageable.qualification?.values
                            )
                                ?.filter(
                                    (_, index) =>
                                        (seeAll || index < 2) && index !== 0
                                )
                                .map(([k, v]) => (
                                    <StyledQualificationItem key={k}>
                                        <StyledQuestion>{k}</StyledQuestion>
                                        <StyledAnswer>{String(v)}</StyledAnswer>
                                    </StyledQualificationItem>
                                ))}
                    </StyledContent>
                </StyledContentWrapper>
                {message.messageable.qualification?.values &&
                    Object.entries(message.messageable.qualification?.values)
                        .length > 2 && (
                        <StyledSeenAllText onClick={() => setSeeAll(!seeAll)}>
                            {seeAll ? "Hide" : "See more"} answers
                        </StyledSeenAllText>
                    )}
            </StyledCardBody>
        </StyledCard>
    );
};

export default Qualification;
