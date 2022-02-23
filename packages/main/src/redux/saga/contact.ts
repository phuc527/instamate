import {
    getLeadsApi,
    deleteLeadsApi,
    getAllLeadsApi,
    getLeadApiBySelectAndGroupBy,
    getDetailLeadsApi,
    updateLeadApi,
    deleteContactsApi,
} from "src/api/lead/lead";
import { toastError } from "src/utils/toast";
import { all, call, put, select, takeLatest } from "typed-redux-saga";
import {
    doDeleteLeads,
    doDeleteLeadsSuccess,
    doGetAllLeads,
    doGetLeads,
    doGetLeadsSuccess,
    doGetSourceLeads,
    doGetSourceLeadsSuccess,
    doGetLead,
    doGetLeadSuccess,
    doGetLeadFail,
    doUpdateLead,
    doUpdateLeadSuccess,
    doUpdateLeadFail,
    doGetAllLeadsSuccess,
    doDeleteContacts,
    doGetStageLeads,
    doGetStageLeadsSuccess,
} from "../slices/contacts/lead";
import {
    doGetLocationsFilter,
    doGetSearchInput,
    doGetStageFilter,
    doGetProcedureFilter,
    doGetProviderFilter,
    doGetCreatedFromFilter,
    doGetCreatedToFilter,
    doGetSourceFilter,
} from "../slices/contacts/search-filter";
import { RootState } from "../store";

function* getLeadsSaga(action: ReturnType<typeof doGetLeads>) {
    try {
        const response = yield* call(
            getLeadsApi,
            action.payload
                ? {
                      ...(action.payload.limit && {
                          limit: action.payload.limit,
                      }),
                      ...(action.payload.page && { page: action.payload.page }),
                      ...(action.payload.keyword && {
                          keyword: action.payload.keyword,
                      }),
                      ...(action.payload.stage && {
                          stage: action.payload.stage,
                      }),
                      ...(action.payload.staff_id && {
                          staff_id: action.payload.staff_id,
                      }),
                      ...(action.payload.procedure_id && {
                          procedure_id: action.payload.procedure_id,
                      }),
                      ...(action.payload.location_id && {
                          location_id: action.payload.location_id,
                      }),
                      ...(action.payload.created_from && {
                          created_from: action.payload.created_from,
                      }),
                      ...(action.payload.created_to && {
                          created_to: action.payload.created_to,
                      }),
                      ...(action.payload.source && {
                          source: action.payload.source,
                      }),
                  }
                : null
        );

        yield* put(
            doGetLeadsSuccess({
                leads: response.data,
                pagination: {
                    total: response.total,
                    currentPage: response.current_page,
                    limit: Number(response.per_page),
                    from: response.from,
                    to: response.to,
                },
            })
        );

        yield* put(
            doGetSearchInput(
                action.payload.keyword
                    ? { inputValue: action.payload.keyword }
                    : { inputValue: "" }
            )
        );
        yield* put(
            doGetLocationsFilter(
                action.payload.location_id
                    ? { idLocation: action.payload.location_id }
                    : { idLocation: 0 }
            )
        );
        yield* put(
            doGetStageFilter(
                action.payload.stage
                    ? { stage: action.payload.stage }
                    : { stage: "" }
            )
        );
        yield* put(
            doGetProcedureFilter(
                action.payload.procedure_id
                    ? { idProcedure: action.payload.procedure_id }
                    : { idProcedure: 0 }
            )
        );
        yield* put(
            doGetProviderFilter(
                action.payload.staff_id
                    ? { idStaff: action.payload.staff_id }
                    : { idStaff: 0 }
            )
        );
        yield* put(
            doGetCreatedFromFilter(
                action.payload.created_from
                    ? { created_from: action.payload.created_from }
                    : { created_from: 0 }
            )
        );
        yield* put(
            doGetCreatedToFilter(
                action.payload.created_to
                    ? { created_to: action.payload.created_to }
                    : { created_to: 0 }
            )
        );
        yield* put(
            doGetSourceFilter(
                action.payload.source
                    ? { source: action.payload.source }
                    : { source: "" }
            )
        );
    } catch (error) {
        toastError(error);
    }
}

function* getAllLeadsSaga(action: ReturnType<typeof doGetAllLeads>) {
    try {
        const response = yield* call(getAllLeadsApi, action.payload);
        const getData = JSON.parse(JSON.stringify(response));
        yield* call(action.payload.onSuccess, getData.data);
        yield* put(doGetAllLeadsSuccess());
    } catch (error) {
        toastError(error);
    }
}

function* getSourceLeadsSaga(action: ReturnType<typeof doGetSourceLeads>) {
    try {
        const response = yield* call(
            getLeadApiBySelectAndGroupBy,
            action.payload
                ? {
                      ...(action.payload.source && {
                          source: action.payload.source,
                      }),
                      group_by: "source",
                      select: "source",
                  }
                : null
        );
        const getData = JSON.parse(JSON.stringify(response));
        yield* put(doGetSourceLeadsSuccess({ allSource: getData.data }));
    } catch (error) {
        toastError(error);
    }
}

function* getStageLeadsSaga(action: ReturnType<typeof doGetStageLeads>) {
    try {
        const response = yield* call(
            getLeadApiBySelectAndGroupBy,
            action.payload
                ? {
                      ...(action.payload.stage && {
                          stage: action.payload.stage,
                      }),
                      group_by: "stage",
                      select: "stage",
                  }
                : null
        );
        const getData = JSON.parse(JSON.stringify(response));
        yield* put(doGetStageLeadsSuccess({ allStage: getData.data }));
    } catch (error) {
        toastError(error);
    }
}

function* deleteLeadsSaga(action: ReturnType<typeof doDeleteLeads>) {
    try {
        const { inputValue, idStaff, idProcedure, idLocation, stage } =
            yield* select((store: RootState) => ({
                inputValue: store.contact.search_filter.inputValue,
                stage: store.contact.search_filter.stage,
                idLocation: store.contact.search_filter.idLocation,
                idProcedure: store.contact.search_filter.idProcedure,
                idStaff: store.contact.search_filter.idStaff,
            }));
        yield* call(deleteLeadsApi, action.payload.id);

        const response = yield* call(getLeadsApi, {
            ...(inputValue && { keyword: inputValue }),
            ...(stage && { stage }),
            ...(idStaff && { staff_id: idStaff }),
            ...(idProcedure && { procedure_id: idProcedure }),
            ...(idLocation && { location_id: idLocation }),
        });

        yield* put(
            doGetLeadsSuccess({
                leads: response.data,
                pagination: {
                    total: response.total,
                    currentPage: response.current_page,
                    limit: Number(response.per_page),
                    from: response.from,
                    to: response.to,
                },
            })
        );

        yield* put(doDeleteLeadsSuccess(action.payload.id));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        toastError(err);
    }
}

function* deleteContactsSaga(action: ReturnType<typeof doDeleteContacts>) {
    try {
        const { inputValue, idStaff, idProcedure, idLocation, stage } =
            yield* select((store: RootState) => ({
                inputValue: store.contact.search_filter.inputValue,
                stage: store.contact.search_filter.stage,
                idLocation: store.contact.search_filter.idLocation,
                idProcedure: store.contact.search_filter.idProcedure,
                idStaff: store.contact.search_filter.idStaff,
            }));
        yield* call(deleteContactsApi, { ids: action.payload.ids });

        const response = yield* call(getLeadsApi, {
            ...(inputValue && { keyword: inputValue }),
            ...(stage && { stage }),
            ...(idStaff && { staff_id: idStaff }),
            ...(idProcedure && { procedure_id: idProcedure }),
            ...(idLocation && { location_id: idLocation }),
        });

        yield* put(
            doGetLeadsSuccess({
                leads: response.data,
                pagination: {
                    total: response.total,
                    currentPage: response.current_page,
                    limit: Number(response.per_page),
                    from: response.from,
                    to: response.to,
                },
            })
        );

        yield* call(action.payload.onSuccess);
    } catch (err) {
        toastError(err);
    }
}

function* getLeadSaga(action: ReturnType<typeof doGetLead>) {
    try {
        const response = yield* call(getDetailLeadsApi, action.payload);

        yield* put(doGetLeadSuccess(response));
    } catch (err) {
        yield* put(doGetLeadFail());
    }
}

function* updateLeadSaga(action: ReturnType<typeof doUpdateLead>) {
    const { id, form, onFail, onSuccess } = action.payload;
    try {
        const response = yield* call(updateLeadApi, id, form);
        yield* put(doUpdateLeadSuccess(response));

        if (onSuccess) {
            yield* call(onSuccess);
        }
    } catch (err) {
        yield* put(doUpdateLeadFail());

        const error = JSON.parse(JSON.stringify(err));
        if (onFail) {
            yield* call(onFail, error?.error?.message);
        }
    }
}

export function* contactSaga(): Generator {
    yield all([
        takeLatest(doGetLeads, getLeadsSaga),
        takeLatest(doGetSourceLeads, getSourceLeadsSaga),
        takeLatest(doGetStageLeads, getStageLeadsSaga),
        takeLatest(doDeleteLeads, deleteLeadsSaga),
        takeLatest(doDeleteContacts, deleteContactsSaga),
        takeLatest(doGetAllLeads, getAllLeadsSaga),
        takeLatest(doGetLead, getLeadSaga),
        takeLatest(doUpdateLead, updateLeadSaga),
    ]);
}
