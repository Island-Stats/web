<script lang="ts">
	import { getHighestRank, type RankName } from "$lib/ranks";
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";

	export let data;
	let leaderboardData = data.data;

	const pages: {
		username: string;
		uuid: string;
		ranks: RankName[];
		value: number;
	}[][] = [];
	const itemsPerPage = 10;
	let currentPage = 0;

	for (let i = 0; i < leaderboardData.length; i += itemsPerPage) {
		pages.push(leaderboardData.slice(i, i + itemsPerPage));
	}
</script>

<div>
	<Table>
		<TableHead class="bg-neutral-500 text-white">
			<TableHeadCell class="w-5">#</TableHeadCell>
			<TableHeadCell class="flex-grow">Username</TableHeadCell>
			<TableHeadCell class="w-5 text-right">Value</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each pages[currentPage] as item, i}
				<TableBodyRow class="odd:bg-neutral-700 text-white even:bg-neutral-500">
					<TableBodyCell class="text-inherit">{i + 1 + currentPage * itemsPerPage}</TableBodyCell>
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
	<div class="flex justify-center mt-4 space-x-2">
		<button
			class="bg-sky-500 text-white px-3 py-1 rounded-md"
			on:click={() => (currentPage = currentPage - 1)}
			disabled={currentPage === 0}
		>
			Previous
		</button>
		{#each pages as page, index}
			<button
				class="text-white px-3 py-1 rounded-md"
				class:bg-sky-500={currentPage === index}
				class:bg-neutral-500={currentPage !== index}
				on:click={() => (currentPage = index)}
				disabled={currentPage === index}
			>
				{index + 1}
			</button>
		{/each}
		<button
			class="bg-sky-500 text-white px-3 py-1 rounded-md"
			on:click={() => (currentPage = currentPage + 1)}
			disabled={currentPage === pages.length - 1}>Next</button
		>
	</div>
</div>
