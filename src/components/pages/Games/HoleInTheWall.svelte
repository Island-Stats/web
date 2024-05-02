<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let holeInTheWallStats = stats.hitw;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(holeInTheWallStats, badges.hitw) +
				calculateTrophies(holeInTheWallStats, badges.hitw_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>
			Games Won: <span class="font-bold">{holeInTheWallStats.first_place.toLocaleString()}</span>
		</p>
		<p>
			Games Lost: <span class="font-bold"
				>{(holeInTheWallStats.games_played - holeInTheWallStats.first_place).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(holeInTheWallStats.first_place / holeInTheWallStats.games_played || 0).toFixed(2)}
			</span>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold">{holeInTheWallStats.games_played.toLocaleString()}</span
			>
		</p>
		<p>
			1st Places:
			<span class="font-bold">
				{holeInTheWallStats.first_place.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((holeInTheWallStats.first_place / holeInTheWallStats.games_played) * 100 || 0).toFixed(
					0
				)}%)
			</span>
		</p>
		<p>
			Top 3:
			<span class="font-bold">
				{(holeInTheWallStats.top_three - holeInTheWallStats.first_place).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((holeInTheWallStats.top_three - holeInTheWallStats.first_place) /
						holeInTheWallStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Top 5:
			<span class="font-bold">
				{(holeInTheWallStats.top_five - holeInTheWallStats.top_three).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((holeInTheWallStats.top_five - holeInTheWallStats.top_three) /
						holeInTheWallStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
	</div>
	<div>
		<p>
			Players Outlived: <span class="font-bold"
				>{holeInTheWallStats.players_outlived.toLocaleString()}</span
			>
		</p>
		<p>
			Walls Dodged: <span class="font-bold">{holeInTheWallStats.walls_dodged.toLocaleString()}</span
			>
		</p>
		<p>
			Survived 1 Minute:
			<span class="font-bold">
				{(
					holeInTheWallStats.survived_minute - holeInTheWallStats.survived_two_minute
				).toLocaleString()}
			</span>
			times
		</p>
		<p>
			Survived 2 Minutes:
			<span class="font-bold">
				{holeInTheWallStats.survived_two_minute.toLocaleString()}
			</span>
			times
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">{calculateTrophies(holeInTheWallStats, badges.hitw)}</span>
		<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.hitw as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={holeInTheWallStats.badges[badge.stat] === 0}
				/>
				<div class="flex flex-col">
					<div class="flex font-semibold">
						<p>{badge.name}</p>
						<span class="mx-1">&bull;</span>
						<img
							src="https://cdn.islandstats.xyz/icons/trophies/red.png"
							alt="Trophy icon"
							class="h-6"
						/>
						{badge.trophies.toLocaleString()}
					</div>
					<p>Completed {holeInTheWallStats.badges[badge.stat]} times</p>
				</div>
			</div>
			<Tooltip arrow>
				{badge.description}
			</Tooltip>
		{/each}
	</div>
	<h3 class="text-xl font-bold mt-5 flex">
		Tiered Badges &bull;
		<span class="ml-1">{calculateTrophies(holeInTheWallStats, badges.hitw_tiered)}</span>
		<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.hitw_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={holeInTheWallStats[badge.stat] === 0}
				/>
				<div class="flex flex-col mc-colors">
					<div class="flex font-semibold">
						<p>
							{badge.name}
							{calculateBadgeTier(holeInTheWallStats[badge.stat], badge.tiers).tier.name}
						</p>
						<span class="mx-1">&bull;</span>
						<img
							src="https://cdn.islandstats.xyz/icons/trophies/red.png"
							alt="Trophy icon"
							class="h-6"
						/>
						{calculateTrophies(holeInTheWallStats, [badge]).toLocaleString()}
					</div>
					<p>
						{#each badge.tiers as tier, index}
							{#if holeInTheWallStats[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(holeInTheWallStats[badge.stat], badge.tiers).next.name === tier.name}
								<span>{holeInTheWallStats[badge.stat].toLocaleString()}</span>
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
