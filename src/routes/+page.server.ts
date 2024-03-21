import { API_KEY } from "$env/static/private";
import { featuredProfiles } from "$lib/featuredProfiles";
import { getHighestRank } from "$lib/ranks.js";
import type { Player } from "$lib/schema.js";

export const load = async ({ cookies }) => {
	const profiles: {
		uuid: string;
		username: string;
		message: string;
		rank: string;
	}[] = [];
	const uuids: string[] = [];

	const favorites = cookies.get("favorites");

	if (favorites) {
		uuids.push(
			...favorites
				.split(",")
				.filter((uuid, index, array) => array.indexOf(uuid) === index)
				.filter((uuid) => !featuredProfiles.some((profile) => profile.uuid === uuid))
		);
	}

	uuids.push(...featuredProfiles.map((profile) => profile.uuid));

	try {
		const response = await fetch(`https://api.islandstats.xyz/bulk/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": "IslandStats-Test",
				"API-Key": API_KEY
			},
			body: JSON.stringify({
				uuids
			})
		});

		const data = await response.json();

		if (!data.success) {
			return {
				profiles: []
			};
		}

		const players: Player[] = data.data;

		// sort the players by the order of the uuids with favorites first and featured profiles second
		players.sort((a: Player, b: Player) => {
			const aIndex = uuids.indexOf(a.uuid);
			const bIndex = uuids.indexOf(b.uuid);

			return aIndex - bIndex;
		});

		players.forEach((player: Player) => {
			const profile = featuredProfiles.find((profile) => profile.uuid === player.uuid);

			profiles.push({
				uuid: player.uuid,
				username: player.username,
				message: profile?.message || "",
				rank: getHighestRank(player.ranks)
			});
		});

		return {
			profiles
		};
	} catch (error) {
		console.error(error);
		return {
			profiles: []
		};
	}
};
