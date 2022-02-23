import { Spinner } from "@doar/components";
import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useState } from "react";
import { toastError, toastSuccess } from "src/utils/toast";
/* Helpers */
import { formatMetric } from "src/helpers/stringHelpers";
import { convertToHour } from "src/helpers/settings/services";
/* Redux */
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Procedure } from "src/types/api/authentication";
/* Components */
import {
    doGetProcedures,
    doUpdateProcedureStaffDetail,
} from "src/redux/slices/settings/services/procedure";
import SearchForm from "../search-form";
/* Styles */
import {
    StyledCard,
    StyledCardBody,
    StyledCardHeader,
    StyledLoading,
    StyledNoProcedure,
    StyledTable,
    StyledTd,
    StyledTdHeader,
} from "../style";
import Pagination from "../../../pagination";
import Switch from "../../../manage-users/staff-details/staff-info/switch-button";

interface IPropsTable {
    idStaff?: number | null;
}
const UserProcedureTable: FC<IPropsTable> = ({ idStaff }) => {
    const dispatch = useAppDispatch();
    const { pagination, loading, procedures } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [isConsult, setConsult] = useState<boolean[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredProcedures, setFilteredProcedures] = useState<
        Procedure[] | null
    >([]);

    useEffect(() => {
        if (idStaff) {
            dispatch(
                doGetProcedures({
                    page: 1,
                    limit: 10,
                    staff_id: idStaff,
                })
            );
        }
    }, [dispatch, idStaff]);

    useEffect(() => {
        if (procedures) {
            const newProcedures: Procedure[] | null = procedures;
            setFilteredProcedures(newProcedures);
        }
    }, [procedures]);

    useEffect(() => {
        if (procedures) {
            setConsult(
                procedures.map((i) => {
                    if (i.consult) return true;
                    return false;
                })
            );
        }
    }, [procedures]);

    const handleSearch = useMemo(
        () =>
            debounce(
                (name: string) =>
                    dispatch(
                        doGetProcedures({
                            limit: pagination.limit,
                            ...(name && { name }),
                            ...(idStaff && { staff_id: idStaff }),
                        })
                    ),
                500
            ),
        [dispatch, pagination.limit, idStaff]
    );

    const onSearch = (name: string) => {
        handleSearch(name);
        setSearchValue(name);
    };

    const onChangeConsult = async (
        state: boolean,
        id: number,
        index: number
    ) => {
        const tempArr = [...isConsult];
        tempArr[index] = !isConsult[index];
        setConsult(tempArr);
        await dispatch(
            doUpdateProcedureStaffDetail({
                id,
                form: {
                    consult: state,
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                },
                onFail: (error) => toastError(error),
            })
        );
    };

    return (
        <StyledCard>
            <StyledCardHeader>
                <SearchForm value={searchValue} onSearch={onSearch} placeholder='Search for service name' />
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
                                <StyledTdHeader className="checkConsult" />
                                <StyledTdHeader className="serviceName">
                                    SERVICES NAME
                                </StyledTdHeader>
                                <StyledTdHeader>MIN/MAX PRICE</StyledTdHeader>
                                <StyledTdHeader>DURATION</StyledTdHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProcedures?.map((procedure, index) => {
                                const duration = procedure.duration || 0;
                                return (
                                    <tr key={procedure.id}>
                                        <StyledTd className="checkConsult">
                                            <Switch
                                                state={
                                                    isConsult[index]
                                                        ? "on"
                                                        : "off"
                                                }
                                                onSwitch={(state) =>
                                                    onChangeConsult(
                                                        state,
                                                        procedure.id,
                                                        index
                                                    )
                                                }
                                                width={60}
                                                height={30}
                                            />
                                        </StyledTd>
                                        <StyledTd className="serviceName">
                                            {procedure.name}
                                        </StyledTd>
                                        <StyledTd className="price">
                                            ${formatMetric(procedure.min_cost)}
                                            -${formatMetric(procedure.min_cost)}
                                        </StyledTd>
                                        <StyledTd className="duration">
                                            {convertToHour(duration)}
                                        </StyledTd>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </StyledTable>
                )}
                {!loading &&
                filteredProcedures &&
                filteredProcedures?.length <= 0 ? (
                    <StyledNoProcedure>No Procedures Found</StyledNoProcedure>
                ) : (
                    ""
                )}
                {filteredProcedures && filteredProcedures?.length > 0 ? (
                    <Pagination
                        pagination={pagination}
                        onNext={() =>
                            dispatch(
                                doGetProcedures({
                                    limit: pagination.limit,
                                    page: Number(pagination.currentPage) + 1,
                                    ...(searchValue && { name: searchValue }),
                                    ...(idStaff && { staff_id: idStaff }),
                                })
                            )
                        }
                        onPrev={() =>
                            dispatch(
                                doGetProcedures({
                                    limit: pagination.limit,
                                    page: Number(pagination.currentPage) - 1,
                                    ...(searchValue && { name: searchValue }),
                                    ...(idStaff && { staff_id: idStaff }),
                                })
                            )
                        }
                    />
                ) : (
                    ""
                )}
            </StyledCardBody>
        </StyledCard>
    );
};

export default UserProcedureTable;
