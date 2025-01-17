<script lang="ts">
	import type { GeneralStatistics } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	const factions = [
		"red",
		"orange",
		"yellow",
		"lime",
		"green",
		"cyan",
		"aqua",
		"blue",
		"purple",
		"pink"
	];

	type FactionData = {
		[index: string]: any;
		currentFaction: string;
		red: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		orange: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		yellow: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		lime: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		green: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		cyan: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		aqua: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		blue: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		purple: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
		pink: {
			level: number;
			prestige: number;
			current: number;
			max: number;
		};
	};

	export let factionData: FactionData;
	export let generalStats: GeneralStatistics | undefined;
	let selectedFaction: string = factionData.currentFaction;

	function setSelectedFaction(faction: string) {
		selectedFaction = faction;
	}
</script>

<div class="bg-gray-500 bg-opacity-50 p-2 rounded-lg overflow-visible">
	<div class="flex justify-between">
		<p
			class="after:content-['*'] after:ml-0.5 after:text-neutral-400 hover:after:text-sky-500 after:transition-colors after:duration-200"
		>
			Placeholder Faction List
		</p>
		<Tooltip>
			<p>All factions are set to level 0, prestige 0, and have 0/1000 XP.</p>
			<p>This is due to there being no data available for factions.</p>
			<p>Your total faction XP is correct if you have statistics enabled.</p>
		</Tooltip>
		{#if generalStats}
			<p
				class="after:ml-0.5 after:text-neutral-400 after:transition-colors after:duration-200 after:content-['*'] hover:after:text-sky-500"
			>
				Total Faction XP:
				<span>
					{generalStats.total_faction_xp.toLocaleString()}
				</span>
			</p>
			<Tooltip placement="bottom">
				<p>XP from quests: <span>{generalStats.quest_faction_xp.toLocaleString()}</span></p>
				<p>XP from games <span>{generalStats.game_faction_xp.toLocaleString()}</span></p>
				<br />
				<i>This data seems to be slightly inaccurate*</i>
			</Tooltip>
		{:else}
			<p
				class="after:content-['*'] after:ml-0.5 after:text-neutral-400 hover:after:text-sky-500 after:transition-colors after:duration-200"
			>
				Total Faction XP: Hidden
			</p>
			<Tooltip placement="bottom" arrow>Statistics API setting disabled</Tooltip>
		{/if}
	</div>
	<div class="flex flex-wrap justify-center gap-2">
		<!-- Faction Icons -->
		{#each factions as faction}
			<div id={faction}>
				<button
					name={faction}
					class={`w-14 h-14 flex justify-center items-center rounded-full faction-colors transition-colors duration-500`}
					style={`
						background-color:
							${selectedFaction == faction ? `var(--${faction})` : "#a1a1a1"}
					`}
					on:click={() => setSelectedFaction(faction)}
				>
					<div
						id={faction}
						class="w-12 h-8 pixelated"
						style={`
							background-image: url('https://cdn.islandstats.xyz/factions/${faction}/${factionData[faction].prestige}.png');
							background-size: cover;
						`}
					/>
				</button>
				<div class="flex gap-1 justify-center">
					<!-- Level -->
					<span class="text-neutral-300">
						{factionData[faction].level.toLocaleString()}
					</span>
				</div>
			</div>
		{/each}
	</div>
	<!-- Faction Bars -->
	<div class="m-1">
		<!-- Info -->
		<div class="flex flex-col md:flex-row md:gap-2">
			<div class="flex gap-1">
				<!-- Level -->
				<span class="font-semibold">Level</span>
				<span class="text-neutral-300">
					{factionData[selectedFaction].level}
				</span>
			</div>
			<div class="flex gap-1">
				<!-- Prestige -->
				<span class="font-semibold">
					Prestige
					<span class="text-neutral-300">
						{" "}
						{factionData[selectedFaction].prestige}
					</span>
				</span>
			</div>
			<div class="md:ml-auto font-semibold">
				<!-- XP -->
				{factionData[selectedFaction].current}
				/{factionData[selectedFaction].max} XP
			</div>
		</div>
	</div>
	<!-- {/* Progress Bar -->
	<div
		class="h-3 left-0 right-0 rounded-md faction-colors transition-all duration-500"
		style={` background-color: var(--${selectedFaction}-dark)`}
	>
		<div
			class="h-full left-0 right-0 rounded-md text-center transition-all duration-500"
			style={`width: calc(100% * ${(
				factionData[selectedFaction].current / factionData[selectedFaction].max
			).toFixed(4)}); 
				background-color: var(--${selectedFaction})`}
		></div>
	</div>
</div>
