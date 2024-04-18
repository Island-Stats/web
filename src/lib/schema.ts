import type { RankName } from "./ranks";

export type Player = {
	uuid: string;
	username: string;
	ranks: RankName[];
	crownLevel: CrownLevel;
	collections?: Collection;
	social?: Social;
	status?: Status;
	statistics?: Statistics;
	lastUpdated: number;
};

// Crown Level Types

export type CrownLevel = {
	level: number;
	skill: {
		obtained: number;
		obtainable: number;
		bonus: number;
	}
	style: {
		obtained: number;
		obtainable: number;
		bonus: number;
	}
};

// Collection Types

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
	status?: {
		online: boolean;
	};
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

export type Statistics = {
	general: GeneralStatistics;
	battle_box: BattleBoxStatistics;
	sky_battle: SkyBattleStatistics;
	tgttos: TGTTOSStatistics;
	hitw: HoleInTheWallStatistics;
	pkw: ParkourWarriorStatistics;
	dynaball: DynaballStatistics;
	rsr: RocketSpleefRushStatistics;
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

// Game Statistics Types

export type GeneralStatistics = {
	total_faction_xp: number;
	game_faction_xp: number;
	quest_faction_xp: number;
	games_played: number;
	community_contribution: number;
};

export type BattleBoxStatistics = {
	games_played: number;
	rounds_won: number;
	team_first_place: number;
	team_second_place: number;
	team_third_place: number;
	team_fourth_place: number;
	solo_first_place: number;
	solo_top_three: number;
	solo_top_five: number;
	kills: number;
	deaths: number;
	melee_kills: number;
	ranged_kills: number;
	explosive_kills: number;
	blocks_placed: number;
	blocks_broken: number;
	total_score: number;
	badges: {
		blind_brawl: number;
		aerial_assault: number;
		stealthy_takedown: number;
		ace: number;
		ace_from_afar: number;
		ultimate_ace: number;
		leave_it_to_me: number;
		untouchable_assassin: number;
		flawless_battle: number;
		demolitions_expert: number;
		two_birds: number;
	};
};

export type SkyBattleStatistics = {
	quads: {
		games_played: number;
		survival_first_place: number;
		survival_top_three: number;
		survival_top_five: number;
		survival_top_eight: number;
		survival_top_fifty_percent: number;
		survival_top_ten: number;
		team_first_place: number;
		team_second_place: number;
		team_third_place: number;
		team_fourth_place: number;
		team_fifth_place: number;
		team_sixth_place: number;
		team_seventh_place: number;
		team_eighth_place: number;
		kills: number;
		melee_kills: number;
		ranged_kills: number;
		explosive_kills: number;
		chests_looted: number;
		golden_chests_looted: number;
		survived_minute: number;
		survived_two_minute: number;
		blocks_placed: number;
		blocks_broken: number;
		total_score: number;
		badges: {
			sky_lord: number;
			sky_sniper: number;
			fallen_warrior: number;
			team_crusher: number;
			wings_to_fly: number;
			creeper_coffin: number;
			untouchable_champion: number;
			personal_feast: number;
		};
	};
	summer: {
		games_played: number;
		survival_first_place: number;
		survival_top_three: number;
		survival_top_five: number;
		survival_top_eight: number;
		survival_top_fifty_percent: number;
		survival_top_ten: number;
		team_first_place: number;
		team_second_place: number;
		team_third_place: number;
		team_fourth_place: number;
		team_fifth_place: number;
		team_sixth_place: number;
		team_seventh_place: number;
		team_eighth_place: number;
		kills: number;
		melee_kills: number;
		ranged_kills: number;
		explosive_kills: number;
		chests_looted: number;
		golden_chests_looted: number;
		survived_minute: number;
		survived_two_minute: number;
		blocks_placed: number;
		blocks_broken: number;
		total_score: number;
		badges: {
			sky_lord: number;
			sky_sniper: number;
			fallen_warrior: number;
			team_crusher: number;
			wings_to_fly: number;
			creeper_coffin: number;
			untouchable_champion: number;
			personal_feast: 0;
		};
	};
};

export type TGTTOSStatistics = {
	games_played: number;
	first_place: number;
	top_three: number;
	top_five: number;
	top_eight: number;
	top_fifty_percent: number;
	round_first_place: number;
	round_top_three: number;
	round_top_five: number;
	round_top_eight: number;
	round_top_fifty_percent: number;
	chickens_punched: number;
	kills: number;
	deaths: number;
	blocks_placed: number;
	blocks_broken: number;
	total_score: number;
	badges: {
		triple_champion: number;
		ultimate_comeback: number;
		slapdown: number;
		pave_the_way: number;
		got_the_worm: number;
		victorious_pacifist: number;
		jackpot: number;
		untouchable_speedster: 2;
	};
};

export type HoleInTheWallStatistics = {
	games_played: number;
	first_place: number;
	top_three: number;
	top_five: number;
	top_eight: number;
	top_fifty_percent: number;
	walls_dodged: number;
	players_outlived: number;
	survived_minute: number;
	survived_two_minute: number;
	total_score: number;
	badges: {
		blaze_of_glory: number;
		bullet_time: number;
		monster_catcher: number;
		slimey_rivalry: number;
		fish_catcher: number;
		hot_potato_survivor: 2;
	};
};

export type DynaballStatistics = {
	games_played: number;
	wins: number;
	players_eliminated: number;
	players_stuck: number;
	blocks_destroyed: number;
	blocks_placed: number;
	spawners_destroyed: number;
	survived_minute: number;
	survived_two_minute: number;
	survived_three_minute: number;
	survived_four_minute: number;
	badges: {
		fast_triple_kill: number;
		powder_bomb_crate: number;
		repair_200: number;
		only_survivor: number;
		only_survivor_against_3: number;
		eliminate_5: number;
		airstrike_eliminate_2: 2;
	};
};

export type ParkourWarriorStatistics = {
	dojo: {
		medals_banked: number;
		total_medals_banked: number;
		unique_rot_standard_cmpl: number;
		unique_rot_advanced_cmpl: number;
		unique_rot_expert_cmpl: number;
		unique_standard_cmpl: number;
		unique_advanced_cmpl: number;
		unique_expert_cmpl: number;
		total_expert_cmpls: number;
		total_advanced_cmpls: number;
		total_standard_cmpls: 528;
	};
	survivor: {
		games_played: number;
		players_eliminated: number;
		final_duel_wins: number;
		leap_2_completion: number;
		leap_3_completion: number;
		leap_4_completion: number;
		leap_5_completion: number;
		leap_6_completion: number;
		leap_7_completion: number;
		obstacles_completed: 1946;
	};
};

export type RocketSpleefRushStatistics = {
	games_played: number;
	rockets_fired: number;
	kills: number;
	deaths: number;
	team_kills: number;
	direct_hits: number;
	first_place: number;
	top_three: number;
	top_five: number;
	top_eight: number;
	survived_minute: number;
	players_outlived: number;
	badges: {
		melee_kills: number;
		fast_triple_kill: number;
		fast_punch: number;
		win_above_half_durability: number;
		win_without_updraft: number;
		eliminate_5_players: number;
		survive_60s_without_gliding: number;
		distant_direct: number;
	};
};

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
		image: "parkour_warrior/icon.png"
	},
	DYNABALL: {
		name: "Dynaball",
		image: "dynaball/icon.png"
	},
	ROCKET_SPLEEF: {
		name: "Rocket Spleef Rush",
		image: "rocket_spleef/icon.png"
	
	}
} as const satisfies {
	[k: string]: {
		name: string;
		image: string;
	};
};

export type GameName = keyof typeof Games;

// Leaderboard Types

export type Leaderboard = LeaderboardPlayer[];

export type LeaderboardPlayer = {
	uuid: string;
	username: string;
	ranks: RankName[];
	value: number;
	placement: number;
};
