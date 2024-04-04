<script lang="ts">
	import { badges, calculateBadgeTier, calculateTrophies } from "$lib/badges";
	import type { Statistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let stats: Statistics;

	let parkourWarriorStats = stats.pkw;
</script>

<div id="stats" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 text-left">
	<h3 class="text-xl font-bold flex col-span-full">
		Parkour Warrior Stats &bull;
		<span class="ml-1">
			{(
				calculateTrophies(parkourWarriorStats.dojo, badges.dojo_tiered) +
				calculateTrophies(parkourWarriorStats.survivor, badges.survivor_tiered)
			).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<h3 class="text-xl font-bold flex col-span-full">Dojo Stats</h3>
	<div>
		<p>
			Unique Medals:
			<span class="font-bold">
				{parkourWarriorStats.dojo.medals_banked.toLocaleString()}
			</span>
		</p>
		<p>
			Total Medals:
			<span class="font-bold">
				{parkourWarriorStats.dojo.total_medals_banked.toLocaleString()}
			</span>
		</p>
	</div>
	<div>
		<p>
			Unique Standard Completions:
			<span class="font-bold">
				{parkourWarriorStats.dojo.unique_standard_cmpl.toLocaleString()}
			</span>
		</p>
		<p>
			Unique Advanced Completions:
			<span class="font-bold">
				{parkourWarriorStats.dojo.unique_advanced_cmpl.toLocaleString()}
			</span>
		</p>
		<p>
			Unique Expert Completions:
			<span class="font-bold">
				{parkourWarriorStats.dojo.unique_expert_cmpl.toLocaleString()}
			</span>
		</p>
	</div>
	<div>
		<p>
			Total Standard Completions:
			<span class="font-bold">
				{parkourWarriorStats.dojo.total_standard_cmpls.toLocaleString()}
			</span>
		</p>
		<p>
			Total Advanced Completions:
			<span class="font-bold">
				{parkourWarriorStats.dojo.total_advanced_cmpls.toLocaleString()}
			</span>
		</p>
		<p>
			Total Expert Completions:
			<span class="font-bold">
				{parkourWarriorStats.dojo.total_expert_cmpls.toLocaleString()}
			</span>
		</p>
	</div>

	<h3 class="text-xl font-bold flex col-span-full">Survivor Stats</h3>
	<div>
		<p>
			Wins:
			<span class="font-bold">
				{parkourWarriorStats.survivor.final_duel_wins.toLocaleString()}
			</span>
		</p>
		<p>
			Survivor Losses:
			<span class="font-bold">
				{(
					parkourWarriorStats.survivor.games_played - parkourWarriorStats.survivor.final_duel_wins
				).toLocaleString()}
			</span>
		</p>
		<p>
			WLR:
			<span class="font-bold">
				{(
					parkourWarriorStats.survivor.final_duel_wins /
						parkourWarriorStats.survivor.games_played || 0
				).toFixed(2)}
			</span>
		</p>
	</div>
	<div>
		<p>
			Games Played:
			<span class="font-bold">
				{parkourWarriorStats.survivor.games_played.toLocaleString()}
			</span>
		</p>
		<p>
			Players Eliminated:
			<span class="font-bold">
				{parkourWarriorStats.survivor.players_eliminated.toLocaleString()}
			</span>
		</p>
		<p>
			Obstacles Completed:
			<span class="font-bold">
				{parkourWarriorStats.survivor.obstacles_completed.toLocaleString()}
			</span>
		</p>
	</div>
</div>
<div id="badges">
	<h3 class="text-xl font-bold mt-5 flex">
		Dojo Tiered Badges &bull;
		<span class="ml-1"
			>{calculateTrophies(parkourWarriorStats.dojo, badges.dojo_tiered).toLocaleString()}</span
		>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.dojo_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/pkw/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={parkourWarriorStats.dojo[badge.stat] === 0}
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(parkourWarriorStats.dojo[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if parkourWarriorStats.dojo[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(parkourWarriorStats.dojo[badge.stat], badge.tiers).next.name === tier.name}
								<span>{parkourWarriorStats.dojo[badge.stat].toLocaleString()}</span>
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

	<h3 class="text-xl font-bold mt-5 flex">
		Survivor Tiered Badges &bull;
		<span class="ml-1">
			{calculateTrophies(parkourWarriorStats.survivor, badges.survivor_tiered).toLocaleString()}
		</span>
		<img src="https://cdn.islandstats.xyz/icons/trophy.png" alt="Trophy icon" class="h-8 ml-1" />
	</h3>
	<div class="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each badges.survivor_tiered as badge}
			<div class="group flex flex-col sm:flex-row gap-2">
				<img
					src={`https://cdn.islandstats.xyz/badges/pkw/${badge.icon}.png`}
					alt={`Badge icon of ${badge.name}`}
					class="h-12 w-12 rounded-lg transition-filter duration-500 group-hover:grayscale-0 sm:h-16 sm:w-16"
					class:grayscale={parkourWarriorStats.survivor[badge.stat] === 0}
				/>
				<div class="flex flex-col mc-colors">
					<p class="flex text-lg font-semibold">
						{badge.name}
						{calculateBadgeTier(parkourWarriorStats.survivor[badge.stat], badge.tiers).tier.name}
					</p>
					<p>
						{#each badge.tiers as tier, index}
							{#if parkourWarriorStats.survivor[badge.stat] >= tier.amount}
								<span style="color: var(--§a);">{tier.amount.toLocaleString()}</span>
							{:else if calculateBadgeTier(parkourWarriorStats.survivor[badge.stat], badge.tiers).next.name === tier.name}
								<span>{parkourWarriorStats.survivor[badge.stat].toLocaleString()}</span>
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
