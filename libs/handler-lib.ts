import { APIGatewayEvent, Context } from "aws-lambda";
import { Lambda } from "aws-sdk";

export default function handler(lambda) {
	return async function (event: APIGatewayEvent, context: Context) {
		let body, statusCode: number;

		try {
			body = await lambda(event, context);
			statusCode = 200;
		} catch (e) {
			console.log(e);
			body = { error: e.message };
			statusCode = 500;
		}

		return {
			statusCode,
			body,
		};
	};
}
