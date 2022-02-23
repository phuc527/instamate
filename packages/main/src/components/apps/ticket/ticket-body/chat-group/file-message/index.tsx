import { CardBody } from "@doar/components";
import classNames from "classnames";
import React, { FC, useMemo } from "react";
import { Message } from "src/types/api/ticket";
import { StyledCard, StyledImg, StyledThumb } from "./style";

type Props = {
    message: Message;
};
const FileMessage: FC<Props> = ({ message }) => {
    const icon = useMemo(() => {
        switch (message.messageable?.file?.mime_type) {
            case "application/pdf": {
                return "far fa-file-pdf";
                break;
            }
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            case "application/msword": {
                return "far fa-file-word";
                break;
            }
            default: {
                return "far fa-file-alt";
                break;
            }
        }
    }, [message.messageable?.file?.mime_type]);

    const isImage = useMemo(() => {
        return message.messageable?.file?.mime_type.startsWith("image/");
    }, [message.messageable?.file?.mime_type]);

    return (
        <StyledCard className={classNames({
            'showStatus': message.ticket
        })}>
            <CardBody>
                <StyledThumb>
                    {isImage ? (
                        <StyledImg
                            src={message.messageable.file?.content}
                            alt="img"
                        />
                    ) : (
                        <i className={icon} />
                    )}
                </StyledThumb>
            </CardBody>
        </StyledCard>
    );
};

export default FileMessage;
