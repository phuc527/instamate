import { getStaffsApi, createStaffsApi, deleteStaffsApi, updateStaffApi, updatePhotoStaffApi } from "src/api/manage-users/active-staffs";
import { doGetStaffs, doGetStaffsFail, doGetStaffsSuccess, doCreateInviteStaffs, doCreateInviteStaffsFail, doCreateInviteStaffsSuccess, doDeleteStaffs, doDeleteStaffsFail, doDeleteStaffsSuccess, doUpdateStaff, doUpdateStaffSuccess, doUpdateStaffFail } from "src/redux/slices/settings/manage-users/active-staffs";
import { toastError, toastSuccess } from "src/utils/toast";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* getStaffsSaga(action: ReturnType<typeof doGetStaffs>){
    try {
        
        const response = yield* call(getStaffsApi, action.payload ? {
            ...(action.payload.limit && {limit: action.payload.limit}),
            ...(action.payload.page && {page: action.payload.page}),
            ...(action.payload.keyword && {keyword: action.payload.keyword}),
            ...(action.payload.id && {id: action.payload.id }),
        } : null);
        yield* put(doGetStaffsSuccess({
            staffs: response.data,
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
        yield* put(doGetStaffsFail(error));
    }
}

function* createNewStaffSaga(action: ReturnType<typeof doCreateInviteStaffs>){
    try {
        yield* call(createStaffsApi, action.payload.data);
    if(action.payload.onSuccess){
        yield* put(doCreateInviteStaffsSuccess(
           action.payload.onSuccess ? {successMessage :action.payload.onSuccess} : {successMessage : ''}
        ))}
        toastSuccess('the invitation has been sent.')
    }
    catch (error){
        const Error = JSON.parse(JSON.stringify(error))
        yield* put(doCreateInviteStaffsFail(Error));
        toastError('The email has already been taken.')
    }
}

function* deleteStaffsSaga(action: ReturnType<typeof doDeleteStaffs>){
    try {
        yield* call(deleteStaffsApi, Number(action.payload.staff_id));
        const response = yield* call(getStaffsApi, action.payload ? { 
            ...(action.payload.search_staff && {keyword: action.payload.search_staff}),
            ...(action.payload.filter_location && {id: action.payload.filter_location }),
    } : null);
        yield* put(doDeleteStaffsSuccess(
            action.payload.onSuccess ? {
                successMessage :action.payload.onSuccess,
                staffs: response.data,
                pagination: {
                    total: response.total,
                    currentPage: response.current_page,
                    limit: Number(response.per_page),
                    from: response.from,
                    to: response.to
                },
         } : {
             successMessage : '',
             staffs: response.data,
             pagination: {
                total: response.total,
                currentPage: response.current_page,
                limit: Number(response.per_page),
                from: response.from,
                to: response.to
            },
         }
         ))
         toastSuccess('Staffs have been removed successfully')
    }
    catch (error){
        const Error = JSON.parse(JSON.stringify(error))
        yield* put(doDeleteStaffsFail(Error));
    }
}

function* updateStaffSaga(action: ReturnType<typeof doUpdateStaff>) {
    try {
        let response;
        if (action.payload.form.profile_photo) {
             response = yield* call(updatePhotoStaffApi, action.payload.id, action.payload.form.profile_photo);
        } else {
             response = yield* call(updateStaffApi, action.payload.id, action.payload.form);
        }
       
        yield* put(doUpdateStaffSuccess(response));
        
        yield* call(action.payload.onSuccess);
    
    } catch (err) {
       
        yield* put(doUpdateStaffFail());

        const errors = JSON.parse(JSON.stringify(err))
        
        yield* call(action.payload.onFail, errors?.data?.message);
    }
}

export function* activeStaffsSaga(): Generator {
    yield all([
        takeLatest(doGetStaffs, getStaffsSaga),
        takeLatest(doCreateInviteStaffs, createNewStaffSaga),
        takeLatest(doDeleteStaffs, deleteStaffsSaga),
        takeLatest(doUpdateStaff, updateStaffSaga),
    ])
}
