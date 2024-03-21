import { env } from "$env/dynamic/private";
import { featuredProfiles } from "$lib/featuredProfiles";
import { getHighestRank } from "$lib/ranks.js";
import type { Player } from "$lib/schema.js";
import { error } from "@sveltejs/kit";

export const load = async ({ cookies, params }) => {
	const searchedPlayer = params.player;

	const response = await fetch(`https://api.islandstats.xyz/player/${searchedPlayer}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "IslandStats-Test",
			"API-Key": env.API_KEY
		}
	});

	const playerSearchData = await response.json();

	// If search is not successful, return 404 and fetch favorite and featured profiles
	if (!playerSearchData.success) {
		let profiles: {
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
					"API-Key": env.API_KEY
				},
				body: JSON.stringify({
					uuids
				})
			});

			const bulkSearchData = await response.json();

			if (!bulkSearchData.success) {
				error(
					404,
					JSON.stringify({
						error: bulkSearchData.cause,
						profiles: []
					})
				);
			}

			const players: Player[] = bulkSearchData.data;

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
		} catch (error) {
			console.error(error);
			profiles = [];
		}

		error(
			404,
			JSON.stringify({
				error: playerSearchData.cause,
				profiles
			})
		);
	}

	return {
		player: playerSearchData.player,
		favorites: cookies.get("favorites")
	};
};

export const actions = {
	modifyFavorites: async ({ cookies, request }) => {
		const favorites = cookies.get("favorites") || "";
		const data = await request.formData();

		const uuid = data.get("uuid")?.toString() || "";

		if (!uuid) return;

		if (favorites.includes(uuid)) {
			cookies.set(
				"favorites",
				favorites
					.split(",")
					.filter((id: string) => id !== uuid)
					.join(","),
				{ path: "/", encode: (string) => string }
			);
		} else if (favorites.length === 0) {
			cookies.set("favorites", uuid, { path: "/", encode: (string) => string });
		} else {
			cookies.set("favorites", `${favorites},${uuid}`, { path: "/", encode: (string) => string });
		}
	}
};
