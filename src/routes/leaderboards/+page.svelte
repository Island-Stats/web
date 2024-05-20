<script lang="ts">
	import type { ActionResult } from "@sveltejs/kit";
	import { Tooltip } from "flowbite-svelte";
	import { badges, type Badge } from "$lib/badges";
	import { Games } from "$lib/schema";
	import type { ActionData } from "./$types";
	import { applyAction, deserialize } from "$app/forms";
	import Leaderboard from "../../components/pages/Leaderboard.svelte";
	import Nav from "../../components/core/Nav.svelte";
	import NavSearch from "../../components/core/NavSearch.svelte";

	const statOptions = {
		GENERAL: [
			{
				stat: "trophies",
				name: "Total Trophies"
			},
			{
				stat: "trophies_skill",
				name: "Skill Trophies"
			},
			{
				stat: "trophies_style",
				name: "Style Trophies"
			},
			{
				stat: "royal_reputation",
				name: "Royal Reputation"
			},
		],
		BATTLE_BOX: [
			{
				stat: "battle_box_quads_first_place_individual",
				name: "First Place"
			},
			{
				stat: "$statistics.battle_box.rounds_won",
				name: "Rounds Won"
			},
			{
				stat: "$statistics.battle_box.kills",
				name: "Kills"
			}
		],
		DYNABALL: [
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
		HOLE_IN_THE_WALL: [
			{
				stat: "$statistics.hitw.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.hitw.first_place",
				name: "Wins"
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
		SKY_BATTLE: [
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
		TGTTOS: [
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
		PARKOUR_WARRIOR: [
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
		],
		ROCKET_SPLEEF: [
			{
				stat: "$statistics.rsr.games_played",
				name: "Games Played"
			},
			{
				stat: "$statistics.rsr.first_place",
				name: "Wins"
			},
			{
				stat: "$statistics.rsr.badges.melee_kills",
				name: "Melee Kills"
			},
			{
				stat: "$statistics.rsr.kills",
				name: "Kills"
			}
		]
	} as const satisfies {
		[key: string]: { stat: string; name: string }[];
	};

	const badgeOptions = {
		BATTLE_BOX: badges.battle_box.map((badge) => ({
			...badge,
			stat: `$statistics.battle_box.badges.${badge.stat}`
		})),
		DYNABALL: badges.dynaball.map((badge) => ({
			...badge,
			stat: `$statistics.dynaball.badges.${badge.stat}`
		})),
		HOLE_IN_THE_WALL: badges.hitw.map((badge) => ({
			...badge,
			stat: `$statistics.hitw.badges.${badge.stat}`
		})),
		SKY_BATTLE: badges.sky_battle.map((badge) => ({
			...badge,
			stat: `$statistics.sky_battle.quads.badges.${badge.stat}`
		})),
		TGTTOS: badges.tgttos.map((badge) => ({
			...badge,
			stat: `$statistics.tgttos.badges.${badge.stat}`
		})),
		ROCKET_SPLEEF: badges.rocket_spleef.map((badge) => ({
			...badge,
			stat: `$statistics.rsr.badges.${badge.stat}`
		}))
	} as const satisfies {
		[key: string]: Badge[];
	};

	const gameOptions = [
		"GENERAL",
		"BATTLE_BOX",
		"DYNABALL",
		"HOLE_IN_THE_WALL",
		"SKY_BATTLE",
		"TGTTOS",
		"PARKOUR_WARRIOR",
		"ROCKET_SPLEEF"
	] as const;

	export let form: ActionData;

	let option: { stat: string; name: string } | Badge;

	async function handleFormSubmit() {
		const res = await fetch(`/leaderboards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `&stat=${option!.stat}`
		});

		const result: ActionResult = deserialize(await res.text());

		applyAction(result);
	}
</script>

<header
	class="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50 text-lg justify-between"
>
	<a href="/" class="flex items-center ml-2 md:ml-4 font-semibold">
		<img src="/icons/logo.png" alt="Island Stats Logo" class="mr-0.5 w-8 h-8 min-w-8" />
		<p class="hidden sm:block">Island Stats</p>
	</a>
	<NavSearch />
	<Nav />
</header>
<main class="backdrop-blur-lg backdrop-brightness-50 md:w-4/5 md:mx-auto min-h-full">
	<h1 class="text-2xl lg:text-4xl mb-5">Leaderboards</h1>
	<p class="text-xl">Redesign in progress</p>
	<!-- <div class="grid gap-1 md:grid-cols-4">
		{#each gameOptions as game}
			{#if game === "GENERAL"}
				<div class="dropdown">
					<button class="dropdown-toggle rounded-md bg-sky-400 py-2 px-4"> General </button>
					<div class="dropdown-menu">
						{#each statOptions[game] as stats}
							<button
								class="dropdown-item"
								on:click={() => {
									option = stats;
									handleFormSubmit();
								}}
							>
								{stats.name}
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<div class="dropdown">
					<button class="dropdown-toggle rounded-md bg-sky-400 py-2 px-4">
						{Games[game].name}
					</button>
					<div class="dropdown-menu">
						{#each statOptions[game] as stats}
							<button
								class="dropdown-item"
								on:click={() => {
									option = stats;
									handleFormSubmit();
								}}
							>
								{stats.name}
							</button>
						{/each}
						{#if game !== "PARKOUR_WARRIOR"}
							<hr class="dropdown-divider" />
							{#each badgeOptions[game] as badge}
								<button
									class="dropdown-item"
									on:click={() => {
										option = badge;
										handleFormSubmit();
									}}
								>
									{badge.name}
								</button>
							{/each}
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div id="leaderboards" class="mt-4">
		{#if form && option}
			{#if form.success === true}
				<div class="flex justify-center items-center gap-1">
					{#if "icon" in option}
						<img
							src={`https://cdn.islandstats.xyz/badges/${option.icon}.png`}
							alt="Badge"
							class="h-16 w-16 rounded-md"
						/>
					{/if}
					<h1 class="text-center text-2xl md:text-4xl my-5">{option.name}</h1>
				</div>
				{#if "description" in option}
					<Tooltip>{option.description}</Tooltip>
				{/if}
				<Leaderboard data={form.data} />
			{:else if form.success === false}
				<p class="text-center text-red-500">{form.cause}</p>
			{/if}
		{:else}
			<p class="mt-5">Select a game to view the leaderboard</p>
		{/if}
	</div> -->
</main>
