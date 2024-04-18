<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let page: "quads" | "summer" = "quads";

	$: skyBattleStats = stats.sky_battle[page];

</script>

<div class="flex justify-center space-x-2 mt-5">
	<button
		class={`rounded-lg p-2 font-semibold text-black transition-colors duration-500 ${page == "quads" ? "bg-teal-400" : "bg-neutral-200 hover:bg-teal-200"}`}
		on:click={() => {
			page = "quads";
		}}
	>
		Quads
	</button>
	<button
		class={`rounded-lg p-2 font-semibold text-black transition-colors duration-500 ${page == "summer" ? "bg-teal-400" : "bg-neutral-200 hover:bg-teal-200"}`}
		on:click={() => {
			page = "summer";
		}}
	>
		Water Fight
	</button>
</div>
<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(skyBattleStats, badges.sky_battle) +
				calculateTrophies(skyBattleStats, badges.sky_battle_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>
			Games Won: <span class="font-bold"
				>{skyBattleStats.survival_first_place.toLocaleString()}</span
			>
		</p>
		<p>
			Games Lost: <span class="font-bold"
				>{(
					skyBattleStats.games_played - skyBattleStats.survival_first_place
				).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(
					skyBattleStats.survival_first_place /
						(skyBattleStats.games_played - skyBattleStats.survival_first_place) || 0
				).toFixed(2)}
			</span>
		</p>
	</div>
	<div>
		<p>Kills: <span class="font-bold">{skyBattleStats.kills.toLocaleString()}</span></p>
		<p>
			Deaths: <span class="font-bold"
				>{(
					skyBattleStats.games_played - skyBattleStats.survival_first_place
				).toLocaleString()}</span
			>
		</p>
		<p>
			KDR: <span class="font-bold"
				>{(
					skyBattleStats.kills /
						(skyBattleStats.games_played - skyBattleStats.survival_first_place) || 0
				).toFixed(2)}</span
			>
		</p>
	</div>
	<div>
		<p>
			Melee Kills: <span class="font-bold">{skyBattleStats.melee_kills.toLocaleString()}</span>
		</p>
		<p>
			Ranged Kills: <span class="font-bold">{skyBattleStats.ranged_kills.toLocaleString()}</span>
		</p>
		<p>
			Explosive Kills: <span class="font-bold"
				>{skyBattleStats.explosive_kills.toLocaleString()}</span
			>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold">{skyBattleStats.games_played.toLocaleString()}</span>
		</p>
		<p>
			Individual 1st Places:
			<span class="font-bold">
				{skyBattleStats.survival_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((skyBattleStats.survival_first_place / skyBattleStats.games_played) * 100 || 0).toFixed(
					0
				)}%)
			</span>
		</p>
		<p>
			Individual Top 3:
			<span class="font-bold">
				{(skyBattleStats.survival_top_three - skyBattleStats.survival_first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.survival_top_three - skyBattleStats.survival_first_place) /
						skyBattleStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Individual Top 5:
			<span class="font-bold">
				{(skyBattleStats.survival_top_five - skyBattleStats.survival_top_three).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.survival_top_five - skyBattleStats.survival_top_three) /
						skyBattleStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Team 1st Places:
			<span class="font-bold">
				{skyBattleStats.team_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((skyBattleStats.team_first_place / skyBattleStats.games_played) * 100 || 0).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 2nd Places:
			<span class="font-bold">
				{(skyBattleStats.team_second_place - skyBattleStats.team_first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.team_second_place - skyBattleStats.team_first_place) /
						skyBattleStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 3rd Places:
			<span class="font-bold">
				{(skyBattleStats.team_third_place - skyBattleStats.team_second_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.team_third_place - skyBattleStats.team_second_place) /
						skyBattleStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 4th Places:
			<span class="font-bold">
				{(skyBattleStats.team_fourth_place - skyBattleStats.team_third_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.team_fourth_place - skyBattleStats.team_third_place) /
						skyBattleStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Chests Looted:
			<span class="font-bold">
				{skyBattleStats.chests_looted.toLocaleString()}
			</span>
		</p>
		<p>
			Golden Chests Looted:
			<span class="font-bold">
				{skyBattleStats.golden_chests_looted.toLocaleString()}
			</span>
		</p>
		<p>
			Survived 1 Minute:
			<span class="font-bold">
				{(skyBattleStats.survived_minute - skyBattleStats.survived_two_minute).toLocaleString()}
			</span>
			times
		</p>
		<p>
			Survived 2 Minutes:
			<span class="font-bold">
				{skyBattleStats.survived_two_minute.toLocaleString()}
			</span>
			times
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">
			{calculateTrophies(skyBattleStats, badges.sky_battle).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
		{#each badges.sky_battle as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={skyBattleStats.badges[badge.stat] === 0}
				/>
				<div class="flex flex-col">
					<p class="flex text-lg font-semibold">
						{badge.name}
					</p>
					<p>Completed {skyBattleStats.badges[badge.stat]} times</p>
				</div>
			</div>
			<Tooltip arrow>
				{badge.description}
			</Tooltip>
		{/each}
	</div>
	<h3 class="text-xl font-bold mt-5 flex">
		Tiered Badges &bull;
		<span class="ml-1">
			{calculateTrophies(skyBattleStats, badges.sky_battle_tiered).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
		{#each badges.sky_battle_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={skyBattleStats[badge.stat] === 0}
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(skyBattleStats[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if skyBattleStats[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(skyBattleStats[badge.stat], badge.tiers).next.name === tier.name}
								<span>{skyBattleStats[badge.stat].toLocaleString()}</span>
								<span style="color: var(--§7);">/ {tier.amount.toLocaleString()}</span>
							{:else}
								<span style="color: var(--§c);">{tier.amount.toLocaleString()}</span>
							{/if}

							{#if index !== badge.tiers.length - 1}
								<span class="text-neutral-300"> &bull; </span>
							{/if}
						{/each}
					</p>
				</div>
			</div>
			<Tooltip arrow>
				{badge.description}
			</Tooltip>
		{/each}
	</div>
</div>
