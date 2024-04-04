<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let battleBoxStats = stats.battle_box;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(battleBoxStats, badges.battle_box) +
				calculateTrophies(battleBoxStats, badges.battle_box_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>Rounds Won: <span class="font-bold">{battleBoxStats.rounds_won.toLocaleString()}</span></p>
		<p>
			Rounds Lost: <span class="font-bold"
				>{(battleBoxStats.games_played * 3 - battleBoxStats.rounds_won).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(
					battleBoxStats.rounds_won /
					(battleBoxStats.games_played * 3 - battleBoxStats.rounds_won)
				).toFixed(2)}
			</span>
		</p>
	</div>
	<div>
		<p>Kills: <span class="font-bold">{battleBoxStats.kills.toLocaleString()}</span></p>
		<p>Deaths: <span class="font-bold">{battleBoxStats.deaths.toLocaleString()}</span></p>
		<p>
			KDR: <span class="font-bold">{(battleBoxStats.kills / battleBoxStats.deaths).toFixed(2)}</span
			>
		</p>
	</div>
	<div>
		<p>Melee Kills: <span class="font-bold">{battleBoxStats.melee_kills.toLocaleString()}</span></p>
		<p>
			Ranged Kills: <span class="font-bold">{battleBoxStats.ranged_kills.toLocaleString()}</span>
		</p>
		<p>
			Explosive Kills: <span class="font-bold"
				>{battleBoxStats.explosive_kills.toLocaleString()}</span
			>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold">{battleBoxStats.games_played.toLocaleString()}</span>
		</p>
		<p>
			Team 1st Places:
			<span class="font-bold">
				{battleBoxStats.team_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((battleBoxStats.team_first_place / battleBoxStats.games_played) * 100).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 2nd Places:
			<span class="font-bold">
				{(battleBoxStats.team_second_place - battleBoxStats.team_first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((battleBoxStats.team_second_place - battleBoxStats.team_first_place) /
						battleBoxStats.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 3rd Places:
			<span class="font-bold">
				{(battleBoxStats.team_third_place - battleBoxStats.team_second_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((battleBoxStats.team_third_place - battleBoxStats.team_second_place) /
						battleBoxStats.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Team 4th Places:
			<span class="font-bold">
				{(battleBoxStats.team_fourth_place - battleBoxStats.team_third_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((battleBoxStats.team_fourth_place - battleBoxStats.team_third_place) /
						battleBoxStats.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Individual 1st Places:
			<span class="font-bold">
				{battleBoxStats.solo_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((battleBoxStats.solo_first_place / battleBoxStats.games_played) * 100).toFixed(0)}%)
			</span>
		</p>
		<p>
			Individual Top 3:
			<span class="font-bold">
				{(battleBoxStats.solo_top_three - battleBoxStats.solo_first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((battleBoxStats.solo_top_three - battleBoxStats.solo_first_place) /
						battleBoxStats.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Individual Top 5:
			<span class="font-bold">
				{(battleBoxStats.solo_top_five - battleBoxStats.solo_top_three).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((battleBoxStats.solo_top_five - battleBoxStats.solo_top_three) /
						battleBoxStats.games_played) *
					100
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Concrete Broken:
			<span class="font-bold">
				{battleBoxStats.blocks_broken.toLocaleString()}
			</span>
		</p>
		<p>
			Concrete Placed:
			<span class="font-bold">
				{battleBoxStats.blocks_placed.toLocaleString()}
			</span>
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">{calculateTrophies(battleBoxStats, badges.battle_box).toLocaleString()}</span
		>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
		{#each badges.battle_box as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/battle_box/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={battleBoxStats.badges[badge.stat] === 0}
				/>
				<div class="flex flex-col">
					<p class="flex text-lg font-semibold">
						{badge.name}
					</p>
					<p>Completed {battleBoxStats.badges[badge.stat]} times</p>
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
			{calculateTrophies(battleBoxStats, badges.battle_box_tiered).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
		{#each badges.battle_box_tiered as badge}
			<div class="flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/battle_box/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg sm:h-16 sm:w-16"
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(battleBoxStats[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if battleBoxStats[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(battleBoxStats[badge.stat], badge.tiers).next.name === tier.name}
								<span>{battleBoxStats[badge.stat].toLocaleString()}</span>
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
