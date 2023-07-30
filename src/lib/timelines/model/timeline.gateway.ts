export type getUserTimelineResponse = { timeline: {
    user: string,
    messages: {
        author: string,
        text: string,
        publishedAt: string;
    }[]
}
}

export interface TimelineGateway {
    getUserTimeline({userId} : {userId:string}): Promise<getUserTimelineResponse>
}