<script lang="ts">
	import type { Statistics } from "$lib/schema";
	import BattleBox from "./Games/BattleBox.svelte";
	import Dynaball from "./Games/Dynaball.svelte";
	import HoleInTheWall from "./Games/HoleInTheWall.svelte";
	import ParkourWarrior from "./Games/ParkourWarrior.svelte";
	import SkyBattle from "./Games/SkyBattle.svelte";
	import Tgttos from "./Games/TGTTOS.svelte";

	export let stats: Statistics;

	let page = "battle_box";
</script>

<p class="text-center">Total Games Played <span>{stats.general.games_played.toLocaleString()}</span></p>
<div class="flex justify-center space-x-2 mt-5">
	<button on:click={() => (page = "battle_box")}>
		<img
			class="transition-filter duration-500 hover:grayscale-0"
			class:grayscale={page !== "battle_box"}
			src="https://cdn.islandstats.xyz/games/battle_box/icon.png"
			alt="Battle Box"
		/>
	</button>
	<button on:click={() => (page = "dynaball")}>
		<img
			class="transition-filter duration-500 hover:grayscale-0"
			class:grayscale={page !== "dynaball"}
			src="https://cdn.islandstats.xyz/games/dynaball/icon.png"
			alt="Dynaball"
		/>
	</button>
	<button on:click={() => (page = "hole_in_the_wall")}>
		<img
			class="transition-filter duration-500 hover:grayscale-0"
			class:grayscale={page !== "hole_in_the_wall"}
			src="https://cdn.islandstats.xyz/games/hitw/icon.png"
			alt="Hole In The Wall"
		/>
	</button>
	<button on:click={() => (page = "parkour_warrior")}>
		<img
			class="transition-filter duration-500 hover:grayscale-0"
			class:grayscale={page !== "parkour_warrior"}
			src="https://cdn.islandstats.xyz/games/pkw/icon.png"
			alt="Parkour Warrior Dojo"
		/>
	</button>
	<button on:click={() => (page = "sky_battle")}>
		<img
			class="transition-filter duration-500 hover:grayscale-0"
			class:grayscale={page !== "sky_battle"}
			src="https://cdn.islandstats.xyz/games/sky_battle/icon.png"
			alt="Sky Battle"
		/>
	</button>
	<button on:click={() => (page = "tgttos")}>
		<img
			class="transition-filter duration-500 hover:grayscale-0"
			class:grayscale={page !== "tgttos"}
			src={`https://cdn.islandstats.xyz/games/tgttos/icon.png`}
			alt="To Get To The Other Side"
		/>
	</button>
</div>

<div>
	{#if page === "battle_box"}
		<BattleBox stats={stats} />
	{:else if page === "dynaball"}
		<Dynaball stats={stats} />
	{:else if page === "hole_in_the_wall"}
		<HoleInTheWall stats={stats} />
	{:else if page === "parkour_warrior"}
		<ParkourWarrior stats={stats} />
	{:else if page === "sky_battle"}
		<SkyBattle stats={stats} />
	{:else if page === "tgttos"}
		<Tgttos stats={stats} />
	{:else}
		<p>Page not found</p>
	{/if}
</div>
