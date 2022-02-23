import { ServiceCategory } from "src/types/api/authentication";
import request from "src/utils/request";

export const createServiceCategoryApi = (
    form: FormData
): Promise<ServiceCategory> => 
    request.post<ServiceCategory, ServiceCategory>("/api/categories", form);
