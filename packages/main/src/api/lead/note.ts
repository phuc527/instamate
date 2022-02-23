import { CommonPagination } from "src/types/api/common";
import request from "src/utils/request";
import {Note} from "../../types/api/ticket";

export const getLeadNotesApi = (
    id: number,
    page = 1
): Promise<CommonPagination<Note>> =>
    request.get<CommonPagination<Note>, CommonPagination<Note>>(`api/notes`, {
        params: {
            page,
            noteable_id: id,
            noteable_type: `App\\Models\\Lead`,
        },
    });

export const storeLeadNoteApi = (
    id: number,
    ticket_id: number,
    form: {
        note: string;
    }
): Promise<Note> =>
    request.post<Note, Note>(`api/notes`, {
        ...form,
        ticket_id,
        noteable_id: id,
        noteable_type: `App\\Models\\Lead`,
    });

export const updateLeadNoteApi = (
    id: number,
    form: {
        note: string;
    }
): Promise<Note> =>
    request.put<Note, Note>(`api/notes/${id}`, {
        id,
        ...form,
    });

