/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Spinner } from "@doar/components";
import { FC, useEffect, useState, useRef } from "react";
import { Edit3 } from "react-feather";
import { useAppDispatch } from "src/redux/hooks";
import { create } from "src/redux/slices/ticket/note";
import { OnChangeHandlerFunc, SuggestionDataItem } from "react-mentions";
import { Ticket } from "src/types/api/ticket";
import { StyledShare, StyledMentions, StyledWrap, StyledIcon } from "./style";
import { getStaffsApi } from "../../../../../../api/staff/staff";

interface Props {
    ticket: Ticket | null | undefined;
}
const UpdateNote: FC<Props> = ({ ticket }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        // set value = '' when change ticket
        setValue("");
    }, [ticket]);

    const [loading, setLoading] = useState(false);

    const fetchStaff = async (
        query: string,
        callback: (data: SuggestionDataItem[]) => void
    ): Promise<void> => {
        await getStaffsApi(query === "" ? null : { name: query })
            .then((r) =>
                r.data.map((staff) => {
                    return {
                        id: staff.id,
                        display: [staff.first_name, staff.last_name].join("."),
                    };
                })
            )
            .then(callback);
    };
    const dispatch = useAppDispatch();
    const onChange: OnChangeHandlerFunc = (e) => {
        setValue(e.target.value);
    };
    const onSubmit = () => {
        if (value.trim() !== "" && !loading) {
            setLoading(true);
            dispatch(
                create({
                    note: value.trim(),
                    onSuccess: () => {
                        setLoading(false);
                    },
                    onFail: () => {
                        setLoading(false);
                    },
                })
            );
            setValue("");
        }
    };

    return (
        <StyledWrap>
            <StyledShare>
                <StyledIcon>
                    <Edit3 width={14} height={14} />
                </StyledIcon>

                <StyledMentions
                    placeholder="Type a note"
                    onChange={onChange}
                    value={value}
                    data={fetchStaff}
                    suggestionsPortalHost={document.body}
                    forceSuggestionsAboveCursor
                    allowSuggestionsAboveCursor
                />
            </StyledShare>
            <div style={{ marginLeft: "auto" }}>
                <Button onClick={onSubmit}>
                    {loading ? (
                        <Spinner size="xs" color="white" />
                    ) : (
                        "Create note"
                    )}
                </Button>
            </div>
        </StyledWrap>
    );
};

export default UpdateNote;
