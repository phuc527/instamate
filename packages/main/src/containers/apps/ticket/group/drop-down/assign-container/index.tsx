import { useState, useCallback, FC, useEffect, ChangeEvent } from "react";
import { Spinner, Avatar } from "@doar/components";
import { debounce } from "lodash-es";
import { Staff } from "src/types/api/staff";
import { getStaffsApi } from "src/api/staff/staff";
import {
    StyledInputWrapper,
    StyledSearchInput,
    StyledStaffName,
    StyledSpinnerWrapper,
    StyledStaffWrapper,
    StyledTicketCountItem,
} from "./style";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { updateBatched } from "../../../../../../redux/slices/ticket/list";

const AssignContainer: FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((store) => store.authentication.user);
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(false);
    const handleFetch = (name: string | null) => {
        const params = name ? { name } : null;
        setLoading(true);
        setData([]);
        getStaffsApi(params)
            .then((r) => {
                setData(r.data.filter((staff) => staff.id !== auth?.staff?.id));
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleFetch(null);
        return () => setData([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce(handleFetch, 500), []);

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        e.preventDefault();
        handleSearch(e.target.value);
        setInputValue(e.target.value);
    };
    const onUpdateBatched = (staff_id: number) => {
        dispatch(updateBatched({ type: "assigned", staff_id }));
    };

    return (
        <>
            <StyledInputWrapper>
                <StyledSearchInput
                    inputLoading={false}
                    autoComplete="off"
                    id="search-input"
                    placeholder="Search User"
                    onChange={onChangeInput}
                    value={inputValue}
                    key="search"
                />
                {loading && (
                    <StyledSpinnerWrapper>
                        <Spinner size="xs" />
                    </StyledSpinnerWrapper>
                )}
            </StyledInputWrapper>
            {auth?.staff && (
                <StyledStaffWrapper
                    onClick={() => onUpdateBatched(Number(auth?.staff?.id))}
                >
                    <Avatar>
                        <img
                            src={
                                auth?.staff?.photo ||
                                `https://ui-avatars.com/api/?name=${String(
                                    auth?.staff?.first_name
                                )}+${String(auth?.staff?.last_name)}`
                            }
                            alt="name"
                        />
                    </Avatar>
                    <StyledStaffName>Assign to me</StyledStaffName>
                </StyledStaffWrapper>
            )}
            {data.map((i) => (
                <StyledStaffWrapper
                    key={i.id}
                    onClick={() => onUpdateBatched(i.id)}
                >
                    <Avatar>
                        <img
                            src={
                                i.photo ||
                                `https://ui-avatars.com/api/?name=${String(
                                    i.first_name
                                )}+${String(i.last_name)}`
                            }
                            alt="name"
                        />
                    </Avatar>
                    <StyledStaffName>
                        {[i.first_name, i.last_name].join(" ")}
                    </StyledStaffName>

                    <StyledTicketCountItem>
                        {i.tickets_count}
                    </StyledTicketCountItem>
                </StyledStaffWrapper>
            ))}
        </>
    );
};

export default AssignContainer;
