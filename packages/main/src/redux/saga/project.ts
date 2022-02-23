import { updateProjectApi, updateProjectPhotoApi } from "src/api/project/project";
import { all, call, put, takeLatest } from "typed-redux-saga";
import { doUpdateProject, doUpdateProjectFail, doUpdateProjectSuccess } from "../slices/project";
import { doSetSmsBalance } from "../slices/settings/billing/sms";

function* updateProjectSaga(action: ReturnType<typeof doUpdateProject>){
    try {
        let response = yield* call(updateProjectApi, action.payload.id, action.payload.form);

        if (action.payload.formFile) {
            response = yield* call(updateProjectPhotoApi, action.payload.id, action.payload.formFile);
        }
        
        yield* put(doUpdateProjectSuccess(response));

        if (action.payload.onSuccess) {
            yield* call(action.payload.onSuccess);
        }

        yield* put(
            doSetSmsBalance({
                smsBalance: response.sms_balance,
                autoRecharge: response.auto_recharge,
                rechargeBalanceTo: response.auto_recharge_balance_to_in_cents,
                whenBalanceFallsBelow: response.auto_recharge_when_balance_falls_below_in_cents,
            })
        )
    }
    catch (error){
        const err = JSON.parse(JSON.stringify(error));

        yield* put(doUpdateProjectFail({
            ...(err?.data?.errors?.website && {website: err.data.errors.website[0]}),
            ...(err?.data?.errors?.name && {name: err.data.errors.name[0]}),
        }));
    }
}

export function* projectSaga(): Generator {
    yield all([
        takeLatest(doUpdateProject, updateProjectSaga),
    ])
}
