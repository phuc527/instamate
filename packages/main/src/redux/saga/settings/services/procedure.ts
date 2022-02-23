import {
    createProcedureAddonApi,
    createProcedureApi,
    deleteProcedureAddonApi,
    deleteProcedureApi,
    getProcedureApi,
    getProceduresApi,
    updateProcedureAddonApi,
    updateProcedureApi,
} from "src/api/procedure/procedure";
import {
    doCreateProcedure,
    doCreateProcedureAddon,
    doCreateProcedureAddonFail,
    doCreateProcedureAddonSuccess,
    doCreateProcedureFail,
    doCreateProcedureSuccess,
    doDeleteProcedure,
    doDeleteProcedureAddon,
    doDeleteProcedureAddonFail,
    doDeleteProcedureAddonSuccess,
    doDeleteProcedureFail,
    doDeleteProcedureSuccess,
    doGetProcedures,
    doGetProceduresFail,
    doGetProceduresSuccess,
    doUpdateProcedure,
    doUpdateProcedureAddon,
    doUpdateProcedureAddonFail,
    doUpdateProcedureAddons,
    doUpdateProcedureAddonsFail,
    doUpdateProcedureAddonsSuccess,
    doUpdateProcedureAddonSuccess,
    doUpdateProcedureFail,
    doUpdateProceduresOrder,
    doUpdateProceduresOrderFail,
    doUpdateProceduresOrderSuccess,
    doUpdateProcedureSuccess,
    doUpdateProcedureStaffDetail,
    doGetProcedure,
    doGetProcedureSuccess,
    doGetProcedureFail,
} from "src/redux/slices/settings/services/procedure";
import { Procedure, ProcedureAddon } from "src/types/api/authentication";
import { all, call, put, takeLatest, takeEvery } from "typed-redux-saga";

function* getProceduresSaga(action: ReturnType<typeof doGetProcedures>) {
    try {
        const response = yield* call(getProceduresApi, action.payload);

        yield* put(doGetProceduresSuccess(response));
    } catch (err) {
        yield* put(doGetProceduresFail());
    }
}

function* getProcedureSaga(action: ReturnType<typeof doGetProcedure>) {
    try {
        const response = yield* call(getProcedureApi, action.payload);

        yield* put(doGetProcedureSuccess(response));
    } catch (err) {
        yield* put(doGetProcedureFail());
    }
}

function* createProcedureSaga(action: ReturnType<typeof doCreateProcedure>) {
    try {
        const response = yield* call(createProcedureApi, action.payload);

        yield* put(doCreateProcedureSuccess(response));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doCreateProcedureFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            action.payload.onFail,
            errors?.data?.errors || "There was an issue when creating procedure"
        );
    }
}

function* updateProcedureStaffDetailSaga(
    action: ReturnType<typeof doUpdateProcedureStaffDetail>
) {
    try {
        yield* call(updateProcedureApi, action.payload.id, action.payload.form);

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doUpdateProcedureFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            action.payload.onFail,
            errors?.data?.errors || "There was an issue when updating procedure"
        );
    }
}

function* updateProcedureSaga(action: ReturnType<typeof doUpdateProcedure>) {
    try {
        const response = yield* call(
            updateProcedureApi,
            action.payload.id,
            action.payload.form
        );

        yield* put(doUpdateProcedureSuccess(response));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doUpdateProcedureFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            action.payload.onFail,
            errors?.data?.errors || "There was an issue when updating procedure"
        );
    }
}

function* deleteProcedureSaga(action: ReturnType<typeof doDeleteProcedure>) {
    try {
        yield* call(deleteProcedureApi, action.payload.id);

        yield* put(doDeleteProcedureSuccess(action.payload.id));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doDeleteProcedureFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            action.payload.onFail,
            errors?.data?.errors || "There was an issue when deleting procedure"
        );
    }
}

function* updateProcedureAddonSaga(
    action: ReturnType<typeof doUpdateProcedureAddon>
) {
    try {
        const response = yield* call(
            updateProcedureAddonApi,
            action.payload.id,
            action.payload.form
        );

        yield* put(doUpdateProcedureAddonSuccess(response));

        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (err) {
        yield* put(doUpdateProcedureAddonFail());

        const errors = JSON.parse(JSON.stringify(err));

        if (action.payload.onFail) {
            yield* call(
                action.payload.onFail,
                errors?.data?.errors ||
                    "There was an issue when updating procedure addon"
            );
        }
    }
}

function* createProcedureAddonSaga(
    action: ReturnType<typeof doCreateProcedureAddon>
) {
    try {
        const response = yield* call(
            createProcedureAddonApi,
            action.payload.form
        );

        yield* put(doCreateProcedureAddonSuccess(response));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doCreateProcedureAddonFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            action.payload.onFail,
            errors?.data?.errors || "There was an issue when creating the addon"
        );
    }
}

function* updateProcedureOrderSaga(
    action: ReturnType<typeof doUpdateProceduresOrder>
) {
    try {
        const newProcedures: Procedure[] = [];

        const { form } = action.payload;

        for (let i = 0; i < form.length; i += 1) {
            const response = yield* call(updateProcedureApi, form[i].id, {
                order: form[i].order,
            });

            newProcedures.push(response);
        }

        yield* put(doUpdateProceduresOrderSuccess());

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doUpdateProceduresOrderFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            action.payload.onFail,
            errors?.data?.errors ||
                "There was an issue when updating procedure order"
        );
    }
}

function* deleteProcedureAddonSaga(
    action: ReturnType<typeof doDeleteProcedureAddon>
) {
    try {
        yield* call(deleteProcedureAddonApi, action.payload.id);

        yield* put(doDeleteProcedureAddonSuccess(action.payload.id));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        yield* put(doDeleteProcedureAddonFail());
        const errors = JSON.parse(JSON.stringify(err));

        yield* call(
            action.payload.onFail,
            errors?.data?.errors ||
                "There was an issue when deleting procedure addon"
        );
    }
}

function* updateProcedureAddonsSaga(
    action: ReturnType<typeof doUpdateProcedureAddons>
) {
    const { form, onFail, onSuccess } = action.payload;
    try {
        let newAddons: ProcedureAddon[] = [];
        for (let i = 0; i < form.length; i += 1) {
            const oldAddon = form[i];
            const response = yield* call(
                updateProcedureAddonApi,
                oldAddon.id,
                oldAddon.data
            );

            newAddons = [...newAddons, response];
        }

        yield* put(doUpdateProcedureAddonsSuccess(newAddons));

        if (onSuccess) {
            yield* call(onSuccess);
        }
    } catch (err) {
        yield* put(doUpdateProcedureAddonsFail());

        const errors = JSON.parse(JSON.stringify(err));
        if (onFail) {
            yield* call(
                onFail,
                errors?.data?.errors ||
                    "There was an issue when updating procedure addon"
            );
        }
    }
}

export function* procedureSaga(): Generator {
    yield all([
        takeLatest(doGetProcedures, getProceduresSaga),
        takeLatest(doGetProcedure, getProcedureSaga),
        takeLatest(doUpdateProcedure, updateProcedureSaga),
        takeLatest(
            doUpdateProcedureStaffDetail,
            updateProcedureStaffDetailSaga
        ),
        takeLatest(doCreateProcedure, createProcedureSaga),
        takeEvery(doDeleteProcedure, deleteProcedureSaga),
        takeEvery(doUpdateProcedureAddon, updateProcedureAddonSaga),
        takeLatest(doCreateProcedureAddon, createProcedureAddonSaga),
        takeLatest(doUpdateProceduresOrder, updateProcedureOrderSaga),
        takeLatest(doDeleteProcedureAddon, deleteProcedureAddonSaga),
        takeLatest(doUpdateProcedureAddons, updateProcedureAddonsSaga),
    ]);
}
