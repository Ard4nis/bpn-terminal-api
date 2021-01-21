import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { APIGatewayEvent, Context } from "aws-lambda";
import { UpdateBPN } from "types";

export const main = handler(
	async (event: APIGatewayEvent, context: Context) => {
		const data: UpdateBPN = JSON.parse(event.body);
		const params = {
			TableName: process.env.tableName,
			// 'Key' defines the partition key and sort key of the item to be updated
			Key: {
				userId: "123", // The id of the author
				bpnId: event.pathParameters.id, // The id of the note from the path
			},
			// 'UpdateExpression' defines the attributes to be updated
			// 'ExpressionAttributeValues' defines the value in the update expression
			UpdateExpression: `SET details = :details, attachment = :attachment`,
			ExpressionAttributeValues: {
				":details": data.details,
				":attachment": data.attachment,
			},
			// 'ReturnValues' specifies if and how to return the item's attributes,
			// where ALL_NEW returns all attributes of the item after the update; you
			// can inspect 'result' below to see how it works with different settings
			ReturnValues: "ALL_NEW",
		};

		await dynamoDb.update(params);

		return { status: true };
	}
);
