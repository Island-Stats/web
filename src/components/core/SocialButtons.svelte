<script lang="ts">
	import { Tooltip } from "flowbite-svelte";

	export let uuid: string;
	export let username: string;
	export let favorites: string[];

	let favoriteChecked = favorites.includes(uuid);

	const clickFavorite = () => {
		if (favorites.length === 10) return;
		favoriteChecked = !favoriteChecked;
		fetch(`?/modifyFavorites`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: "uuid=" + uuid
		});
	};

	const onShare = () => {
		navigator.share({
			text: `Check out ${username} on Island Stats!`,
			url: location.href.split("#")[0]
		});
	};
</script>

<button class="bg-blue-400 mt-4 mr-2 p-1 rounded-full" on:click={onShare}>
	<img
		src="/icons/share.png"
		alt="Share"
		title="Share"
		width={16}
		height={16}
		class="w-5 h-5 pixelated"
	/>
</button>
<button
	role="checkbox"
	aria-checked={!favoriteChecked}
	on:click={clickFavorite}
	class="group bg-blue-400 mt-4 mr-2 p-1 rounded-full"
>
	<img
		src={"/icons/favorite.png"}
		alt="Favorite"
		width={16}
		height={16}
		class="w-5 h-5 pixelated group-aria-checked:grayscale"
	/>
</button>
<Tooltip arrow>
	{#if favoriteChecked}
		Remove from favorites
	{:else if favorites.length === 10}
		You have reached the maximum amount of favorites
	{:else}
		Add to favorites
	{/if}
</Tooltip>
