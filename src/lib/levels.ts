const crowns = [
	{ icon: "0", color: "#69696a", colorDark: "#363637" },
	{ icon: "1", color: "#b2b2d1", colorDark: "#71719a" },
	{ icon: "2", color: "#04db42", colorDark: "#02b61b" },
	{ icon: "3", color: "#269dff", colorDark: "#0054d2" },
	{ icon: "4", color: "#c039ff", colorDark: "#862eec" },
	{ icon: "5", color: "#ff8f00", colorDark: "#ff5400" },
	{ icon: "6", color: "#ff6439", colorDark: "#ff1b1d" },
	{ icon: "7", color: "#8df0d3", colorDark: "#50cfb0" },
	{ icon: "8", color: "#dfc3ff", colorDark: "#aaaaff" },
	{ icon: "9", color: "#ffad97", colorDark: "#ff738f" },
	{ icon: "10", color: "#414ebe", colorDark: "#3926ab" }
];

const tridents = [
	{ icon: "0", color: "#737377", colorDark: "#46464b" },
	{ icon: "1", color: "#b2b2d1", colorDark: "#71719a" },
	{ icon: "2", color: "#04db42", colorDark: "#02b61b" },
	{ icon: "3", color: "#269dff", colorDark: "#0054d2" },
	{ icon: "4", color: "#c039ff", colorDark: "#862eec" },
	{ icon: "5", color: "#ff8f00", colorDark: "#ff5400" },
	{ icon: "6", color: "#ff6439", colorDark: "#ff1b1d" },
	{ icon: "7", color: "#8df0d3", colorDark: "#50cfb0" },
	{ icon: "8", color: "#dfc3ff", colorDark: "#aaaaff" },
	{ icon: "9", color: "#ffad97", colorDark: "#ff738f" },
	{ icon: "10", color: "#414ebe", colorDark: "#3926ab" }
];

/**
 * Get the current level data
 *
 * @param level Current level
 * @returns The current level data
 */
export function getLevel(level: number) {
	return crowns[level] || crowns[10];
}

/**
 * Get the current fishing level data
 * 
 * @param level Current level
 * @returns The current level data
 */
export function getFishingLevel(level: number) {
	return tridents[level] || tridents[10];
}