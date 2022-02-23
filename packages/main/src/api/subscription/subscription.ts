import { Subscription } from "src/types/api/subscription";
import request from "src/utils/request";

export const getSubscriptionApi = (
    id: number
): Promise<Subscription[]> => 
    request.get<Subscription[], Subscription[]>(`/api/subscriptions/${id}`);

export const cancelSubscriptionApi = (
    id: number,
    name: string,
): Promise<unknown> => 
    request.post(`/api/subscriptions/${id}/cancel`, { name });
