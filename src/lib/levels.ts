export const crownLevels = [
	{ range: [0, 9], level: 400, icon: "1", color: "#b2b2d1", colorDark: "#71719a" },
	{ range: [10, 19], level: 600, icon: "2", color: "#04db42", colorDark: "#02b61b" },
	{ range: [20, 29], level: 800, icon: "3", color: "#269dff", colorDark: "#0054d2" },
	{ range: [30, 39], level: 1000, icon: "4", color: "#c039ff", colorDark: "#862eec" },
	{ range: [40, 49], level: 1200, icon: "5", color: "#ff8f00", colorDark: "#ff5400" },
	{ range: [50, 59], level: 1500, icon: "6", color: "#ff6439", colorDark: "#ff1b1d" },
	{ range: [60, 79], level: 2000, icon: "7", color: "#8df0d3", colorDark: "#50cfb0" },
	{ range: [80, 99], level: 2500, icon: "8", color: "#dfc3ff", colorDark: "#aaaaff" },
	{ range: [100, 199], level: 3000, icon: "9", color: "#ffad97", colorDark: "#ff738f" }
] as const satisfies {
	range: [number, number];
	level: number;
	icon: string;
	color: string;
	colorDark: string;
}[];

/**
 * Get the current level data
 *
 * @param level Current level
 * @returns The current level data
 */
export function getLevel(level: number) {
	const currentLevel =
		crownLevels.find((l) => level >= l.range[0] && level <= l.range[1]) ||
		crownLevels[crownLevels.length - 1];
	return currentLevel;
}

/**
 * Calculate the total trophies required to reach next level
 *
 * @param level Current level
 * @returns Total trophies required to reach next level
 */
export function getTrophiesForNextLevel(level: number) {
	if (level === 0) return 400;
	let trophiesForNextLevel = 0;
	for (const tier of crownLevels) {
		if (level > tier.range[1]) {
			trophiesForNextLevel += tier.level * 10;
		} else {
			for (let i = tier.range[0]; i <= level ; i++) {
				trophiesForNextLevel += tier.level;
			}
		}
	}
	return trophiesForNextLevel;
}

/**
 * Calculate the total trophies required to reach a specific level
 *
 * @param level Target level
 * @returns Total trophies required to reach the target level
 */
export function getTrophiesForLevel(level: number) {
	if (level === 0) return 0;
	let trophiesForLevel = 0;
	for (const tier of crownLevels) {
		if (level > tier.range[1]) {
			trophiesForLevel += tier.level * 10;
		} else {
			for (let i = tier.range[0]; i <= level-1; i++) {
				trophiesForLevel += tier.level;
			}
			break;
		}
	}
	return trophiesForLevel;
}
