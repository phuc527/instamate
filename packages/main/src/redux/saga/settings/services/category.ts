import { createServiceCategoryApi } from "src/api/procedure/category";
import {
    doCreateCategory,
    doCreateCategoryFail,
    doCreateCategorySuccess,
} from "src/redux/slices/settings/services/procedure";
import { all, call, put, takeLatest } from "typed-redux-saga";

function* createCategorySaga(action: ReturnType<typeof doCreateCategory>) {
    try {
        const response = yield* call(
            createServiceCategoryApi,
            action.payload.form
        );

        yield* put(doCreateCategorySuccess(response));

        yield* call(action.payload.onSuccess);
    } catch (err) {
        const errors = JSON.parse(JSON.stringify(err));

        yield* call(
            action.payload.onFail,
            errors?.data?.errors || "Service category created fail"
        );

        yield* put(doCreateCategoryFail());
    }
}

export function* categorySaga(): Generator {
    yield* all([takeLatest(doCreateCategory, createCategorySaga)]);
}
