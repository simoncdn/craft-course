import { createSlice } from "@reduxjs/toolkit";
import { getAuthUserTimeline } from "../usescases/get-auth-user-timeline.usecase";

type TimelinesState = {
    user: string,
    messages: {
        author: string,
        text: string,
        publishedAt: string;
    }[]
}

export const timelinesSlice = createSlice({
    name: "timelines",
    initialState: {} as TimelinesState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAuthUserTimeline.fulfilled, (state, action) => {
           return action.payload;
        }
    )
    },
});