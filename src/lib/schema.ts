import type { RankName } from "./ranks";

export type Player = {
	uuid: string;
	username: string;
	ranks: RankName[];
	collections?: Collection;
	social?: Social;
	status?: Status;
	statistics?: Statistics;
	lastUpdated: number;
};

type Collection = {
	currency: Currency;
};

// Social Types

type Social = {
	friends: SocialPlayer[];
	party: Party;
};

export type SocialPlayer = {
	uuid: string;
	username: string;
	ranks: RankName[];
};

export type Party = {
	active: boolean;
	leader: SocialPlayer;
	members: SocialPlayer[];
};

// Status Types

type Status = {
	firstJoin: Date;
	lastJoin: Date;
	online: boolean;
	server: Server;
};

// Statistics Types

type Statistics = {
	value: {
		statistic: {
			key: string
			forLeaderboard: boolean;
		}
		value: number;
	};
};

// Currency Types

export type Currency = {
	coins: number;
	gems: number;
	silver: number;
	materialDust: number;
	royalReputation: number;
};

// Server Types

type Server = {
	category: ServerCategory;
	subType: string;
	associatedGame: GameName;
};

type ServerCategory = "LOBBY" | "GAME" | "LIMBO" | "QUEUE";

// Game Types

export const Games = {
	HOLE_IN_THE_WALL: {
		name: "Hole in the Wall",
		image: "hitw/icon.png"
	},
	TGTTOS: {
		name: "TGTTOS",
		image: "tgttos/icon.png"
	},
	BATTLE_BOX: {
		name: "Battle Box",
		image: "battle_box/icon.png"
	},
	SKY_BATTLE: {
		name: "Sky Battle",
		image: "sky_battle/icon.png"
	},
	PARKOUR_WARRIOR: {
		name: "Parkour Warrior",
		image: "pkw/icon.png"
	},
	DYNABALL: {
		name: "Dynaball",
		image: "dynaball/icon.png"
	}
} as const satisfies {
	[k: string]: {
		name: string;
		image: string;
	};
};

export type GameName = keyof typeof Games;
