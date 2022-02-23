import { FC, useEffect, useState } from "react";
import SimpleSwitch from "src/components/apps/settings/services/procedures-table/simple-switch";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import { StyledInfoWrap } from "../style";

const SMSOptOut: FC = () => {
    const [value, setValue] = useState(false);
    const dispatch = useAppDispatch();
    const { lead } = useAppSelector((store) => store.contact.lead);
    useEffect(() => {
        if (lead) {
            setValue(!!lead.sms_optout);
        }
    }, [lead]);

    const handleSave = (val: boolean) => {
        dispatch(
            doUpdateLead({
                id: lead?.id || 0,
                form: {
                    sms_optout: val,
                },
            })
        );
    };

    return (
        <StyledInfoWrap>
            <div className="label">SMS Opt-Out</div>
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

export default SMSOptOut;
