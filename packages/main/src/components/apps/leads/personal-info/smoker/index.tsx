import { FC, useEffect, useState } from "react";
import SimpleSwitch from "src/components/apps/settings/services/procedures-table/simple-switch";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doUpdateLead } from "src/redux/slices/contacts/lead";
import { StyledInfoWrap } from "../style";

const Smoker: FC = () => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(false);
    const { lead } = useAppSelector((store) => store.contact.lead);

    useEffect(() => {
        if (lead) {
            setValue(!!lead.smoker);
        }
    }, [lead]);

    const handleSave = (val: boolean) => {
        dispatch(
            doUpdateLead({
                id: lead?.id || 0,
                form: {
                    smoker: val,
                },
            })
        );
    };

    return (
        <StyledInfoWrap>
            <div className="label">Smoker</div>
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

export default Smoker;
