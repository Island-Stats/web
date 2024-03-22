<script lang="ts">
	import { getHighestRank } from "$lib/ranks";
	import { type Party } from "$lib/schema";
	export let party: Party;

	let members = party.members.filter((member) => member.uuid !== party.leader.uuid);
</script>

{#if party.active}
	<div class="grid grid-cols-4 gap-5">
		<a
			href={`/player/${party.leader.username}`}
			target="_blank"
			class="flex items-center space-x-2 transition-colors duration-200 hover:text-sky-500"
		>
			<img
				src={`https://mc-heads.net/avatar/${party.leader.uuid}/64`}
				alt={`Avatar of ${party.leader.username}`}
				class="w-8 rounded-lg sm:w-16"
			/>
			<div class="flex flex-col items-center">
				<p class="flex text-lg font-semibold">
					{party.leader.username}
					<img
						src={`https://cdn.islandstats.xyz/ranks/${getHighestRank(party.leader.ranks).toLowerCase()}.png`}
						alt={`Rank: ${getHighestRank(party.leader.ranks).toLowerCase()}`}
						class="ml-1 h-8 w-8 self-center rounded-md"
					/>
				</p>
				<p class="self-start">Leader</p>
			</div>
		</a>
		{#each members as member}
			<a
				href={`/player/${member.username}`}
				target="_blank"
				class="flex items-center space-x-2 transition-colors duration-200 hover:text-sky-500"
			>
				<img
					src={`https://mc-heads.net/avatar/${member.uuid}/64`}
					alt={`Avatar of ${member.username}`}
					class="w-8 rounded-lg sm:w-16"
				/>
				<p class="flex text-lg font-semibold">
					{member.username}
					<img
						src={`https://cdn.islandstats.xyz/ranks/${getHighestRank(member.ranks).toLowerCase()}.png`}
						alt={`Rank: ${getHighestRank(member.ranks).toLowerCase()}`}
						class="ml-1 h-8 w-8 self-center rounded-md"
					/>
				</p>
			</a>
		{/each}
	</div>
{:else}
	<p class="my-4 text-center">Player is not currently in a party.</p>
{/if}
