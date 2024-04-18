<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let tgttosStats = stats.tgttos;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(tgttosStats, badges.tgttos) +
				calculateTrophies(tgttosStats, badges.tgttos_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>
			Games Won: <span class="font-bold">{tgttosStats.first_place.toLocaleString()}</span>
		</p>
		<p>
			Games Lost: <span class="font-bold"
				>{(tgttosStats.games_played - tgttosStats.first_place).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(tgttosStats.first_place / tgttosStats.games_played || 0).toFixed(2)}
			</span>
		</p>
	</div>

	<div>
		<p>
			Kills: <span class="font-bold">{tgttosStats.kills.toLocaleString()}</span>
		</p>
		<p>
			Deaths: <span class="font-bold">{tgttosStats.deaths.toLocaleString()}</span>
		</p>
		<p>
			KDR: <span class="font-bold">{(tgttosStats.kills / tgttosStats.deaths || 0).toFixed(2)}</span>
		</p>
	</div>
	<div>
		<p>
			Blocks Placed: <span class="font-bold">{tgttosStats.blocks_placed.toLocaleString()}</span>
		</p>
		<p>
			Blocks Broken: <span class="font-bold">{tgttosStats.blocks_broken.toLocaleString()}</span>
		</p>
		<p>
			Chickens Punched:
			<span class="font-bold">
				{tgttosStats.chickens_punched.toLocaleString()}
			</span>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold">{tgttosStats.games_played.toLocaleString()}</span>
		</p>
		<p>
			Game 1st Places:
			<span class="font-bold">
				{tgttosStats.first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((tgttosStats.first_place / tgttosStats.games_played) * 100 || 0).toFixed(0)}%)
			</span>
		</p>
		<p>
			Game Top 3:
			<span class="font-bold">
				{(tgttosStats.top_three - tgttosStats.first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((tgttosStats.top_three - tgttosStats.first_place) / tgttosStats.games_played) * 100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Game Top 5:
			<span class="font-bold">
				{(tgttosStats.top_five - tgttosStats.top_three).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((tgttosStats.top_five - tgttosStats.top_three) / tgttosStats.games_played) * 100 || 0
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Round 1st Places:
			<span class="font-bold">
				{tgttosStats.round_first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((tgttosStats.round_first_place / (tgttosStats.games_played * 3)) * 100 || 0).toFixed(
					0
				)}%)
			</span>
		</p>
		<p>
			Round Top 3:
			<span class="font-bold">
				{(tgttosStats.round_top_three - tgttosStats.round_first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((tgttosStats.round_top_three - tgttosStats.round_first_place) /
						(tgttosStats.games_played * 3)) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Round Top 5:
			<span class="font-bold">
				{(tgttosStats.round_top_five - tgttosStats.round_top_three).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((tgttosStats.round_top_five - tgttosStats.round_top_three) /
						(tgttosStats.games_played * 3)) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Round Top 8:
			<span class="font-bold">
				{(tgttosStats.round_top_eight - tgttosStats.round_top_five).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((tgttosStats.round_top_eight - tgttosStats.round_top_five) /
						(tgttosStats.games_played * 3)) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">{calculateTrophies(tgttosStats, badges.tgttos)}</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
		{#each badges.tgttos as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={tgttosStats.badges[badge.stat] === 0}
				/>
				<div class="flex flex-col">
					<p class="flex text-lg font-semibold">
						{badge.name}
					</p>
					<p>Completed {tgttosStats.badges[badge.stat]} times</p>
				</div>
			</div>
			<Tooltip arrow>
				{badge.description}
			</Tooltip>
		{/each}
	</div>
	<h3 class="text-xl font-bold mt-5 flex">
		Tiered Badges &bull;
		<span class="ml-1">{calculateTrophies(tgttosStats, badges.tgttos_tiered)}</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.tgttos_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={tgttosStats[badge.stat] === 0}
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(tgttosStats[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if tgttosStats[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(tgttosStats[badge.stat], badge.tiers).next.name === tier.name}
								<span>{tgttosStats[badge.stat].toLocaleString()}</span>
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
