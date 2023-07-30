import { createAppAsyncThunk } from "@/lib/create-app-thunk";

export const getAuthUserTimeline = createAppAsyncThunk("timelines/getAuthUserTimeline", async (_, {
    extra: { timelineGateway, authGateway }
} ) => {
    const authUser = authGateway.getUserAuth();
    const { timeline } = await timelineGateway.getUserTimeline({userId: authUser});
    return timeline;
});