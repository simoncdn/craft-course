import { TimelineGateway, getUserTimelineResponse } from "../model/timeline.gateway";

export class FakeTimelineGateway implements TimelineGateway {
   timelinesByUser = new Map<string, {
        user: string,
        messages: {
            author: string,
            text: string,
            publishedAt: string;
        }[];
    }>();

    getUserTimeline({ userId }: { userId: string; }): Promise<getUserTimelineResponse> {
        const timeline = this.timelinesByUser.get(userId);

        if (!timeline) return Promise.reject();

        return Promise.resolve({
            timeline,
        });
    }
}

export const timelineGateway = new FakeTimelineGateway();