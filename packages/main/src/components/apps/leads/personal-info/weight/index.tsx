import { Input } from "@doar/components";
import useOnEscape from "@doar/shared/hooks/use-on-escape";
import { classic } from "@doar/shared/styled/colors";
import classNames from "classnames";
import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import { StyledInfoWrap, StyledNoInfo } from "../style";

const Weight: FC = () => {
    const [isEditing, setEditing] = useState(false);
    const ref = useOnclickOutside(() => setEditing(false));
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(0);
    const { lead } = useAppSelector((store) => store.contact.lead);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useOnEscape(() => setEditing(false));

    useEffect(() => {
        if (isEditing && inputRef?.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        if (lead) {
            setValue(lead.weight || 0);
        }
    }, [lead]);

    const handleSave = useMemo(
        () =>
            debounce(
                (val: number) =>
                    dispatch(
                        doUpdateLead({
                            id: lead?.id || 0,
                            form: {
                                weight: val,
                            },
                        })
                    ),
                500
            ),
        [dispatch, lead]
    );
    return (
        <StyledInfoWrap
            ref={ref}
            onClick={() => setEditing(true)}
            className={classNames({
                editable: isEditing,
            })}
        >
            <div className="label">Weight</div>
            <div className="editForm">
                <Input
                    ref={inputRef}
                    type="number"
                    id="edit-lead-weight"
                    name="edit-lead-weight"
                    placeholder="Enter weight"
                    value={value}
                    onChange={(e) => {
                        setValue(Number(e.target.value));
                        if (e.target.value) {
                            handleSave(Number(e.target.value));
                        }
                    }}
                />
            </div>
            <div className="editIcon">
                <Edit3 size={18} color={classic.gray500} />
            </div>
            <div className="content">
                {value || <StyledNoInfo>&#8212;</StyledNoInfo>}
            </div>
        </StyledInfoWrap>
    );
};

export default Weight;
