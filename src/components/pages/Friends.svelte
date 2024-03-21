<script lang="ts">
	import { getHighestRank } from "$lib/ranks";
	import { type SocialPlayer } from "$lib/schema";

	export let friends: SocialPlayer[] = [];

	// Pagination
	const itemsPerPage = 12;

	// Current page
	let currentPage = 1;

	// Split the friends into pages
	const pages: SocialPlayer[][] = [];
	for (let i = 0; i < friends.length; i += itemsPerPage) {
		pages.push(friends.slice(i, i + itemsPerPage));
	}
</script>

<div>
	<div class="flex justify-center my-4 space-x-4">
		{#each pages as _, i}
			<button
				class={`h-7 w-7 rounded-full font-semibold text-black transition-colors duration-200 ${currentPage == i + 1 ? "bg-sky-500" : "bg-neutral-200 hover:bg-sky-300"}`}
				on:click={() => (currentPage = i + 1)}
			>
				{i + 1}
			</button>
		{/each}
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-between gap-5">
		{#each pages[currentPage - 1] as friend}
			<a
				href={`/player/${friend.username}`}
				target="_blank"
				class="flex items-center space-x-2 transition-colors duration-200 hover:text-sky-500"
			>
				<img
					src={`https://mc-heads.net/avatar/${friend.uuid}/64`}
					alt={`Avatar of ${friend.username}`}
					class="rounded-lg w-8 sm:w-16"
				/>
				<p class="text-lg font-semibold flex">
					{friend.username}
					<img
						src={`https://cdn.islandstats.xyz/ranks/${getHighestRank(friend.ranks).toLowerCase()}.png`}
						alt={`Rank: ${getHighestRank(friend.ranks).toLowerCase()}`}
						class="ml-1 h-8 w-8 rounded-md"
					/>
				</p>
			</a>
		{/each}
	</div>
</div>
