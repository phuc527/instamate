import { Checkbox, Spinner } from "@doar/components";
import { debounce } from "lodash-es";
import { FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Menu } from "react-feather";
import { toastError, toastSuccess } from "src/utils/toast";
import { createPortal } from "react-dom";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DraggingStyle,
    NotDraggingStyle,
    DraggableProvided,
    DraggableStateSnapshot,
} from "react-beautiful-dnd";
/* Helpers */
import { formatMetric } from "src/helpers/stringHelpers";
import { classic } from "@doar/shared/styled/colors";
import { convertToHour } from "src/helpers/settings/services";
/* Redux */
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Procedure } from "src/types/api/authentication";
/* Components */
import {
    doGetProcedures,
    doUpdateProceduresOrder,
} from "src/redux/slices/settings/services/procedure";
import { useHistory } from "react-router-dom";
import SearchForm from "./search-form";
import SurgicalFilter from "./surgical-filter";
/* Styles */
import {
    StyledBadge,
    StyledCard,
    StyledCardBody,
    StyledCardHeader,
    StyledLoading,
    StyledNoProcedure,
    StyledTable,
    StyledTd,
    StyledTdHeader,
} from "./style";
import Pagination from "../../pagination";

const useDraggableInPortal = () => {
    const element = useRef<HTMLDivElement>(
        document.createElement("div")
    ).current;

    useEffect(() => {
        if (element) {
            element.style.pointerEvents = "none";
            element.style.position = "absolute";
            element.style.height = "100%";
            element.style.width = "100%";
            element.style.top = "0";

            document.body.appendChild(element);

            return () => {
                document.body.removeChild(element);
            };
        }
        return () => {};
    }, [element]);

    return (
            render: (
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot
            ) => ReactElement
        ) =>
        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
            const result = render(provided, snapshot);
            const style = provided.draggableProps.style as DraggingStyle;
            if (style.position === "fixed") {
                return createPortal(result, element);
            }
            return result;
        };
};

interface IPropsTable {
    categoryId?: number;
    onSelectProcedures: (array: number[]) => void;
}
const ProcedureTable: FC<IPropsTable> = ({
    categoryId,
    onSelectProcedures,
}) => {
    const history = useHistory();
    const renderDraggable = useDraggableInPortal();
    const dispatch = useAppDispatch();
    const { procedures, pagination, loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [isChecked, setChecked] = useState<boolean[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [isCheckedAll, setCheckedAll] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredProcedures, setFilteredProcedures] = useState<
        Procedure[] | null
    >([]);
    const [isSurgical, setSurgical] = useState<boolean | null>(null);
    const [baseOrder, setBaseOrder] = useState<number[]>([]);
    const [tableWidth, setTableWidth] = useState(0);

    /* Used to set width of table when dragging */
    const cardRef = useRef<HTMLTableDataCellElement | null>(null);

    useEffect(() => {
        dispatch(
            doGetProcedures({
                ...(categoryId && { category_id: categoryId }),
                page: 1,
                limit: 10,
            })
        );
    }, [categoryId, dispatch]);

    useEffect(() => {
        setTableWidth(cardRef?.current ? cardRef.current.offsetWidth : 0);
    }, [cardRef]);

    useEffect(() => {
        if (procedures) {
            let newProcedures: Procedure[] | null = procedures;
            if (isSurgical !== null) {
                newProcedures =
                    procedures?.filter((i) => i.surgical === isSurgical) || [];
            }
            setChecked(newProcedures.map(() => false));
            setFilteredProcedures(newProcedures);
            setBaseOrder(newProcedures.map((i) => i.order || 0));
            setCategoryName(
                procedures[0]?.service_categories.find(
                    (i) => i.id === categoryId
                )?.name || ""
            );
        }
    }, [categoryId, isSurgical, procedures]);

    const afterSelect = (array: boolean[]) => {
        const selectedProcedures: number[] = [];
        array.forEach((i, index) => {
            if (i) {
                selectedProcedures.push(
                    filteredProcedures ? filteredProcedures[index]?.id : 0
                );
            }
        });
        onSelectProcedures(selectedProcedures);
    };

    const onSelectProcedure = (index: number) => {
        const tempArr = [...isChecked];
        tempArr[index] = !isChecked[index];
        setChecked(tempArr);

        const isHasUnChecked = tempArr.find((i) => !i);
        if (isHasUnChecked === false) {
            setCheckedAll(false);
        }
        afterSelect(tempArr);
    };

    const onSelectAllProcedures = () => {
        let tempArray: boolean[] = [];
        if (isCheckedAll) {
            tempArray = isChecked.map(() => false);
            setCheckedAll(false);
        } else {
            tempArray = isChecked.map(() => true);
            setCheckedAll(true);
        }
        setChecked(tempArray);
        afterSelect(tempArray);
    };
    const onFilterSurgical = (filter: string[]) => {
        if (filter.length === 1) {
            let newProcedures: Procedure[] | null = [];
            if (filter.includes("sur")) {
                newProcedures =
                    filteredProcedures?.filter((i) => i.surgical) || [];
                setSurgical(true);
            } else {
                newProcedures =
                    filteredProcedures?.filter((i) => !i.surgical) || [];
                setSurgical(false);
            }
            setFilteredProcedures(newProcedures);
            setChecked(newProcedures.map(() => false));
        } else {
            setFilteredProcedures(procedures);
            setSurgical(null);
        }
    };

    const handleSearch = useMemo(
        () =>
            debounce(
                (name: string) =>
                    dispatch(
                        doGetProcedures({
                            category_id: categoryId,
                            limit: pagination.limit,
                            ...(name && { name }),
                        })
                    ),
                500
            ),
        [categoryId, dispatch, pagination.limit]
    );

    const onSearch = (name: string) => {
        handleSearch(name);
        setSearchValue(name);
    };

    const reorder = (
        list: Procedure[] | null,
        startIndex: number,
        endIndex: number
    ) => {
        let result: Procedure[] | null = null;

        if (list) {
            result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
        }

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            filteredProcedures,
            result.source.index,
            result.destination.index
        );

        if (items) {
            setFilteredProcedures(items);
            dispatch(
                doUpdateProceduresOrder({
                    form: items.map((i, index) => ({
                        id: i.id,
                        order: baseOrder[index],
                    })),
                    onSuccess: () => toastSuccess("Updated successfully!"),
                    onFail: (err) => toastError(err),
                })
            );
        }
    };

    const getItemStyle = (
        isDragging: boolean,
        draggableStyle: DraggingStyle | NotDraggingStyle | undefined
    ) => ({
        // change background colour if dragging
        background: isDragging ? classic.gray100 : "#fff",
        // styles we need to apply on draggable
        ...draggableStyle,
    });

    return (
        <div ref={cardRef}>
            <StyledCard>
                <StyledCardHeader>
                    <SearchForm
                        value={searchValue}
                        onSearch={onSearch}
                        placeholder="Search for service name"
                    />
                    <SurgicalFilter
                        category={categoryName}
                        onFilter={onFilterSurgical}
                    />
                </StyledCardHeader>
                <StyledCardBody>
                    {loading ? (
                        <StyledLoading>
                            <Spinner color="primary" />
                        </StyledLoading>
                    ) : (
                        <StyledTable>
                            <thead>
                                <tr>
                                    <StyledTdHeader className="dragIcon" />
                                    <StyledTdHeader className="checkBox">
                                        <Checkbox
                                            label=""
                                            id={`${categoryName}-select-all-procedures`}
                                            name={`${categoryName}-select-all-procedures`}
                                            onChange={onSelectAllProcedures}
                                            checked={isCheckedAll}
                                        />
                                    </StyledTdHeader>
                                    <StyledTdHeader className="serviceName">
                                        SERVICES NAME
                                    </StyledTdHeader>
                                    <StyledTdHeader>
                                        MIN/MAX PRICE
                                    </StyledTdHeader>
                                    <StyledTdHeader>DURATION</StyledTdHeader>
                                    <StyledTdHeader className="surgical">
                                        SURGICAL
                                    </StyledTdHeader>
                                </tr>
                            </thead>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <tbody
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {filteredProcedures?.map(
                                                (procedure, index) => {
                                                    const duration =
                                                        procedure.duration || 0;
                                                    return (
                                                        <Draggable
                                                            key={procedure.id}
                                                            draggableId={String(
                                                                procedure.id
                                                            )}
                                                            index={index}
                                                        >
                                                            {renderDraggable(
                                                                (
                                                                    draggableProvided,
                                                                    snapshot
                                                                ) => (
                                                                    <tr
                                                                        ref={
                                                                            draggableProvided.innerRef
                                                                        }
                                                                        {...draggableProvided.draggableProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            draggableProvided
                                                                                .draggableProps
                                                                                .style
                                                                        )}
                                                                        key={
                                                                            procedure.id
                                                                        }
                                                                        onClick={() =>
                                                                            history.push(
                                                                                `/settings/services/${procedure.id}`
                                                                            )
                                                                        }
                                                                    >
                                                                        <StyledTd
                                                                            {...draggableProvided.dragHandleProps}
                                                                            $width={
                                                                                (tableWidth *
                                                                                    5) /
                                                                                100
                                                                            }
                                                                            className="dragIcon"
                                                                        >
                                                                            <Menu
                                                                                color={
                                                                                    classic.gray500
                                                                                }
                                                                            />
                                                                        </StyledTd>
                                                                        <StyledTd
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                            className="checkBox"
                                                                            $width={
                                                                                (tableWidth *
                                                                                    5) /
                                                                                100
                                                                            }
                                                                        >
                                                                            <Checkbox
                                                                                label=""
                                                                                id={`procedure-${String(
                                                                                    categoryName
                                                                                )}-${String(
                                                                                    index
                                                                                )}`}
                                                                                name={`procedure-${String(
                                                                                    categoryName
                                                                                )}-${String(
                                                                                    index
                                                                                )}`}
                                                                                checked={
                                                                                    isChecked[
                                                                                        index
                                                                                    ]
                                                                                }
                                                                                onChange={() =>
                                                                                    onSelectProcedure(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            />
                                                                        </StyledTd>
                                                                        <StyledTd
                                                                            className="serviceName"
                                                                            $width={
                                                                                (tableWidth *
                                                                                    30) /
                                                                                100
                                                                            }
                                                                        >
                                                                            {
                                                                                procedure.name
                                                                            }
                                                                        </StyledTd>
                                                                        <StyledTd
                                                                            className="price"
                                                                            $width={
                                                                                (tableWidth *
                                                                                    20) /
                                                                                100
                                                                            }
                                                                        >
                                                                            $
                                                                            {formatMetric(
                                                                                procedure.min_cost
                                                                            )}
                                                                            -$
                                                                            {formatMetric(
                                                                                procedure.min_cost
                                                                            )}
                                                                        </StyledTd>
                                                                        <StyledTd
                                                                            className="duration"
                                                                            $width={
                                                                                (tableWidth *
                                                                                    20) /
                                                                                100
                                                                            }
                                                                        >
                                                                            {convertToHour(
                                                                                duration
                                                                            )}
                                                                        </StyledTd>
                                                                        <StyledTd
                                                                            className="surgical"
                                                                            $width={
                                                                                (tableWidth *
                                                                                    10) /
                                                                                100
                                                                            }
                                                                        >
                                                                            {procedure.surgical ? (
                                                                                <StyledBadge className="surgicalBadge">
                                                                                    YES
                                                                                </StyledBadge>
                                                                            ) : (
                                                                                <StyledBadge className="nonSurgicalBadge">
                                                                                    NO
                                                                                </StyledBadge>
                                                                            )}
                                                                        </StyledTd>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </Draggable>
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </StyledTable>
                    )}
                    {!loading &&
                    filteredProcedures &&
                    filteredProcedures?.length <= 0 ? (
                        <StyledNoProcedure>
                            No procedures found
                        </StyledNoProcedure>
                    ) : (
                        ""
                    )}
                    {filteredProcedures && filteredProcedures?.length > 0 ? (
                        <Pagination
                            pagination={pagination}
                            onNext={() =>
                                dispatch(
                                    doGetProcedures({
                                        category_id: categoryId,
                                        limit: pagination.limit,
                                        page:
                                            Number(pagination.currentPage) + 1,
                                        ...(searchValue && {
                                            name: searchValue,
                                        }),
                                    })
                                )
                            }
                            onPrev={() =>
                                dispatch(
                                    doGetProcedures({
                                        category_id: categoryId,
                                        limit: pagination.limit,
                                        page:
                                            Number(pagination.currentPage) - 1,
                                        ...(searchValue && {
                                            name: searchValue,
                                        }),
                                    })
                                )
                            }
                        />
                    ) : (
                        ""
                    )}
                </StyledCardBody>
            </StyledCard>
        </div>
    );
};

export default ProcedureTable;
