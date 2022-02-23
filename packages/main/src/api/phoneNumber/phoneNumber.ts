import { PhoneNumber } from "src/types/api/app";
import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";

type GetPhoneNumberRequestParams = {
    phone?: string;
};
export const getPhoneNumbersApi = (
    params?: GetPhoneNumberRequestParams
): Promise<CommonPagination<PhoneNumber>> => {
    return request.get<
        CommonPagination<PhoneNumber>,
        CommonPagination<PhoneNumber>
    >("/api/phoneNumbers", { params });
};
