export function calculateCost(tier: number): number {
	const rate = (tier === 1 ? 5 : (tier === 2 ? 10 : 20));

	return rate * 100;
}
