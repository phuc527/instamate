import { CommonPagination } from "src/types/api/common";
import { Invoice } from "src/types/api/invoice";
import request from "src/utils/request";

export const getInvoicesApi = (
    params: { limit?: number, page?: number } | null = null
): Promise<CommonPagination<Invoice>> => 
    request.get<CommonPagination<Invoice>, CommonPagination<Invoice>>(
        "/api/account/billing/invoices", { params }  
    ); 
