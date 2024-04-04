<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let skyBattleStats = stats.sky_battle;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(skyBattleStats.quads, badges.sky_battle) +
				calculateTrophies(skyBattleStats.quads, badges.sky_battle_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>
			Games Won: <span class="font-bold"
				>{skyBattleStats.quads.survival_first_place.toLocaleString()}</span
			>
		</p>
		<p>
			Games Lost: <span class="font-bold"
				>{(
					skyBattleStats.quads.games_played - skyBattleStats.quads.survival_first_place
				).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(
					skyBattleStats.quads.survival_first_place /
					(skyBattleStats.quads.games_played - skyBattleStats.quads.survival_first_place)
				).toFixed(2)}
			</span>
		</p>
	</div>
	<div>
		<p>Kills: <span class="font-bold">{skyBattleStats.quads.kills.toLocaleString()}</span></p>
		<p>
			Deaths: <span class="font-bold"
				>{(
					skyBattleStats.quads.games_played - skyBattleStats.quads.survival_first_place
				).toLocaleString()}</span
			>
		</p>
		<p>
			KDR: <span class="font-bold"
				>{(
					skyBattleStats.quads.kills /
					(skyBattleStats.quads.games_played - skyBattleStats.quads.survival_first_place)
				).toFixed(2)}</span
			>
		</p>
	</div>
	<div>
		<p>
			Melee Kills: <span class="font-bold">{skyBattleStats.quads.melee_kills.toLocaleString()}</span
			>
		</p>
		<p>
			Ranged Kills: <span class="font-bold"
				>{skyBattleStats.quads.ranged_kills.toLocaleString()}</span
			>
		</p>
		<p>
			Explosive Kills: <span class="font-bold"
				>{skyBattleStats.quads.explosive_kills.toLocaleString()}</span
			>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold"
				>{skyBattleStats.quads.games_played.toLocaleString()}</span
			>
		</p>
		<p>
			Individual 1st Places:
			<span class="font-bold">
				{skyBattleStats.quads.survival_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					(skyBattleStats.quads.survival_first_place / skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Individual Top 3:
			<span class="font-bold">
				{(
					skyBattleStats.quads.survival_top_three - skyBattleStats.quads.survival_first_place
				).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.quads.survival_top_three - skyBattleStats.quads.survival_first_place) /
						skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Individual Top 5:
			<span class="font-bold">
				{(
					skyBattleStats.quads.survival_top_five - skyBattleStats.quads.survival_top_three
				).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.quads.survival_top_five - skyBattleStats.quads.survival_top_three) /
						skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Team 1st Places:
			<span class="font-bold">
				{skyBattleStats.quads.team_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					(skyBattleStats.quads.team_first_place / skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 2nd Places:
			<span class="font-bold">
				{(
					skyBattleStats.quads.team_second_place - skyBattleStats.quads.team_first_place
				).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.quads.team_second_place - skyBattleStats.quads.team_first_place) /
						skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 3rd Places:
			<span class="font-bold">
				{(
					skyBattleStats.quads.team_third_place - skyBattleStats.quads.team_second_place
				).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.quads.team_third_place - skyBattleStats.quads.team_second_place) /
						skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 4th Places:
			<span class="font-bold">
				{(
					skyBattleStats.quads.team_fourth_place - skyBattleStats.quads.team_third_place
				).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((skyBattleStats.quads.team_fourth_place - skyBattleStats.quads.team_third_place) /
						skyBattleStats.quads.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Chests Looted:
			<span class="font-bold">
				{skyBattleStats.quads.chests_looted.toLocaleString()}
			</span>
		</p>
		<p>
			Golden Chests Looted:
			<span class="font-bold">
				{skyBattleStats.quads.golden_chests_looted.toLocaleString()}
			</span>
		</p>
		<p>
			Survived 1 Minute:
			<span class="font-bold">
				{(
					skyBattleStats.quads.survived_minute - skyBattleStats.quads.survived_two_minute
				).toLocaleString()}
			</span>
			times
		</p>
		<p>
			Survived 2 Minutes:
			<span class="font-bold">
				{skyBattleStats.quads.survived_two_minute.toLocaleString()}
			</span>
			times
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">
			{calculateTrophies(skyBattleStats.quads, badges.sky_battle).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
		{#each badges.sky_battle as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={skyBattleStats.quads.badges[badge.stat] === 0}
				/>
				<div class="flex flex-col">
					<p class="flex text-lg font-semibold">
						{badge.name}
					</p>
					<p>Completed {skyBattleStats.quads.badges[badge.stat]} times</p>
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
			{calculateTrophies(skyBattleStats.quads, badges.sky_battle_tiered).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
		{#each badges.sky_battle_tiered as badge}
			<div class="flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/sky_battle/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg sm:h-16 sm:w-16"
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(skyBattleStats.quads[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if skyBattleStats.quads[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(skyBattleStats.quads[badge.stat], badge.tiers).next.name === tier.name}
								<span>{skyBattleStats.quads[badge.stat].toLocaleString()}</span>
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
