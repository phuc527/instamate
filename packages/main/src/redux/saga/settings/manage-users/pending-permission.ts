import { deleteInviteApi, getInvitesApi, getResendInvitesApi } from "src/api/manage-users/pending-permission";
import { doDeleteInvite, doDeleteInviteFail, doDeleteInviteSuccess, doGetInvites, doGetInvitesFail, doGetInvitesSuccess, doResendInvite, doResendInviteFail, doResendInviteSuccess } from "src/redux/slices/settings/manage-users/pending-permission";
import { toastSuccess } from "src/utils/toast";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* getInvitesSaga(action: ReturnType<typeof doGetInvites>){
    try {
        const response = yield* call(getInvitesApi, action.payload ? {
            ...(action.payload.limit && {limit: action.payload.limit}),
            ...(action.payload.page && {page: action.payload.page}),
            ...(action.payload.name && {name: action.payload.name })
        } : null);
        yield* put(doGetInvitesSuccess({
            invites: response.data,
            pagination: {
                total: response.total,
                currentPage: response.current_page,
                limit: Number(response.per_page),
                from: response.from,
                to: response.to
            },
        }))
    }
    catch (error){
        yield* put(doGetInvitesFail(error));
    }
}

function* getResendInvitesSaga(action: ReturnType<typeof doResendInvite>){
    try {
        yield* call(getResendInvitesApi, action.payload.invite_id);
        if(action.payload.onSuccess){
            yield* put(doResendInviteSuccess(
               action.payload.onSuccess ? {successMessage :action.payload.onSuccess} : {successMessage : ''}
            ))}
            toastSuccess("the invitation has been resent successfully");
        }
    catch (error){
        yield* put(doResendInviteFail(error));
    }
}

function* deleteInviteSaga(action: ReturnType<typeof doDeleteInvite>){
    try {
        yield* call(deleteInviteApi, action.payload.invite_id);
        const response = yield* call(getInvitesApi, action.payload ? {
            ...(action.payload.filter_invitation && {name: action.payload.filter_invitation}),
        } : null);

        yield* put(doDeleteInviteSuccess(
            action.payload.onSuccess ? {
                successMessage :action.payload.onSuccess,
                invites: response.data,
                pagination: {
                    total: response.total,
                    currentPage: response.current_page,
                    limit: Number(response.per_page),
                    from: response.from,
                    to: response.to
                },
         } : {
             successMessage : '',
             invites: response.data,
             pagination: {
                total: response.total,
                currentPage: response.current_page,
                limit: Number(response.per_page),
                from: response.from,
                to: response.to
            },
         }
         ))
         toastSuccess('Invitations have been removed successfully')
    }
    catch (error){
        yield* put(doDeleteInviteFail(error));
    }
}

export function* pendingPermissionSaga(): Generator {
    yield all([
        takeLatest(doGetInvites, getInvitesSaga),
        takeLatest(doResendInvite, getResendInvitesSaga),
        takeLatest(doDeleteInvite, deleteInviteSaga),
    ])
}
