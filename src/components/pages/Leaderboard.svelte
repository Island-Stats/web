<script lang="ts">
	import { getHighestRank } from "$lib/ranks";
	import type { Leaderboard, LeaderboardPlayer } from "$lib/schema";
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";

	export let data;
	let leaderboardData: Leaderboard = data.data;

	const itemsPerPage = 10;
	$: currentPage = 0;

	let ign = "";

	$: pages = [] as LeaderboardPlayer[][];
	$: {
		pages = [];
		let filteredData = leaderboardData.filter((item) =>
			item.username.toLowerCase().includes(ign.toLowerCase())
		);
		for (let i = 0; i < filteredData.length; i += itemsPerPage) {
			pages.push(filteredData.slice(i, i + itemsPerPage));
		}
		if (currentPage >= pages.length) {
			currentPage = (pages.length - 1) < 0 ? 0 : pages.length - 1;
		}
	}
</script>

<div>
	{#if pages.length != 0}
		<Table>
			<TableHead class="bg-neutral-500 text-white">
				<TableHeadCell class="p-2 w-5 text-center">#</TableHeadCell>
				<TableHeadCell class="flex-grow">Username</TableHeadCell>
				<TableHeadCell class="w-5 text-right">Value</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each pages[currentPage] as item}
					<TableBodyRow class="odd:bg-neutral-700 text-white even:bg-neutral-500">
						<TableBodyCell class="text-inherit p-2 text-center">{item.placement}</TableBodyCell>
						<TableBodyCell class="text-inherit">
							<a class="flex hover:text-sky-500" href={`/player/${item.uuid}`} target="_blank">
								{item.username}
								<img
									src={`https://cdn.islandstats.xyz/ranks/${getHighestRank(item.ranks).toLowerCase()}.png`}
									alt="Rank"
									class="ml-1 h-6 w-6 rounded-md"
								/>
							</a>
						</TableBodyCell>
						<TableBodyCell class="text-right text-inherit"
							>{item.value.toLocaleString()}</TableBodyCell
						>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{:else}
		<p>No data found.</p>
	{/if}
	<div id="controls">
		<div>
			<input
				type="text"
				class="rounded-md text-center text-black"
				bind:value={ign}
				placeholder="Filter IGN"
			/>
		</div>
		<div class="flex justify-center mt-4 space-x-2">
			<button
				class="bg-sky-500 text-white px-3 py-1 rounded-md disabled:bg-sky-800"
				on:click={() => (currentPage = currentPage - 1)}
				disabled={currentPage === 0 || pages.length == 0}
			>
				Previous
			</button>
			{#if pages.length != 0}
				{#each pages as _, index}
					<button
						class="text-white px-3 py-1 rounded-md hidden sm:block"
						class:bg-sky-500={currentPage === index}
						class:bg-neutral-500={currentPage !== index}
						on:click={() => (currentPage = index)}
						disabled={currentPage === index}
					>
						{index + 1}
					</button>
				{/each}
			{/if}
			<button
				class="bg-sky-500 text-white px-3 py-1 rounded-md disabled:bg-sky-800"
				on:click={() => (currentPage = currentPage + 1)}
				disabled={currentPage === pages.length - 1 || pages.length == 0}>Next</button
			>
		</div>
	</div>
</div>
