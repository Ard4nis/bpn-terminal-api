export type BPNId = string;
export type GMId = string;

export type MutableBPN = CreateBPN | UpdateBPN;

export interface BPN {
	id: BPNId;
	gameMaster: GMId;
	colourCode: ColourCodeEnum;
	department: string;
	trainingPackage: string;
	details: string;
	scl: number;
	sclIncrease: number;
	coverage: StationCoverageEnum;
	reward: number;
	rewardType: RewardTypeEnum;
	attachment: string;
}

export type CreateBPN = Omit<BPN, "id">;
export type UpdateBPN = Partial<BPN>;

export enum ColourCodeEnum {
	BLUE = "BLUE",
	WHITE = "WHITE",
	YELLOW = "YELLOW",
	GREEN = "GREEN",
	RED = "RED",
	GREY = "GREY",
	JADE = "JADE",
	ORANGE = "ORANGE",
	BLACK = "BLACK",
	SILVER = "SILVER",
	PLATINUM = "PLATINUM",
}

export enum StationCoverageEnum {
	STATION_ANALYSIS = "STATION_ANALYSIS",
	THIRD_EYE_NEWS = "THIRD_EYE_NEWS",
	NONE = "NONE",
}

export enum RewardTypeEnum {
	PER_OP = "PER_OP",
	PER_SQUAD = "PER_SQUAD",
}
