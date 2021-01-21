import handler from "../../libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { APIGatewayEvent, Context } from "aws-lambda";

export const main = handler(
	async (event: APIGatewayEvent, context: Context) => {
		const params = {
			TableName: process.env.tableName,
			// 'Key' defines the partition key and sort key of the item to be retrieved
			Key: {
				userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
				bpnId: event.pathParameters.id, // The id of the note from the path
			},
		};

		const result = await dynamoDb.get(params);
		if (!result.Item) {
			throw new Error("Item not found.");
		}

		// Return the retrieved item
		return result.Item;
	}
);
