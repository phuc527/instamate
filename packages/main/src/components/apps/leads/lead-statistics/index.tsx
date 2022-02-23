import { Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import {
    Activity,
    ArrowLeftCircle,
    Calendar,
    Copy,
    File,
    Info,
    Mail,
    MessageSquare,
    Phone,
    Video,
} from "react-feather";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
import {
    StyledCopyBtn,
    StyledHeader,
    StyledMedia,
    StyledMediaWrap,
    StyledOption,
    StyledStatisticsWrap,
    StyledWrap,
} from "./style";

const LeadStatistics: FC = () => {
    const history = useHistory();
    const { loading, lead } = useAppSelector((store) => store.contact.lead);
    const [copied, setCopied] = useState(false);

    return (
        <StyledWrap>
            {loading ? (
                <div className="loading">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <StyledHeader>
                        <div className="backArrow">
                            <ArrowLeftCircle
                                size={25}
                                strokeWidth={1.2}
                                color={classic.text2}
                                onClick={() => history.push("/contacts")}
                            />
                        </div>
                        <div className="leadInfo">
                            <div className="leadName">
                                {lead?.first_name} {lead?.last_name}
                            </div>
                            <div className="leadEmail">{lead?.email}</div>
                            <CopyToClipboard
                                text={lead?.email || ""}
                                onCopy={() => setCopied(true)}
                            >
                                <StyledCopyBtn className="copyBtn">
                                    <Copy
                                        color={classic.gray700}
                                        size={18}
                                        strokeWidth={2.5}
                                    />
                                    <div className="tooltip">
                                        {copied ? "Copied!" : "Copy"}
                                    </div>
                                </StyledCopyBtn>
                            </CopyToClipboard>
                        </div>
                        <div className="nameIconWrap">
                            <div className="nameIcon">
                                <span className="nameInitial">
                                    {lead?.first_name ? lead.first_name[0] : ""}
                                    {lead?.last_name ? lead.last_name[0] : ""}
                                </span>
                            </div>
                        </div>
                    </StyledHeader>
                    <StyledMediaWrap>
                        <StyledMedia $color={classic.primary}>
                            <div className="button">
                                <div className="icon">
                                    <MessageSquare
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Text</div>
                        </StyledMedia>
                        <StyledMedia $color={classic.teal}>
                            <div className="button">
                                <div className="icon">
                                    <Phone
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Call</div>
                        </StyledMedia>
                        <StyledMedia $color={classic.pink}>
                            <div className="button">
                                <div className="icon">
                                    <Video
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Video</div>
                        </StyledMedia>
                        <StyledMedia $color="#F59F3A">
                            <div className="button">
                                <div className="icon">
                                    <Mail
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Email</div>
                        </StyledMedia>
                    </StyledMediaWrap>
                    <StyledStatisticsWrap>
                        <StyledOption className="active">
                            <div className="icon">
                                <Info
                                    color={classic.gray700}
                                    size={18}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div className="optionName">Info</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <Activity
                                    color={classic.gray700}
                                    size={18}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div className="optionName">Activity</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <MessageSquare
                                    color={classic.gray700}
                                    size={18}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div className="optionName">Conversations</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <File
                                    color={classic.gray700}
                                    size={18}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div className="optionName">Files</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <Calendar
                                    color={classic.gray700}
                                    size={18}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div className="optionName">Appointments</div>
                            <div className="number">0</div>
                        </StyledOption>
                    </StyledStatisticsWrap>
                </div>
            )}
        </StyledWrap>
    );
};

export default LeadStatistics;
