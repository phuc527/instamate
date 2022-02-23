import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import DatePicker from "src/components/date-picker";
import moment from "moment";
import { Calendar } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap, StyledCreateAt } from "./style";

const CreatedAt: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <Calendar size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Created at</StyledLabel>
        </StyledLabelWrap>
    );

    const dispatch = useAppDispatch();
    const { idLocation, inputValue, idProcedure, idStaff, stage, source } = useAppSelector(store => store.contact.search_filter);
    const [currentDate] = useState<{ start: Date; end: Date }>({
        start: new Date(),
        end: new Date(),
    });
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        createStartDate: "",
        createEndDate: "",
    });

    useEffect(() => {
        setValues((prev) => {
            return {
                ...prev,
                createStartDate: moment(currentDate.start).format(
                    "YYYY-MM-DD"
                ),
                createEndDate: moment(currentDate.end).format(
                    "YYYY-MM-DD"
                ),
            };
        });
    }, [currentDate]);

    const getDate = (name: string, date: string) => {
        const dateFormat = moment(date).format(
            "YYYY-MM-DD"
        )
        setValues((prev) => {
            return {
                ...prev,
                [name]: dateFormat,
            };
        });

        if (name === 'createStartDate') {
            if (Date.parse(dateFormat) / 1000 > Date.parse(values.createEndDate) / 1000) {
                setError('Date from')
            } else {
                setError('')
            }
            dispatch(doGetLeads({
                ...(dateFormat && {
                    created_from: Date.parse(dateFormat) / 1000,
                    created_to: Date.parse(values.createEndDate) / 1000
                }),
                source: source || null,
                stage: stage || null,
                location_id: idLocation || 0,
                keyword: inputValue || null,
                procedure_id: idProcedure || 0,
                staff_id: idStaff || 0
            }))
        } else {
            if (Date.parse(dateFormat) / 1000 < Date.parse(values.createEndDate) / 1000) {
                setError('Date to')
            } else {
                setError('')
            }
            dispatch(doGetLeads({
                ...(dateFormat && {
                    created_from: Date.parse(values.createStartDate) / 1000,
                    created_to: Date.parse(dateFormat) / 1000
                }),
                source: source || null,
                stage: stage || null,
                location_id: idLocation || 0,
                keyword: inputValue || null,
                procedure_id: idProcedure || 0,
                staff_id: idStaff || 0
            }))

        }

    }

    const renderContent = () => (
        <StyledCreateAt>
            <p className="textFont">From</p>
            <div className="datePicker">
                <DatePicker
                    maxDate="maxStartDate"
                    id="createStartDate"
                    name="createStartDate"
                    placeholder="Select Date"
                    getDate={getDate}
                    currentDate={new Date(values.createStartDate)}
                />
                {error === 'Date from' && (<p>Date From must be smaller Date To</p>)}
            </div>
            <p className="textFont">To</p>
            <div className="datePicker">
                <DatePicker
                    maxDate="maxEndDate"
                    id="createEndDate"
                    name="createEndDate"
                    placeholder="Select Date"
                    getDate={getDate}
                    currentDate={new Date(values.createEndDate)}
                />
                {error === 'Date to' && (<p>Date From must be bigger Date To</p>)}
            </div>
        </StyledCreateAt>
    );
    return <SideDropdown title={renderLabel()} content={renderContent()} />;
};

export default CreatedAt;
