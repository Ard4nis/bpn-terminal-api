import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { APIGatewayEvent, Context } from "aws-lambda";
import { UpdateBPN } from "types";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const main = handler(
	async (event: APIGatewayEvent, context: Context) => {
		const data: UpdateBPN = JSON.parse(event.body);

		const expression = generateUpdateQuery(data);

		const params: DocumentClient.UpdateItemInput = {
			TableName: process.env.tableName,
			// 'Key' defines the partition key and sort key of the item to be updated
			Key: {
				userId: "123", // The id of the author
				bpnId: event.pathParameters.id, // The id of the note from the path
			},
			ReturnValues: "ALL_NEW",
			...expression,
		};

		console.log(params);

		await dynamoDb.update(params);

		return { status: true };
	}
);

export const generateUpdateQuery = (bpnToBeUpdated: UpdateBPN) => {
	const expression = {
		UpdateExpression: "set",
		ExpressionAttributeNames: {},
		ExpressionAttributeValues: {},
	};

	Object.entries(bpnToBeUpdated).forEach(([key, item]) => {
		expression.UpdateExpression += ` #${key} = :${key},`;
		expression.ExpressionAttributeNames[`#${key}`] = key;
		expression.ExpressionAttributeValues[`:${key}`] = item;
	});

	expression.UpdateExpression = expression.UpdateExpression.slice(0, -1);

	return expression;
};
