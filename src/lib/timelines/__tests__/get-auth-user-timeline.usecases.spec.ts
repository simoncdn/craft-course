import { createStore } from "@/lib/create-store";
import { describe, it, expect } from "vitest";
import { getAuthUserTimeline } from "../usescases/get-auth-user-timeline.usecase";
import { FakeTimelineGateway } from "../infra/fake-timeline.gateway";
import { FakeAuthGateway } from "@/lib/auth/infra/fake-auth.gateway";

describe("Feature: Retrieving authenticated user's timeline", () => {
    it("Example: Alice is authenticated and can see her timeline", async () => {
        //arrange (given)
        givenAuthenticatedUserIs("Alice");
        givenExistingTimeline({
            user: "Alice",
            messages: [
                {
                    text: "Hello it's Bob",
                    author: "Bob",
                    publishedAt: "2020-01-01T12:06:00Z"
                },
                {
                    text: "Hello it's Alice",
                    author: "Alice",
                    publishedAt: "2020-01-01T12:05:00Z"
                }
            ]
        })
        //act (when)
        await whenRetrievingAuthenticatedUserTimeline();
        //assert (then)
        thenTheReceivedTimelineShouldbe({
            user: "Alice",
            messages: [
                {
                    text: "Hello it's Bob",
                    author: "Bob",
                    publishedAt:"2020-01-01T12:06:00Z"
                },
                {
                    text: "Hello it's Alice",
                    author: "Alice",
                    publishedAt: "2020-01-01T12:05:00Z"
                }
            ]
        })
    });
    }
);

const authGateway = new FakeAuthGateway();
const timelineGateway = new FakeTimelineGateway();
const store = createStore({
    authGateway,
    timelineGateway,
});



function givenAuthenticatedUserIs(user: string) {
    authGateway.authUser = user;
};

function givenExistingTimeline(timeline: {
    user: "Alice",
    messages: {
        text: string,
        author: string,
        publishedAt: string;
    }[]
}) {
    timelineGateway.timelinesByUser.set("Alice", timeline);
};

async function whenRetrievingAuthenticatedUserTimeline() {
    await store.dispatch(getAuthUserTimeline());
};

function thenTheReceivedTimelineShouldbe(expectedTimeline: {
    user: string,
    messages: {
        author: string,
        text: string,
        publishedAt: string;
    }[]
}) {
    const authUserTimeline = store.getState();
    expect(authUserTimeline).toEqual(expectedTimeline);
};