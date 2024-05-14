<script lang="ts">
	import { getLevel } from "$lib/levels";
	import type { CrownLevel } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";

	export let crownLevelData: CrownLevel;

	const currentLevel = getLevel(crownLevelData.level);

	const calculations: {
		[key: string]: {
			obtained: number;
			needed: number;
		};
	} = {
		level: {
			obtained: crownLevelData.nextLevelProgress.obtained,
			needed: crownLevelData.nextLevelProgress.obtainable
		},
		style: {
			obtained: crownLevelData.style.obtained,
			needed: crownLevelData.style.obtainable
		},
		skill: {
			obtained: crownLevelData.skill.obtained,
			needed: crownLevelData.skill.obtainable
		},
		total: {
			obtained: crownLevelData.skill.obtained + crownLevelData.style.obtained,
			needed: crownLevelData.skill.obtainable + crownLevelData.style.obtainable
		},
		bonus: {
			obtained: crownLevelData.skill.bonus + crownLevelData.style.bonus,
			needed: crownLevelData.skill.bonus + crownLevelData.style.bonus
		}
	};


	$: selectedProgress = "level";
</script>

<div class="bg-gray-500 bg-opacity-50 p-2 rounded-lg overflow-visible">
	<h1 class="text-2xl md:text-4xl">Crown Level</h1>
	<div class="flex flex-wrap justify-center gap-2">
		<div>
			<button
				name="Crown Level"
				class={`w-14 h-14 flex justify-center items-center rounded-full transition-colors duration-500`}
				style={`
					background-color:
						${selectedProgress === "level" ? currentLevel.color : "#a1a1a1"}
				`}
				on:click={() => (selectedProgress = "level")}
			>
				<div
					id="crown-icon"
					class="w-8 h-8 pixelated"
					style={`
						background-image: url('https://cdn.islandstats.xyz/icons/crowns/${currentLevel.icon}.png');
						background-size: cover;
					`}
				/>
			</button>
			<div class="flex gap-1 justify-center">
				<!-- Level -->
				<span class="text-neutral-300">
					{crownLevelData.level}
				</span>
			</div>
		</div>
		<Tooltip>Crown Level</Tooltip>
		<div>
			<button
				name="Style Trophies"
				class={`w-14 h-14 flex justify-center items-center rounded-full mcc-colors transition-colors duration-500`}
				style={`
					background-color: ${selectedProgress === "style" ? `var(--style-trophy)` : "#a1a1a1"}
				`}
				on:click={() => (selectedProgress = "style")}
			>
				<div
					id="style-trophies-icon"
					class="w-8 h-8 pixelated"
					style={`
						background-image: url('https://cdn.islandstats.xyz/icons/trophies/purple.png');
						background-size: cover;
					`}
				/>
			</button>
			<div class="flex gap-1 justify-center">
				<!-- Level -->
				<span class="text-neutral-300">
					{calculations.style.obtained.toLocaleString()}
				</span>
			</div>
		</div>
		<Tooltip>Style Trophies</Tooltip>
		<div>
			<button
				name="Skill Trophies"
				class={`w-14 h-14 flex justify-center items-center rounded-full mcc-colors transition-colors duration-500`}
				style={`
					background-color: ${selectedProgress === "skill" ? `var(--skill-trophy)` : "#a1a1a1"}
				`}
				on:click={() => (selectedProgress = "skill")}
			>
				<div
					id="skill-trophies-icon"
					class="w-8 h-8 pixelated"
					style={`
						background-image: url('https://cdn.islandstats.xyz/icons/trophies/red.png');
						background-size: cover;
					`}
				/>
			</button>
			<div class="flex gap-1 justify-center">
				<!-- Level -->
				<span class="text-neutral-300">
					{calculations.skill.obtained.toLocaleString()}
				</span>
			</div>
		</div>
		<Tooltip>Skill Trophies</Tooltip>
		<div>
			<button
				name="Skill Trophies"
				class={`w-14 h-14 flex justify-center items-center rounded-full mcc-colors transition-colors duration-500`}
				style={`
					background-color: ${selectedProgress === "total" ? `var(--total-trophy)` : "#a1a1a1"}
				`}
				on:click={() => (selectedProgress = "total")}
			>
				<div
					id="skill-trophies-icon"
					class="w-8 h-8 pixelated"
					style={`
						background-image: url('https://cdn.islandstats.xyz/icons/trophies/yellow.png');
						background-size: cover;
					`}
				/>
			</button>
			<div class="flex gap-1 justify-center">
				<!-- Level -->
				<span class="text-neutral-300">
					{calculations.total.obtained.toLocaleString()}
				</span>
			</div>
		</div>
		<Tooltip>Total Trophies</Tooltip>
		<div>
			<div
				class={`w-14 h-14 flex justify-center items-center rounded-full mcc-colors transition-colors duration-500`}
				style="background-color: #a1a1a1"
			>
				<div
					id="skill-trophies-icon"
					class="w-8 h-8 pixelated"
					style={`
						background-image: url('https://cdn.islandstats.xyz/icons/trophies/silver.png');
						background-size: cover;
					`}
				/>
			</div>
			<div class="flex gap-1 justify-center">
				<!-- Level -->
				<span class="text-neutral-300">
					{calculations.bonus.obtained.toLocaleString()}
				</span>
			</div>
		</div>
		<Tooltip>Bonus Trophies</Tooltip>
	</div>
	<!-- Faction Bars -->
	<div class="m-1">
		<!-- Info -->
		<div class="flex flex-col md:flex-row md:gap-2">
			<div class="flex gap-1">
				<!-- Level -->
				<span class="font-semibold">Level</span>
				<span class="text-neutral-300">
					{crownLevelData.level}
				</span>
			</div>
			<div class="md:ml-auto font-semibold">
				<!-- Trophies -->
				{calculations[selectedProgress].obtained.toLocaleString()}
				/
				{calculations[selectedProgress].needed.toLocaleString()} Trophies
				<span class="mc-colors" style="color: var(--§7);">
					({Math.floor(
						(calculations[selectedProgress].obtained / calculations[selectedProgress].needed) * 100
					)}%)
				</span>
			</div>
		</div>
	</div>
	<!-- {/* Progress Bar -->
	<div
		class="h-3 left-0 right-0 rounded-md mcc-colors transition-all duration-500"
		style={` background-color: ${selectedProgress === "level" ? currentLevel.colorDark : `var(--${selectedProgress}-trophy-dark)`}`}
	>
		<div
			class="h-full left-0 right-0 rounded-md text-center transition-all duration-500"
			style={`width: calc(100% * ${(calculations[selectedProgress].obtained / calculations[selectedProgress].needed).toFixed(3)});
				background-color: ${selectedProgress === "level" ? currentLevel.color : `var(--${selectedProgress}-trophy)`}`}
		></div>
	</div>
</div>
