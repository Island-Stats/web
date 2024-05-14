export const crownLevels = [
	{ range: [0, 9], icon: "1", color: "#b2b2d1", colorDark: "#71719a" },
	{ range: [10, 19], icon: "2", color: "#04db42", colorDark: "#02b61b" },
	{ range: [20, 29], icon: "3", color: "#269dff", colorDark: "#0054d2" },
	{ range: [30, 39], icon: "4", color: "#c039ff", colorDark: "#862eec" },
	{ range: [40, 49], icon: "5", color: "#ff8f00", colorDark: "#ff5400" },
	{ range: [50, 59], icon: "6", color: "#ff6439", colorDark: "#ff1b1d" },
	{ range: [60, 79], icon: "7", color: "#8df0d3", colorDark: "#50cfb0" },
	{ range: [80, 99], icon: "8", color: "#dfc3ff", colorDark: "#aaaaff" },
	{ range: [100, 199], icon: "9", color: "#ffad97", colorDark: "#ff738f" }
] as const satisfies {
	range: [number, number];
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