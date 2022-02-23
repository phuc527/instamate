import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import SimpleSwitch from "src/components/apps/settings/services/procedures-table/simple-switch";
import { StyledInfoWrap } from "../style";

const EmailOptOut: FC = () => {
    const [value, setValue] = useState(false);
    const dispatch = useAppDispatch();
    const { lead } = useAppSelector((store) => store.contact.lead);
    useEffect(() => {
        if (lead) {
            setValue(!!lead.email_optout);
        }
    }, [lead]);

    const handleSave = useMemo(
        () =>
            debounce(
                (val: boolean) =>
                    dispatch(
                        doUpdateLead({
                            id: lead?.id || 0,
                            form: {
                                email_optout: val,
                            },
                        })
                    ),
                500
            ),
        [dispatch, lead]
    );
    return (
        <StyledInfoWrap>
            <div className="label">Email Opt-Out</div>
            <div className="space" />
            <div className="content">
                <SimpleSwitch
                    state={value ? "on" : "off"}
                    onSwitch={(state) => {
                        setValue(state);
                        handleSave(state);
                    }}
                />
            </div>
        </StyledInfoWrap>
    );
};

export default EmailOptOut;
