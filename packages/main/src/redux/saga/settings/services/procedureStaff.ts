import {
    attachProcedureStaffApi,
    detachProcedureStaffApi,
    getProcedureStaffApi,
} from "src/api/procedure-staff/procedureStaff";
import {
    doAttachProcedureStaff,
    doAttachProcedureStaffFail,
    doAttachProcedureStaffSuccess,
    doDetachProcedureStaff,
    doDetachProcedureStaffFail,
    doDetachProcedureStaffSuccess,
    doGetProcedureStaff,
    doGetProcedureStaffFail,
    doGetProcedureStaffSuccess,
    doUpdateProcedureStaff,
    doUpdateProcedureStaffFail,
    doUpdateProcedureStaffSuccess,
} from "src/redux/slices/settings/services/procedureStaff";
import { RootState } from "src/redux/store";
import { takeLatest, call, all, put, select } from "typed-redux-saga";

function* getProcedureStaffSaga(
    action: ReturnType<typeof doGetProcedureStaff>
) {
    try {
        const response = yield* call(getProcedureStaffApi, {
            procedure_id: action.payload,
        });

        yield* put(doGetProcedureStaffSuccess(response.data));
    } catch (err) {
        yield* put(doGetProcedureStaffFail());
    }
}
function* attachProcedureStaffSaga(
    action: ReturnType<typeof doAttachProcedureStaff>
) {
    try {
        const { procedureId, staffId, form } = action.payload;

        yield* call(attachProcedureStaffApi, {
            procedureId,
            staffId,
            form,
        });

        const response = yield* call(getProcedureStaffApi, {
            procedure_id: action.payload.procedureId,
        });

        yield* put(doGetProcedureStaffSuccess(response.data));

        yield* put(doAttachProcedureStaffSuccess());

        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (err) {
        const errors = JSON.parse(JSON.stringify(err));

        if (action.payload.onFail) {
            yield* call(
                action.payload.onFail,
                errors?.data?.errors || "Pricing staff updated fail"
            );
        }

        yield* put(doAttachProcedureStaffFail());
    }
}

function* detachProcedureStaffSaga(
    action: ReturnType<typeof doDetachProcedureStaff>
) {
    try {
        const { procedureId, staffId } = action.payload;

        yield* call(detachProcedureStaffApi, {
            procedureId,
            staffId,
        });

        const response = yield* call(getProcedureStaffApi, {
            procedure_id: action.payload.procedureId,
        });

        yield* put(doGetProcedureStaffSuccess(response.data));

        yield* put(doDetachProcedureStaffSuccess());

        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }
    } catch (err) {
        const errors = JSON.parse(JSON.stringify(err));

        if (action.payload.onFail) {
            yield* call(
                action.payload.onFail,
                errors?.data?.errors || "Pricing staff deleted fail"
            );
        }

        yield* put(doDetachProcedureStaffFail());
    }
}

function* updateProcedureStaffSaga(
    action: ReturnType<typeof doUpdateProcedureStaff>
) {
    const { procedureId, procedureStaffs, addonStaffs, onSuccess, onFail } =
        action.payload;

    try {
        const existProcedureStaffs = yield* select(
            (store: RootState) =>
                store.setting.services.procedureStaff.procedureStaffs
        );
        const disableStaffs = procedureStaffs?.filter((i) => !i.enable);
        const enableStaffs = procedureStaffs?.filter((i) => i.enable);

        for (let index = 0; index < disableStaffs.length; index += 1) {
            const price = disableStaffs[index];

            if (
                existProcedureStaffs
                    ?.map((i) => i.staff_id)
                    .includes(price.staffId)
            ) {
                yield* call(detachProcedureStaffApi, {
                    procedureId,
                    staffId: price.staffId,
                });
            }
        }

        for (let index = 0; index < enableStaffs.length; index += 1) {
            const price = enableStaffs[index];

            if (
                existProcedureStaffs
                    ?.map((i) => i.staff_id)
                    .includes(price.staffId)
            ) {
                yield* call(detachProcedureStaffApi, {
                    procedureId,
                    staffId: price.staffId,
                });
            }

            const addonsBelongToStaff = addonStaffs.filter(
                (i) => i.staffId === price.staffId
            );

            yield* call(attachProcedureStaffApi, {
                procedureId,
                staffId: price.staffId,
                form: {
                    max_cost: price.maxPrice || 0,
                    min_cost: price.minPrice || 0,
                    pricing_type: price.priceType,
                    discount: price.discount || 0,
                    duration: price.duration || 0,
                    ...(addonsBelongToStaff?.length && {
                        procedure_addons: addonsBelongToStaff?.map((i) => ({
                            min_cost: i.minPrice,
                            max_cost: i.maxPrice || 0,
                            pricing_type: i.type,
                            discount: i.discount,
                            duration: i.duration,
                            id: i.addonId,
                        })),
                    }),
                },
            });
        }

        yield* call(onSuccess);
        yield* put(doUpdateProcedureStaffSuccess());
    } catch (err) {
        yield* put(doUpdateProcedureStaffFail());

        const errors = JSON.parse(JSON.stringify(err));
        yield* call(
            onFail,
            errors?.data?.errors ||
                "There was an issue when update procedure pricing by staff"
        );
    }
}

export function* procedureStaffSaga(): Generator {
    yield all([
        takeLatest(doGetProcedureStaff, getProcedureStaffSaga),
        takeLatest(doAttachProcedureStaff, attachProcedureStaffSaga),
        takeLatest(doDetachProcedureStaff, detachProcedureStaffSaga),
        takeLatest(doUpdateProcedureStaff, updateProcedureStaffSaga),
    ]);
}
