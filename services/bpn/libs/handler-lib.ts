import { APIGatewayEvent, Context } from "aws-lambda";
import { Lambda } from "aws-sdk";
import * as debug from "./debug-lib";

export default function handler(lambda) {
	return async function (event: APIGatewayEvent, context: Context) {
		let body, statusCode: number;

		debug.init(event, context);

		try {
			body = await lambda(event, context);
			statusCode = 200;
		} catch (e) {
			debug.flush(e);
			body = { error: e };
			statusCode = 500;
		}

		return {
			statusCode,
			body: JSON.stringify(body),
		};
	};
}
