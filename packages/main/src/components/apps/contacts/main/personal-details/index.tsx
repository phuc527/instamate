import classNames from "classnames";
import { ChevronDown } from "react-feather";
import { useClickOutside } from "@doar/shared/hooks";
import noResult from "@doar/shared/images/no_result.png";
import { Image, Spinner } from "@doar/components";
import { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
    doGetLeads,
    doGetAllLeads,
    doGetCheckAllPage,
    doUpdateLeadIds,
    doDeleteLeadIds,
    doDeleteAllLeadIds,
} from "src/redux/slices/contacts/lead";
import { Lead } from "src/types/api/ticket";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Pagination from "../pagination";
import {
    StyledCheckBoxText,
    StyledMenuItem,
    StyledMenu,
    StyledDropdown,
    StyledCard,
    StyledCheckBox,
    StyledTable,
    StyledCardBody,
    StyledTd,
    StyledTdHeader,
    StyledWrap,
    StyledBadge,
    StyledLoadingWrap,
    StyledNoResults,
    StyledCheckBoxMenu,
} from "./style";

interface Props {
    isCheckedAllPage: boolean;
    isCheckedAllContacts: boolean;
    onPageLead: Lead[];
    onSelectAllContacts: (data: boolean) => void;
    onSelectAllPage: (data: boolean) => void;
}

export const HandleCheckBox: FC<Props> = ({
    isCheckedAllPage,
    onPageLead,
    isCheckedAllContacts,
    onSelectAllContacts,
    onSelectAllPage,
}) => {
    const activeMenu = "main";
    const { receivingAllLeads } = useAppSelector((store) => store.contact.lead);
    const DropdownItem: FC = ({ children }) => {
        return (
            <>
                <StyledMenuItem>{children}</StyledMenuItem>
            </>
        );
    };
    const handleSelectAllContacts = () => {
        if (isCheckedAllContacts) {
            onSelectAllContacts(false);
        } else {
            onSelectAllContacts(true);
        }
    };
    const handleSelectAllPage = () => {
        if (isCheckedAllPage) {
            onSelectAllPage(false);
        } else {
            onSelectAllPage(true);
        }
    };
    return (
        <>
            <StyledDropdown>
                <CSSTransition
                    in={activeMenu === "main"}
                    timeout={0}
                    unmountOnExit
                >
                    <StyledMenu>
                        <StyledCheckBoxMenu
                            onClick={handleSelectAllPage}
                            aria-hidden="true"
                            className={classNames({
                                disabled: receivingAllLeads,
                            })}
                        >
                            <DropdownItem>
                                <StyledCheckBox
                                    id="allSelect"
                                    name="allSelect"
                                    onChange={handleSelectAllPage}
                                    checked={isCheckedAllPage}
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                />
                                <StyledCheckBoxText
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                >
                                    Select page ({onPageLead.length})
                                </StyledCheckBoxText>
                            </DropdownItem>
                        </StyledCheckBoxMenu>
                        <StyledCheckBoxMenu
                            onClick={handleSelectAllContacts}
                            aria-hidden="true"
                            className={classNames({
                                disabled: receivingAllLeads,
                            })}
                        >
                            <DropdownItem>
                                <StyledCheckBox
                                    id="selectAllContact"
                                    name="selectAllContact"
                                    onChange={handleSelectAllContacts}
                                    checked={isCheckedAllContacts}
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                />
                                <StyledCheckBoxText
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                >
                                    Select all contacts
                                </StyledCheckBoxText>
                            </DropdownItem>
                        </StyledCheckBoxMenu>
                    </StyledMenu>
                </CSSTransition>
            </StyledDropdown>
        </>
    );
};
interface IProps {
    onSelect: (array: number[]) => void;
    className?: string;
}

const PersonalDetails: FC<IProps> = ({ className, onSelect }) => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [defaultLead, setDefaultLead] = useState<Lead[] | []>([]);
    const [leadIds, setLeadIds] = useState<number[]>([]);
    const [isCheckedContact, setCheckedContact] = useState<boolean[]>([]);
    const [isCheckedAllContacts, setCheckedAllContacts] = useState(false);
    const [isChecked, setChecked] = useState<boolean[]>([]);
    const [isCheckedAllPage, setCheckedAllPage] = useState(false);
    const { loading, pagination, leads, listLeadIds } = useAppSelector(
        (store) => store.contact.lead
    );

    useEffect(() => {
        dispatch(
            doGetLeads({
                page: 1,
                limit: 25,
            })
        );
    }, [dispatch]);
    const onFirstPage = () => {
        setCheckedAllPage(false);
        dispatch(
            doGetLeads({
                limit: pagination.limit,
                page: 1,
            })
        );
        dispatch(
            doUpdateLeadIds({
                arrayLeadId: leadIds,
            })
        );
    };
    const onLastPage = () => {
        setCheckedAllPage(false);
        dispatch(
            doGetLeads({
                limit: pagination.limit,
                page: Math.round(pagination.total / pagination.limit),
            })
        );
        dispatch(
            doUpdateLeadIds({
                arrayLeadId: leadIds,
            })
        );
    };
    const onNextPage = () => {
        setCheckedAllPage(false);
        dispatch(
            doGetLeads({
                limit: pagination.limit,
                page: Number(pagination.currentPage) + 1,
            })
        );
        dispatch(
            doUpdateLeadIds({
                arrayLeadId: leadIds,
            })
        );
    };
    const onPrevPage = () => {
        setCheckedAllPage(false);
        dispatch(
            doGetLeads({
                limit: pagination.limit,
                page: Number(pagination.currentPage) - 1,
            })
        );
        dispatch(
            doUpdateLeadIds({
                arrayLeadId: leadIds,
            })
        );
    };

    useEffect(() => {
        if (leads) {
            const newLeads: Lead[] | null = leads;
            const checked: boolean[] = [];
            let count = 0;
            leads.forEach((value) => {
                if (listLeadIds.includes(value.id)) {
                    checked.push(true);
                    count += 1;
                } else {
                    checked.push(false);
                }
            });
            if (
                count === pagination.to - (pagination.from + 1) &&
                !isCheckedAllContacts
            ) {
                setCheckedAllPage(true);
            } else {
                setCheckedAllPage(false);
            }
            setChecked(checked);
            setDefaultLead(newLeads);
        }
    }, [leads, listLeadIds, isCheckedAllContacts, pagination]);

    const afterSelectPage = (array: boolean[]) => {
        const selectedLeads: number[] = [];
        array.forEach((i, index) => {
            if (i) {
                selectedLeads.push(defaultLead ? defaultLead[index]?.id : 0);
            }
        });
        const num = selectedLeads.concat(listLeadIds);
        let result: number[] = [];
        result = num.filter((element) => {
            return result.includes(element) ? "" : result.push(element);
        });
        setLeadIds(result);
        if (isCheckedAllContacts) {
            dispatch(
                doUpdateLeadIds({
                    arrayLeadId: selectedLeads,
                })
            );
        }
        onSelect(result);
    };

    useEffect(() => {
        if (listLeadIds) {
            const checked: boolean[] = [];
            let count = 0;
            defaultLead.forEach((value) => {
                if (listLeadIds.includes(value.id)) {
                    checked.push(true);
                    count += 1;
                } else {
                    checked.push(false);
                }
            });
            if (
                count === pagination.to - (pagination.from + 1) &&
                !isCheckedAllContacts
            ) {
                setCheckedAllPage(true);
            }
            setChecked(checked);
            setLeadIds(listLeadIds);
            onSelect(listLeadIds);
        }
    }, [listLeadIds, defaultLead, onSelect, isCheckedAllContacts, pagination]);

    const afterSelectContacts = (array: boolean[], allLeads?: Lead[]) => {
        const selectedLeads: number[] = [];
        array.forEach((i, index) => {
            if (i) {
                selectedLeads.push(allLeads ? allLeads[index]?.id : 0);
            }
        });
        setLeadIds(selectedLeads);
        dispatch(
            doUpdateLeadIds({
                arrayLeadId: selectedLeads,
            })
        );
        onSelect(selectedLeads);
    };

    const onSelectLeads = (index: number) => {
        const tempArr = [...isChecked];
        let count = 0;
        const leadId = defaultLead[index].id;
        tempArr[index] = !isChecked[index];
        setChecked(tempArr);

        const isHasUnChecked = tempArr.find((i) => !i);
        if (isHasUnChecked === false) {
            setCheckedAllPage(false);
        }
        tempArr.forEach((i) => {
            if (i) {
                count += 1;
            }
        });

        if (
            count === pagination.to - (pagination.from + 1) &&
            !isCheckedAllContacts
        ) {
            setCheckedAllPage(true);
        }

        if (isChecked[index]) {
            dispatch(
                doDeleteLeadIds({
                    id: leadId,
                })
            );
        } else {
            dispatch(
                doUpdateLeadIds({
                    arrayLeadId: [leadId],
                })
            );
        }
        afterSelectPage(tempArr);
    };

    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const containerRef = useClickOutside<HTMLUListElement>(onClose);

    const onSelectAllContacts = (data: boolean) => {
        let tempArrayContacts: boolean[] = [];
        if (data) {
            dispatch(
                doGetAllLeads({
                    select_all: true,
                    select: "id",
                    onSuccess: (allLeads: Lead[]) => {
                        const newAllLeads: Lead[] | null = allLeads;
                        setCheckedContact(newAllLeads.map(() => true));
                        tempArrayContacts = newAllLeads.map(() => true);
                        setCheckedAllContacts(true);
                        setCheckedAllPage(false);
                        setChecked(tempArrayContacts);
                        afterSelectContacts(tempArrayContacts, allLeads);
                    },
                })
            );
        } else {
            dispatch(doDeleteAllLeadIds());
            tempArrayContacts = isCheckedContact.map(() => false);
            setCheckedAllContacts(false);
            setChecked(tempArrayContacts);
            afterSelectContacts(tempArrayContacts);
        }
    };
    const onSelectAllPage = (data: boolean) => {
        let tempArrayPage: boolean[] = [];
        if (data) {
            if (isCheckedAllContacts) dispatch(doDeleteAllLeadIds());
            tempArrayPage = isChecked.map(() => true);
            dispatch(
                doGetCheckAllPage({
                    index: Number(pagination.currentPage),
                    checkPage: true,
                })
            );
            setCheckedAllContacts(false);
            setCheckedAllPage(true);
        } else {
            dispatch(
                doGetCheckAllPage({
                    index: Number(pagination.currentPage),
                    checkPage: false,
                })
            );
            tempArrayPage = isChecked.map(() => false);
            setCheckedAllPage(false);
        }
        setChecked(tempArrayPage);
        afterSelectPage(tempArrayPage);
    };

    const onSelectAllLeads = () => {
        onSelectAllPage(!isCheckedAllPage);
    };

    return (
        <>
            <StyledWrap className={className}>
                <StyledCard>
                    <StyledCardBody>
                        {loading ? (
                            <StyledLoadingWrap>
                                <Spinner color="primary" />
                            </StyledLoadingWrap>
                        ) : (
                            <>
                                <StyledTable hover>
                                    <thead>
                                        <tr>
                                            <StyledTdHeader>
                                                <ul
                                                    ref={containerRef}
                                                    style={{ display: "flex" }}
                                                >
                                                    <StyledCheckBox
                                                        id="allSelect"
                                                        name="allSelect"
                                                        className="allSelect"
                                                        onChange={
                                                            onSelectAllLeads
                                                        }
                                                        checked={
                                                            isCheckedAllPage
                                                        }
                                                    />
                                                    <ChevronDown
                                                        onClick={() =>
                                                            setOpen(!open)
                                                        }
                                                    />
                                                    {open && (
                                                        <HandleCheckBox
                                                            isCheckedAllPage={
                                                                isCheckedAllPage
                                                            }
                                                            onPageLead={
                                                                defaultLead
                                                            }
                                                            isCheckedAllContacts={
                                                                isCheckedAllContacts
                                                            }
                                                            onSelectAllContacts={
                                                                onSelectAllContacts
                                                            }
                                                            onSelectAllPage={
                                                                onSelectAllPage
                                                            }
                                                        />
                                                    )}
                                                </ul>
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                NAME
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                EMAIL
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                PHONE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                STAGE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                SOURCE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                CREATED AT
                                            </StyledTdHeader>
                                        </tr>
                                    </thead>
                                    {defaultLead.length > 0 ? (
                                        <tbody>
                                            {defaultLead?.map((lead, index) => {
                                                return (
                                                    <tr
                                                        key={lead.id}
                                                        className={classNames({
                                                            checkHover:
                                                                isChecked[
                                                                index
                                                                ],
                                                        })}
                                                        onClick={() =>
                                                            history.push(
                                                                `/leads/${lead.id}`
                                                            )
                                                        }
                                                    >
                                                        <StyledTd
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <StyledCheckBox
                                                                id={lead.id}
                                                                name={lead.id}
                                                                checked={
                                                                    isChecked[
                                                                    index
                                                                    ]
                                                                }
                                                                onChange={() =>
                                                                    onSelectLeads(
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </StyledTd>
                                                        <StyledTd className="maxWidth">
                                                            <p>
                                                                {
                                                                    lead.first_name
                                                                }{" "}
                                                                {lead.last_name}
                                                            </p>
                                                        </StyledTd>
                                                        <StyledTd className="maxWidth">
                                                            <p>{lead.email}</p>
                                                        </StyledTd>

                                                        <StyledTd>
                                                            <p>{lead.phone}</p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p>
                                                                <StyledBadge
                                                                    className={classNames(
                                                                        {
                                                                            new:
                                                                                lead.stage ===
                                                                                "new",
                                                                            estimated:
                                                                                lead.stage ===
                                                                                "estimated",
                                                                            manual_review:
                                                                                lead.stage ===
                                                                                "manual_review",
                                                                            qualified:
                                                                                lead.stage ===
                                                                                "qualified",
                                                                            scheduled:
                                                                                lead.stage ===
                                                                                "consult_request",
                                                                        }
                                                                    )}
                                                                >
                                                                    {lead.stage.toUpperCase()}
                                                                </StyledBadge>
                                                            </p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p>{lead.source}</p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p>
                                                                {moment(
                                                                    lead.created_at
                                                                ).format(
                                                                    "dddd, MMMM Do YYYY, h:mm:ss a"
                                                                )}
                                                            </p>
                                                        </StyledTd>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    ) : (
                                        <></>
                                    )}
                                </StyledTable>
                                {defaultLead.length > 0 ? (
                                    <Pagination
                                        pagination={pagination}
                                        onNext={onNextPage}
                                        onPrev={onPrevPage}
                                        onFirst={onFirstPage}
                                        onLast={onLastPage}
                                    />
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </StyledCardBody>
                </StyledCard>
                {defaultLead.length > 0 || loading ? (
                    <></>
                ) : (
                    <StyledNoResults>
                        <Image src={noResult} />
                        <h3 style={{ fontWeight: 500, color: "#1b2e4b" }}>
                            No results found
                        </h3>
                        <p style={{ margin: 0, color: "#7987a1" }}>
                            We could&#39;nt find what you&#39;re looking for
                        </p>
                        <p style={{ margin: 0, color: "#7987a1" }}>
                            Please try another way
                        </p>
                    </StyledNoResults>
                )}
            </StyledWrap>
        </>
    );
};

export default PersonalDetails;
