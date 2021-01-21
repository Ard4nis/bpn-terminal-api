import * as uuid from "uuid";
import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { CreateBPN } from "types";
import { APIGatewayEvent, Context } from "aws-lambda";

export const main = handler(
	async (event: APIGatewayEvent, context: Context) => {
		const data: CreateBPN = JSON.parse(event.body);

		const params = {
			TableName: process.env.tableName,
			Item: {
				userId: data.gameMaster,
				bpnId: uuid.v4(),
				colourCode: data.colourCode,
				department: data.department,
				trainingPackage: data.trainingPackage,
				details: data.details,
				scl: data.scl,
				sclIncrease: data.sclIncrease,
				coverage: data.coverage,
				reward: data.reward,
				rewardType: data.rewardType,
				attachment: data.attachment,
			},
		};

		await dynamoDb.put(params);

		return params.Item;
	}
);
