<script lang="ts">
	import type { ActionResult } from "@sveltejs/kit";
	import NavSearch from "../../components/core/NavSearch.svelte";
	import Leaderboard from "../../components/pages/Leaderboard.svelte";
	import type { ActionData } from "./$types";
	import { applyAction, deserialize } from "$app/forms";
	import { badges, type Badge } from "$lib/badges";
	import Nav from "../../components/core/Nav.svelte";

	const statOptions = {
		general: [
			{
				stat: "$statistics.general.games_played",
				name: "Games Played"
			},
			{
				stat: "$collections.currency.royalReputation",
				name: "Royal Reputation"
			},
			{
				stat: "$statistics.general.total_faction_xp",
				name: "Total Faction XP"
			},
			{
				stat: "$statistics.general.quest_faction_xp",
				name: "Quest Faction XP"
			},
			{
				stat: "$statistics.general.game_faction_xp",
				name: "Game Faction XP"
			}
		],
		battle_box: [
			{
				stat: "$statistics.battle_box.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.battle_box.solo_first_place",
				name: "First Place"
			},
			{
				stat: "$statistics.battle_box.rounds_won",
				name: "Rounds Won"
			},
			{
				stat: "$statistics.battle_box.badges.ace",
				name: "Aces"
			},
			{
				stat: "$statistics.battle_box.kills",
				name: "Kills"
			}
		],
		dynaball: [
			{
				stat: "$statistics.dynaball.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.dynaball.wins",
				name: "Wins"
			},
			{
				stat: "$statistics.dynaball.players_stuck",
				name: "Players Stuck"
			},
			{
				stat: "$statistics.dynaball.spawners_destroyed",
				name: "Spawners Destroyed"
			},
			{
				stat: "$statistics.dynaball.players_eliminated",
				name: "Kills"
			}
		],
		hitw: [
			{
				stat: "$statistics.hitw.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.hitw.first_place",
				name: "Wins"
			},
			{
				stat: "$statistics.hitw.badges.slimey_rivalry",
				name: "Games Tied"
			},
			{
				stat: "$statistics.hitw.players_outlived",
				name: "Players Outlived"
			},
			{
				stat: "$statistics.hitw.walls_dodged",
				name: "Walls Dodged"
			}
		],
		sky_battle: [
			{
				stat: "$statistics.sky_battle.quads.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.sky_battle.quads.survival_first_place",
				name: "First Place"
			},
			{
				stat: "$statistics.sky_battle.quads.team_first_place",
				name: "Team Wins"
			},
			{
				stat: "$statistics.sky_battle.quads.survived_two_minute",
				name: "Survived 2 Minutes"
			},
			{
				stat: "$statistics.sky_battle.quads.kills",
				name: "Kills"
			}
		],
		tgttos: [
			{
				stat: "$statistics.tgttos.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.tgttos.first_place",
				name: "Wins"
			},
			{
				stat: "$statistics.tgttos.round_first_place",
				name: "Round First Place"
			},
			{
				stat: "$statistics.tgttos.chickens_punched",
				name: "Chickens Punched"
			},
			{
				stat: "$statistics.tgttos.kills",
				name: "Kills"
			}
		],
		pkw: [
			{
				stat: "$statistics.pkw.dojo.medals_banked",
				name: "Unique Medals Banked"
			},
			{
				stat: "$statistics.pkw.dojo.total_medals_banked",
				name: "Total Medals Banked"
			},
			{
				stat: "$statistics.pkw.dojo.total_expert_cmpls",
				name: "Total Expert Completions"
			},
			{
				stat: "$statistics.pkw.dojo.total_advanced_cmpls",
				name: "Total Advanced Completions"
			},
			{
				stat: "$statistics.pkw.dojo.total_standard_cmpls",
				name: "Total Standard Completions"
			},
			{
				stat: "$statistics.pkw.survivor.games_played",
				name: "Survivor Games Played"
			},
			{
				stat: "$statistics.pkw.survivor.final_duel_wins",
				name: "Final Duel Wins"
			},
			{
				stat: "$statistics.pkw.survivor.leap_7_completion",
				name: "Leap 7 Completions"
			},
			{
				stat: "$statistics.pkw.survivor.obstacles_completed",
				name: "Obstacles Completed"
			},
			{
				stat: "$statistics.general.community_contribution",
				name: "PKW Community Contribution"
			}
		]
	} as const satisfies {
		[key: string]: { stat: string; name: string }[];
	};

	const badgeOptions = {
		battle_box: badges.battle_box.map((badge) => ({
			...badge,
			stat: `$statistics.battle_box.badges.${badge.stat}`
		})),
		dynaball: badges.dynaball.map((badge) => ({
			...badge,
			stat: `$statistics.dynaball.badges.${badge.stat}`
		})),
		hitw: badges.hitw.map((badge) => ({ ...badge, stat: `$statistics.hitw.badges.${badge.stat}` })),
		sky_battle: badges.sky_battle.map((badge) => ({
			...badge,
			stat: `$statistics.sky_battle.quads.badges.${badge.stat}`
		})),
		tgttos: badges.tgttos.map((badge) => ({
			...badge,
			stat: `$statistics.tgttos.badges.${badge.stat}`
		}))
	};

	type GameName = keyof typeof statOptions;

	let game: GameName;
	let stat: { stat: string; name: string } | Badge;

	export let form: ActionData;

	if (form) {
		game = form.game as GameName;
		stat = statOptions[form.game as GameName].find((option) => option.stat === form!.stat)!;
	} else {
		game = "general";
	}

	async function handleFormSubmit() {
		const res = await fetch(`/leaderboards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `game=${game}&stat=${stat!.stat}`
		});

		const result: ActionResult = deserialize(await res.text());

		applyAction(result);
	}
</script>

<svelte:head>
	<title>Leaderboards | Island Stats</title>
</svelte:head>
<header
	class="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50 text-lg justify-between"
>
	<a href="/" class="flex items-center ml-2 md:ml-4 font-semibold">
		<img src="/icons/logo.png" alt="Island Stats Logo" class="mr-0.5 w-8 h-8 min-w-8" />
		<p>Island Stats</p>
	</a>
	<NavSearch />
	<Nav />
</header>
<main class="backdrop-blur-lg backdrop-brightness-50 md:w-4/5 md:mx-auto min-h-full">
	<div class="flex flex-wrap justify-items-center gap-3 py-5 text-2xl md:text-4xl">
		<h1>Leaderboards</h1>
	</div>
	<form method="POST" on:submit|preventDefault={handleFormSubmit}>
		<div id="games" class="flex justify-center space-x-2 mt-5">
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "general"}
					src="https://cdn.islandstats.xyz/games/lobby/icon.png"
					alt="General"
				/>
				<input type="radio" name="game" value="general" class="hidden" bind:group={game} />
			</label>
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "battle_box"}
					src="https://cdn.islandstats.xyz/games/battle_box/icon.png"
					alt="Battle Box"
				/>
				<input type="radio" name="game" value="battle_box" class="hidden" bind:group={game} />
			</label>
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "dynaball"}
					src="https://cdn.islandstats.xyz/games/dynaball/icon.png"
					alt="Dynaball"
				/>
				<input type="radio" name="game" value="dynaball" class="hidden" bind:group={game} />
			</label>
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "hitw"}
					src="https://cdn.islandstats.xyz/games/hitw/icon.png"
					alt="Hole In The Wall"
				/>
				<input type="radio" name="game" value="hitw" class="hidden" bind:group={game} />
			</label>
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "pkw"}
					src="https://cdn.islandstats.xyz/games/pkw/icon.png"
					alt="Parkour Warrior"
				/>
				<input type="radio" name="game" value="pkw" class="hidden" bind:group={game} />
			</label>
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "sky_battle"}
					src="https://cdn.islandstats.xyz/games/sky_battle/icon.png"
					alt="Sky Battle"
				/>
				<input type="radio" name="game" value="sky_battle" class="hidden" bind:group={game} />
			</label>
			<label>
				<img
					class="transition-filter duration-500 hover:grayscale-0"
					class:grayscale={game !== "tgttos"}
					src={`https://cdn.islandstats.xyz/games/tgttos/icon.png`}
					alt="To Get To The Other Side"
				/>
				<input type="radio" name="game" value="tgttos" class="hidden" bind:group={game} />
			</label>
		</div>
		<div
			id="leaderboard-options-stats"
			class={`mt-4 grid gap-4 mx-auto md:${statOptions[game].length < 5 ? `grid-cols-${statOptions[game].length}` : "grid-cols-5"} grid-cols-2`}
		>
			{#each statOptions[game] as option}
				<button
					class={`rounded-md px-3 py-1 font-semibold text-black ${
						stat === option ? "bg-teal-400" : "bg-neutral-200 hover:bg-teal-200"
					}`}
					on:click={() => (stat = option)}
				>
					{option.name}
				</button>
			{/each}
		</div>
		<!-- {#if game !== "general" && game !== "pkw"}
			<div
				id="leaderboard-options-badges"
				class={`mt-4 grid gap-4 mx-auto lg:${statOptions[game].length < 5 ? `grid-cols-${statOptions[game].length}` : "grid-cols-5"} grid-cols-4`}
			>
				{#each badgeOptions[game] as badge}
					<button class="" on:click={() => (stat = badge)}>
						<img
							src={`https://cdn.islandstats.xyz/badges/${game}/${badge.icon}.png`}
							alt={badge.name}
						/>
					</button>
					<Tooltip
						><div>
							<h1>{badge.name}</h1>
							<p>{badge.description}</p>
						</div></Tooltip
					>
				{/each}
			</div>
		{/if} -->
	</form>
	<div class="mt-4">
		{#if form}
			{#if form.success === true}
				<h1 class="text-center text-2xl md:text-4xl my-5">{stat.name}</h1>
				<Leaderboard data={form.data} />
			{:else if form.success === false}
				<p class="text-center text-red-500">{form.cause}</p>
			{/if}
		{:else}
			<p class="text-center">Select a game to view the leaderboard</p>
		{/if}
	</div>
</main>
