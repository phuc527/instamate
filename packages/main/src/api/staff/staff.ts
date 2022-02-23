import { Staff } from "src/types/api/staff";
import request from "src/utils/request";
import { CommonPagination } from "../../types/api/common";

export const getStaffsApi = (
    params: { name: string } | null = null
): Promise<CommonPagination<Staff>> =>
    request.get<CommonPagination<Staff>, CommonPagination<Staff>>(
        "/api/staff",
        {
            params,
        }
    );
