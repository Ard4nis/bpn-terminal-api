import { APIGatewayEvent, Context } from "aws-lambda";
import Stripe from "stripe";
import handler from "libs/handler-lib";
import { calculateCost } from "./libs/support-libs";

export const main = handler(
	async (event: APIGatewayEvent, context: Context) => {
		const { amount, source } = JSON.parse(event.body);
		const description = "Support for BPN Terminal";
		const amountInCents = calculateCost(amount);

		const stripe = new Stripe(process.env.stripeSecretKey, {
			apiVersion: "2020-08-27",
		});

		await stripe.charges.create({
			source,
			amount: amountInCents,
			description,
			currency: "eur",
		});

		return { status: true };
	}
);
