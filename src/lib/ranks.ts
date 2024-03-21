export const Ranks = {
	NOXCREW: {
		name: "Noxcrew",
		image: "noxcrew.png",
		hierarchy: 0,
	},
	MODERATOR: {
		name: "Moderator",
		image: "moderator.png",
		hierarchy: 1,
	},
	CONTESTANT: {
		name: "Contestant",
		image: "contestant.png",
		hierarchy: 2,
	},
	CREATOR: {
		name: "Creator",
		image: "creator.png",
		hierarchy: 3,
	},
	GRAND_CHAMP_ROYALE: {
		name: "Grand Champ Royale",
		image: "grand_champ_royale.png",
		hierarchy: 4,
	},
	GRAND_CHAMP: {
		name: "Grand Champ",
		image: "grand_champ.png",
		hierarchy: 5,
	},
	CHAMP: {
		name: "Champ",
		image: "champ.png",
		hierarchy: 6,
	},
	DEFAULT: {
		name: "Player",
		image: "default.png",
		hierarchy: 7,
	},
} as const satisfies {
	[k: string]: {
		name: string;
		image: string;
		hierarchy: number;
	};
};

export type RankName = keyof typeof Ranks;


export function getHighestRank(ranks: RankName[]) {
	return ranks.reduce((highest, rank) => {
		if (Ranks[rank].hierarchy < Ranks[highest].hierarchy) {
			return rank;
		}
		return highest;
	}, "DEFAULT");
}