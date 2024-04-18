<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let rsrStats = stats.rsr;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(rsrStats, badges.rocket_spleef) +
				calculateTrophies(rsrStats, badges.rocket_spleef_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>
			Games Won: <span class="font-bold">{rsrStats.first_place.toLocaleString()}</span>
		</p>
		<p>
			Games Lost: <span class="font-bold"
				>{(rsrStats.games_played - rsrStats.first_place).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(rsrStats.first_place / rsrStats.games_played || 0).toFixed(2)}
			</span>
		</p>
	</div>

	<div>
		<p>
			Kills: <span class="font-bold">{rsrStats.kills.toLocaleString()}</span>
		</p>
		<p>
			Deaths: <span class="font-bold">{rsrStats.deaths.toLocaleString()}</span>
		</p>
		<p>
			KDR: <span class="font-bold">{(rsrStats.kills / rsrStats.deaths || 0).toFixed(2)}</span>
		</p>
	</div>
	<div>
		<p>
			Rockets Fired: <span class="font-bold">{rsrStats.rockets_fired.toLocaleString()}</span>
		</p>
		<p>
			Direct Hits: <span class="font-bold">{rsrStats.direct_hits.toLocaleString()}</span>
		</p>
		<p>
			Players Outlived:
			<span class="font-bold">
				{rsrStats.players_outlived.toLocaleString()}
			</span>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold">{rsrStats.games_played.toLocaleString()}</span>
		</p>
		<p>
			1st Places:
			<span class="font-bold">
				{rsrStats.first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((rsrStats.first_place / rsrStats.games_played) * 100 || 0).toFixed(0)}%)
			</span>
		</p>
		<p>
			Top 3:
			<span class="font-bold">
				{(rsrStats.top_three - rsrStats.first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((rsrStats.top_three - rsrStats.first_place) / rsrStats.games_played) * 100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Top 5:
			<span class="font-bold">
				{(rsrStats.top_five - rsrStats.top_three).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(((rsrStats.top_five - rsrStats.top_three) / rsrStats.games_played) * 100 || 0).toFixed(
					0
				)}%)
			</span>
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">{calculateTrophies(rsrStats, badges.rocket_spleef)}</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
		{#each badges.rocket_spleef as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={rsrStats.badges[badge.stat] === 0}
				/>
				<div class="flex flex-col">
					<p class="flex text-lg font-semibold">
						{badge.name}
					</p>
					<p>Completed {rsrStats.badges[badge.stat]} times</p>
				</div>
			</div>
			<Tooltip arrow>
				{badge.description}
			</Tooltip>
		{/each}
	</div>
	<h3 class="text-xl font-bold mt-5 flex">
		Tiered Badges &bull;
		<span class="ml-1">{calculateTrophies(rsrStats, badges.rocket_spleef_tiered)}</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.rocket_spleef_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={rsrStats[badge.stat] < badge.tiers[0].amount}
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(rsrStats[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if rsrStats[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(rsrStats[badge.stat], badge.tiers).next.name === tier.name}
								<span>{rsrStats[badge.stat].toLocaleString()}</span>
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
