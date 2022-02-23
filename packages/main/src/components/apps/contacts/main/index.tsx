import { Button } from "@doar/components";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Share, Trash, X } from "react-feather";
import ModalDelete from "src/components/apps/contacts/main/modal-delete";
import PersonalDetails from "src/components/apps/contacts/main/personal-details";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import {
    StyledMain,
    SidebarButton,
    StyledButton,
    StyledTypeCheck,
    StyledHeader,
    StyledTitle,
} from "./style";

const Main: FC = () => {
    const [leadCheck, setLeadCheck] = useState<number[]>([]);
    const {
        stage,
        idLocation,
        idProcedure,
        idStaff,
        createdFrom,
        createdTo,
        source,
        inputValue,
    } = useAppSelector((store) => store.contact.search_filter);
    const defaultType = useMemo(
        () => ({
            keyword: "",
            created_from: 0,
            created_to: 0,
            source: "",
            procedure_id: 0,
            stage: "",
            location_id: 0,
            staff_id: 0,
        }),
        []
    );

    const [typeCheck, setTypeCheck] = useState(defaultType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            stage ||
            idLocation ||
            idProcedure ||
            idStaff ||
            createdFrom ||
            createdTo ||
            source ||
            inputValue
        ) {
            setTypeCheck({
                keyword: inputValue || defaultType.keyword,
                created_from: createdFrom || defaultType.created_from,
                created_to: createdTo || defaultType.created_to,
                source: source || defaultType.source,
                procedure_id: idProcedure || defaultType.procedure_id,
                stage: stage || defaultType.stage,
                location_id: idLocation || defaultType.location_id,
                staff_id: idStaff || defaultType.staff_id,
            });
        }
    }, [
        stage,
        idLocation,
        idProcedure,
        idStaff,
        createdFrom,
        createdTo,
        source,
        defaultType,
        inputValue,
    ]);

    const onselectLead = useCallback((array: number[]) => {
        const tempNewArray = array.filter((i) => i !== undefined);
        setLeadCheck(tempNewArray);
    }, []);

    const onReset = () => {
        setLeadCheck([]);
    };

    const [showDelete, setShowDelete] = useState(false);
    const handleModalDelete = () => {
        setShowDelete((prev) => !prev);
    };

    const handleRemoveFilter = (type: keyof typeof typeCheck) => {
        switch (type) {
            case "created_from":
            case "created_to":
            case "location_id":
            case "procedure_id":
            case "staff_id":
                setTypeCheck({ ...typeCheck, [type]: 0 });
                dispatch(
                    doGetLeads({
                        ...typeCheck,
                        [type]: 0,
                    })
                );
                break;
            case "source":
            case "stage":
                setTypeCheck({ ...typeCheck, [type]: "" });
                dispatch(
                    doGetLeads({
                        ...typeCheck,
                        [type]: "",
                    })
                );
                break;
            default:
                break;
        }
    };
    return (
        <StyledMain className="main-content">
            <StyledHeader>
                <StyledTitle className="headerTitle"> Contacts </StyledTitle>
                {typeCheck.created_from !== 0 && typeCheck.created_to !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("created_from")}
                            className="pointer"
                        />
                        <p>Type:Date</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.staff_id !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("staff_id")}
                            className="pointer"
                        />
                        <p>Type:Staff</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.location_id !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("location_id")}
                            className="pointer"
                        />
                        <p>Type:Location</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.procedure_id !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("procedure_id")}
                            className="pointer"
                        />
                        <p>Type:Procedure</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.stage && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("stage")}
                            className="pointer"
                        />
                        <p>Type:Stage</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.source && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("source")}
                            className="pointer"
                        />
                        <p>Type:Source</p>
                    </StyledTypeCheck>
                )}
            </StyledHeader>
            <SidebarButton>
                {leadCheck.length > 0 ? (
                    <>
                        <StyledButton>
                            <p className="itemSelected">
                                {leadCheck.length} items selected
                            </p>
                            <Button
                                variant="outlined"
                                color="light"
                                className="exportBtn"
                            >
                                <span className="shareIcon">
                                    <Share size={18} />
                                </span>
                                Export
                            </Button>
                            <Button
                                variant="outlined"
                                color="light"
                                className="deleteBtn"
                                onClick={handleModalDelete}
                            >
                                <span className="deleteIcon">
                                    <Trash size={18} />
                                </span>
                                Delete
                            </Button>
                            <ModalDelete
                                show={showDelete}
                                onClose={handleModalDelete}
                                idLeadCheck={leadCheck}
                                onReset={onReset}
                            />
                        </StyledButton>
                        <PersonalDetails onSelect={onselectLead} />
                    </>
                ) : (
                    <>
                        <StyledButton className="noSelect">
                            <Button
                                variant="outlined"
                                color="light"
                                disabled
                                className="disabledExport"
                            >
                                <span className="shareIcon">
                                    <Share size={18} />
                                </span>
                                Export
                            </Button>
                        </StyledButton>
                        <PersonalDetails
                            onSelect={onselectLead}
                            className="noCheck"
                        />
                    </>
                )}
            </SidebarButton>
        </StyledMain>
    );
};

export default Main;
