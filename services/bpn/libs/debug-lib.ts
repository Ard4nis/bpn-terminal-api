import { format } from "util";
import { config } from "aws-sdk";
import { APIGatewayEvent, Context } from "aws-lambda";

let logs;

config.logger = { log: debug };

export default function debug(event) {
	logs.push({ date: new Date(), type: "API Event", event });
}

export function init(event: APIGatewayEvent, context: Context) {
    logs = [];

    debug({
        body: event.body,
        pathParameters: event.pathParameters,
        queryStringParameters: event.queryStringParameters
    });
}

export function flush(e) {
    logs.forEach(({date, string}) => console.debug(date,string))
    console.error(e);
}
