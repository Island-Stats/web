<script>
	import { featuredProfiles } from "$lib/featuredProfiles";
	import About from "../components/core/About.svelte";
	import Search from "../components/core/Search.svelte";
	import PlayerHead from "../components/player/PlayerHead.svelte";

	export let data;

	let profiles = data.profiles ?? [];
</script>

<svelte:head>
	<title>Island Stats</title>
	<meta
		name="description"
		content="
		Island Stats is a website that allows you to view player stats, leaderboards, and more for the MCC Island server."
	/>
	<link rel="icon" href="./favicon.ico" />
</svelte:head>

<header
	class="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50 text-lg"
>
	<a href="/" class="flex items-center ml-2 md:ml-4 font-semibold">
		<img src="/icons/logo.png" alt="Island Stats Logo" width={32} height={32} class="mr-0.5" />
		<p class="">Island Stats</p>
	</a>
	<About />
</header>
<main class="grid">
	<Search />

	<div class="group col-span-full py-5 px-2 text-center">
		<p class="text-neutral-200 text-xl font-bold transition-colors">Site preview</p>
		<p class="text-neutral-200">
			Island Stats is still in heavy development. Please report any bugs on the{" "}
			<a href="https://discord.islandstats.xyz/" class="text-sky-200 hover:text-sky-400">
				Discord
			</a>{" "}
			or{" "}
			<a
				href="https://github.com/Island-Stats/web/issues"
				class="text-sky-200 hover:text-sky-400"
			>
				GitHub
			</a>
			.
		</p>
	</div>
	{#if profiles.length === 0}
		<div class="group col-span-full py-5 px-2 text-center">
			<p class="text-neutral-200">
				There was an issue loading your favorites and the featured profiles. Please try again later.
			</p>
		</div>
	{:else if profiles.length === featuredProfiles.length}
		<div class="relative p-5 grid grid-cols-4 space-x-2">
			<img
				alt="question mark player head"
				src={"/q.png"}
				class="rounded-md pixelated m-auto"
				width={64}
				height={64}
			/>
			<div class="col-span-3">
				<p class="font-semibold text-lg">No favorites set!</p>
				<p class="pr-2">
					Why don{"'"}t you set a favorite?
				</p>
			</div>
		</div>
	{/if}
	{#each profiles as profile}
		<a
			href="/player/{profile.uuid}"
			class="grid grid-cols-4 space-x-2 p-5 border-2 border-transparent hover:border-sky-500 transition-colors duration-500"
		>
			<PlayerHead uuid={profile.uuid} username={profile.username} />
			<div class="col-span-3">
				<p class="flex font-semibold text-lg items-center">
					{profile.username}
					<img
						src="https://cdn.islandstats.xyz/ranks/{profile.rank.toLowerCase()}.png"
						alt="{profile.rank.toLowerCase()} icon"
						class="ml-1 w-6 h-6"
					/>
				</p>
				<p class="pr-2">{profile.message}</p>
			</div>
		</a>
	{/each}
</main>
