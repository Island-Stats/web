<script lang="ts">
	import { Ranks, type RankName } from "$lib/ranks";
	import { Tooltip } from "flowbite-svelte";

	export let ranks: RankName[];
	export let playerName: string;

	ranks.sort((a, b) => Ranks[a].hierarchy - Ranks[b].hierarchy);

	const rankName = ranks[0] ?? "DEFAULT";
	const rank = Ranks[rankName];
</script>

<div
	class="w-10 h-10 pixelated rounded-md md:mt-0.5 mr-1"
	style={`
		background-image: url(https://cdn.islandstats.xyz/ranks/${rank.image});
		background-size: cover
	`}
/>
<Tooltip
	class="mcc-colors text-black font-bold"
	style={`background-color: var(--${rankName.toLowerCase()});`}
	placement="bottom"
	type="custom"
>
{rank.name}
</Tooltip>
<span class="font-semibold">
	{playerName}
</span>
