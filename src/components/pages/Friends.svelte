<script lang="ts">
	import { getHighestRank } from "$lib/ranks";
	import { type SocialPlayer } from "$lib/schema";

	export let friends: SocialPlayer[] = [];

	// Sort friends by online status (if there) and then alphabetical order
	friends.sort((a, b) => {
		if (a.status?.online && !b.status?.online) return -1;
		if (!a.status?.online && b.status?.online) return 1;
		return a.username.localeCompare(b.username);
	});

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
	<div
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-between gap-5"
	>
		{#each pages[currentPage - 1] as friend}
			<a
				href={`/player/${friend.username}`}
				target="_blank"
				class="group flex items-center space-x-2 transition-colors duration-200"
			>
				<img
					src={`https://mc-heads.net/avatar/${friend.uuid}/64`}
					alt={`Avatar of ${friend.username}`}
					class="rounded-lg w-8 sm:w-16"
				/>
				<div class="flex flex-col">
					<p class="flex text-lg font-semibold group-hover:text-sky-500">
						{friend.username}
						<img
							src={`https://cdn.islandstats.xyz/ranks/${getHighestRank(friend.ranks).toLowerCase()}.png`}
							alt={`Rank: ${getHighestRank(friend.ranks).toLowerCase()}`}
							class="ml-1 h-6 w-6 rounded-md self-center"
						/>
					</p>
					{#if friend.status?.online}
						<p class="">Online</p>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
