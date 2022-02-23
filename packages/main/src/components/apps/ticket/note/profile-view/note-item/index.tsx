import {
    Anchor,
    Avatar,
    CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Heading,
    Media,
    MediaBody
} from "@doar/components";
import moment from "moment";
import {FC, KeyboardEvent, useState} from "react";
import {MoreVertical} from "react-feather";
import {useAppDispatch} from "../../../../../../redux/hooks";
import {update} from "../../../../../../redux/slices/ticket/note";
import {StyledCard, StyledLeftHeader, StyledTime} from "./style";
import {getStaffsApi} from "../../../../../../api/staff/staff";
import Mentions from "../../../../../widgets/mentions/Mentions";
import {Note} from "../../../../../../types/api/ticket";
import {MentionsHighlightDisplay} from "./mention-display";

interface Props {
    note: Note;
}

const NoteItem: FC<Props> = ({note}) => {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(note.note);
    const [loading, setLoading] = useState(false);
    const [showEditable, setShowEditable] = useState(false);
    const [data, setData] = useState([] as {id: number, display: string}[]);
    const fetchStaffApi = () => {
        getStaffsApi(null)
            .then((r) => {
                setData(r.data.map(staff => {
                    return {id: staff.id, display: [staff.first_name, staff.last_name].join(' ')};
                }));
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const dispatch = useAppDispatch();

    const onSubmit = () => {
        if (value.trim() !== "" && !loading) {
            setLoading(true);
            dispatch(
                update({
                    id: note.id,
                    note: value.trim(),
                    onSuccess: () => {
                        setLoading(false);
                        setEditable(false);
                    },
                    onFail: () => {
                        setLoading(false);
                        setEditable(false);
                    },
                })
            );
        }
    };

    const onChange = (e: {target: {value: string;}}) => {
        setValue(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
        }
        if (e.key === "Escape") {
            setEditable(false);
        }
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const onBlur = (e: any, clickedSuggestion: boolean) => {
        if(!clickedSuggestion) setEditable(false);
    };

    return (
        <StyledCard mb="15px">
            <CardBody p={["20px", "20px", null, "25px"]}>
                <Media alignItems="center" mb="20px">
                    <Avatar status="online">
                        <img
                            src={
                                note.staff.photo ||
                                `https://ui-avatars.com/api/?name=${String(
                                    note.staff.first_name
                                )}+${String(note.staff.last_name)}`
                            }
                            alt="avatar"
                        />
                    </Avatar>
                    <MediaBody ml="15px">
                        <Heading mb="3px">
                            {[note.staff.first_name, note.staff.last_name].join(
                                " "
                            )}
                        </Heading>
                    </MediaBody>
                    <StyledLeftHeader>
                        <StyledTime>
                            {moment(note.created_at).fromNow()}
                        </StyledTime>
                        <Dropdown direction="left">
                            <DropdownToggle variant="texted">
                                <Anchor path="#!" variant="link3">
                                    <MoreVertical width={18} height={18}/>
                                </Anchor>
                            </DropdownToggle>
                            <DropdownMenu show={showEditable}>
                                {
                                    !editable ?
                                        <DropdownItem path="#" onClick={() => {
                                            setEditable(true);
                                            setShowEditable(false);
                                            fetchStaffApi();
                                        }}>
                                            Edit
                                        </DropdownItem>
                                        : <DropdownItem path="#" onClick={() => {
                                            setEditable(false)
                                            setShowEditable(false);
                                        }}>
                                            Cancel
                                        </DropdownItem>
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </StyledLeftHeader>
                </Media>
                {
                    editable?
                        <Mentions
                            value={value}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            onBlur={onBlur}
                            trigger="@"
                            data={data} />:
                        <MentionsHighlightDisplay mb="20px" value={note.note} />
                }
            </CardBody>
        </StyledCard>
    )
        ;
};

export default NoteItem;
