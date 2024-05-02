<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let dynaballStats = stats.dynaball;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold mt-5 flex col-span-full">
		Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(dynaballStats, badges.dynaball) +
				calculateTrophies(dynaballStats, badges.dynaball_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div>
		<p>Games Won: <span class="font-bold">{dynaballStats.wins.toLocaleString()}</span></p>
		<p>
			Games Lost: <span class="font-bold"
				>{(dynaballStats.games_played - dynaballStats.wins).toLocaleString()}</span
			>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(dynaballStats.wins / (dynaballStats.games_played - dynaballStats.wins) || 0).toFixed(2)}
			</span>
		</p>
	</div>
	<div>
		<p>Kills: <span class="font-bold">{dynaballStats.players_eliminated.toLocaleString()}</span></p>
		<p>
			Players Stuck: <span class="font-bold">{dynaballStats.players_stuck.toLocaleString()}</span>
		</p>
		<p>
			Spawners Broken: <span class="font-bold"
				>{dynaballStats.spawners_destroyed.toLocaleString()}</span
			>
		</p>
	</div>
	<div>
		<p>
			Games Played: <span class="font-bold">{dynaballStats.games_played.toLocaleString()}</span>
		</p>
		<p>
			Blocks Broken:
			<span class="font-bold">
				{dynaballStats.blocks_destroyed.toLocaleString()}
			</span>
		</p>
		<p>
			Blocks Placed:
			<span class="font-bold">
				{dynaballStats.blocks_placed.toLocaleString()}
			</span>
		</p>
	</div>
	<div>
		<p>
			Survived 1 Minute:
			<span class="font-bold">
				{(dynaballStats.survived_minute - dynaballStats.survived_two_minute).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((dynaballStats.survived_minute - dynaballStats.survived_two_minute) /
						dynaballStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Survived 2 Minutes:
			<span class="font-bold">
				{(dynaballStats.survived_two_minute - dynaballStats.survived_three_minute).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((dynaballStats.survived_two_minute - dynaballStats.survived_three_minute) /
						dynaballStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Survived 3 Minutes:
			<span class="font-bold">
				{(
					dynaballStats.survived_three_minute - dynaballStats.survived_four_minute
				).toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({(
					((dynaballStats.survived_three_minute - dynaballStats.survived_four_minute) /
						dynaballStats.games_played) *
						100 || 0
				).toFixed(0)}%)
			</span>
		</p>
		<p>
			Survived 4 Minutes:
			<span class="font-bold">
				{dynaballStats.survived_four_minute.toLocaleString()}
			</span>
			<span class="text-neutral-400">
				({((dynaballStats.survived_four_minute / dynaballStats.games_played) * 100 || 0).toFixed(
					0
				)}%)
			</span>
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Badges &bull;
		<span class="ml-1">
			{calculateTrophies(dynaballStats, badges.dynaball).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
		{#each badges.dynaball as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={dynaballStats.badges[badge.stat] === 0}
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
					<p>Completed {dynaballStats.badges[badge.stat]} times</p>
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
			{calculateTrophies(dynaballStats, badges.dynaball_tiered).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophies/red.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.dynaball_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={dynaballStats[badge.stat] === 0}
				/>
				<div class="flex flex-col mc-colors">
					<div class="flex font-semibold">
						<p>
							{badge.name}
							{calculateBadgeTier(dynaballStats[badge.stat], badge.tiers).tier.name}
						</p>
						<span class="mx-1">&bull;</span>
						<img
							src="https://cdn.islandstats.xyz/icons/trophies/red.png"
							alt="Trophy icon"
							class="h-6"
						/>
						{calculateTrophies(dynaballStats, [badge]).toLocaleString()}
					</div>
					<p>
						{#each badge.tiers as tier, index}
							{#if dynaballStats[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(dynaballStats[badge.stat], badge.tiers).next.name === tier.name}
								<span>{dynaballStats[badge.stat].toLocaleString()}</span>
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
