import { AxiosResponse } from "axios";
import { CommonPagination } from "src/types/api/common";
import { GetNotification, INotification } from "src/types/api/notifications";
import request from "src/utils/request";

export const getNotificationsApi = (): Promise<CommonPagination<GetNotification>> => 
    request.get<CommonPagination<GetNotification>, CommonPagination<GetNotification>>(
        "/api/account/notifications"
    ); 

export const updateNotificationApi = (notificationId: number, form: INotification | null): Promise<AxiosResponse> => 
    request.put(
        `/api/account/notifications/${notificationId}`, form
    ); 