import { env } from "$env/dynamic/private";

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const game = data.get("game");
		const stat = data.get("stat");

		const url = env.ENV === "production" ? "https://api.islandstats.xyz" : "http://localhost:3001";

		try {
			const leaderboardData = await fetch(`${url}/leaderboard`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"User-Agent": "IslandStats",
					"API-Key": env.API_KEY
				},
				body: JSON.stringify({
					stat
				})
			});

			const leaderboard = (await leaderboardData.json()) || [];

			return {
				success: true,
				game,
				stat,
				data: leaderboard
			};
		} catch (error) {
			console.error(error);
			return { success: false, cause: "Failed to fetch leaderboard" };
		}
	}
};
