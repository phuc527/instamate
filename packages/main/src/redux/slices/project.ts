import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormUpdateProject } from "src/api/project/project";
import { Project } from "src/types/api/authentication";

interface ProjectState {
    project: Project | null;
    loading: boolean;
    error: {
        name?: string;
        website?: string;
    }
}

const initialState: ProjectState = {
    project: null,
    loading: false,
    error: {
        name: "",
        website: "",
    }
}

const projectSLices = createSlice({
    name: "project",
    initialState,
    reducers: {
        doUpdateProject(
            state,
            action: PayloadAction<{
                id: number,
                form: FormUpdateProject,
                formFile?: FormData,
                onSuccess?: () => void,
            }>
        ) {
            state.loading = true;
            state.error = {
                name: "",
                website: ""
            }
        },
        doUpdateProjectSuccess(
            state,
            action: PayloadAction<Project>
        ) {
            state.loading = false;
            state.project = action.payload;
        },
        doUpdateProjectFail(
            state,
            action: PayloadAction<{
                name?: string;
                website?: string;
            }>
        ) {
            state.loading = false;
            state.error = {
                ...(action.payload.name && { name: action.payload.name}),
                ...(action.payload.website && { website: action.payload.website})
            }
        },
        doSetProject(
            state,
            action: PayloadAction<Project>
        ) {
            state.project = action.payload;
        },
    }
})

export const {
    doSetProject,
    doUpdateProject,
    doUpdateProjectFail,
    doUpdateProjectSuccess,
} = projectSLices.actions;

export default projectSLices.reducer;
