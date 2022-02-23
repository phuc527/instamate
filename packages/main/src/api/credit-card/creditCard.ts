import { CreateCreditCardParams, CreditCard } from "src/types/api/creditCard";
import request from "src/utils/request";

export const retrievePaymentMethodApi = (): Promise<CreditCard>  => request.get<CreditCard, CreditCard>("/api/account/billing/card");

export const createCreditCardApi = (
    form: CreateCreditCardParams
): Promise<unknown> => request.put("/api/account/billing/card", form);

export const deletePaymentMethodApi = (): Promise<unknown> => request.delete("/api/account/billing/card");
