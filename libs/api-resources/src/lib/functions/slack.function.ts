import { HttpMethods, SlackAuth, SlackPayload } from "@scalex-api/sdk";
import { callApi } from "./api-factory.function";

export async function logToSlack( text: string, auth: SlackAuth, ts?: string ) {
	return callApi<SlackPayload, unknown>( {
		serviceUri: "https://slack.com",
		endpoint: {
			path: "/api/chat.postMessage",
			fullPath: "/api/chat.postMessage",
			method: HttpMethods.Post,
		},
		headers: {
			authorization: `Bearer ${auth.authToken}`,
		},
		body: {
			thread_ts: ts,
			channel: auth.channel,
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text,
					},
				},
			],
		},
	} );
}
