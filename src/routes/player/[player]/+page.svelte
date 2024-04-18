<script lang="ts">
	import { Games, type Player } from "$lib/schema";
	import { Tooltip } from "flowbite-svelte";
	import PlayerModel from "../../../components/player/PlayerModel.svelte";
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime";
	import Nametag from "../../../components/player/Nametag.svelte";
	import SocialButtons from "../../../components/core/SocialButtons.svelte";
	import Currency from "../../../components/player/Currency.svelte";
	import NavSearch from "../../../components/core/NavSearch.svelte";
	import CrownLevel from "../../../components/player/CrownLevel.svelte";
	import Friends from "../../../components/pages/Friends.svelte";
	import Party from "../../../components/pages/Party.svelte";
	import Stats from "../../../components/pages/Stats.svelte";
	import Nav from "../../../components/core/Nav.svelte";
	import { Ranks, getHighestRank } from "$lib/ranks";

	dayjs.extend(relativeTime);

	export let data;

	let playerData: Player = data.player;

	let status: { text: string; icon?: string } = {
		text: "",
		icon: ""
	};

	// Set the status text and icon
	if (playerData.status?.online) {
		switch (playerData.status.server.category) {
			case "GAME": {
				const game = Games[playerData.status.server.associatedGame];
				if (playerData.status.server.associatedGame === "PARKOUR_WARRIOR") {
					switch (playerData.status.server.subType) {
						case "survival": {
							status.text = `Playing ${game.name} Survivor`;
							status.icon = game.image;
							break;
						}
						default: {
							const subType: string = playerData.status.server.subType;
							status.text = `Playing ${game.name} Dojo`;
							status.icon = "parkour_warrior/solo/" + subType.replace("main-", "") + ".png";
							break;
						}
					}
				} else {
					status.text = `Playing ${game.name}`;
					status.icon = game.image;
				}
				break;
			}

			case "LOBBY": {
				if (playerData.status.server.associatedGame) {
					const gameName = Games[playerData.status.server.associatedGame];
					status.icon = gameName.image;
					status.text = `In the ${gameName.name} Lobby`;
				} else {
					status.text = "In the Main Lobby";
					status.icon = "lobby/icon.png";
				}
				break;
			}

			case "LIMBO": {
				status.text = "In Limbo";
				break;
			}
			case "QUEUE": {
				status.text = "In Queue";
				break;
			}
		}
	} else {
		if (playerData.status !== undefined) {
			status.text = "Offline";
		} else {
			status.text = "Hidden";
		}
	}

	let selectedPage: string = "stats";

	// Placeholder faction data
</script>

<svelte:head>
	<title>{playerData.username} | Island Stats</title>
	<meta name="description" content={`View ${playerData.username}'s stats on Island Stats, including game stats, currency, socials and more!`} />
	<meta name="og:title" content={`${playerData.username} | Island Stats`} />
	<meta
		name="og:description"
		content={[
			`Rank: ${Ranks[getHighestRank(playerData.ranks)].name}`,
			"", // Empty line
			`Crown Level: ${playerData.crownLevel.level.toLocaleString()}`,
			`Total Trophies: ${(playerData.crownLevel.skill.obtained + playerData.crownLevel.style.obtained).toLocaleString()}`,
			`Skill Trophies: ${playerData.crownLevel.skill.obtained.toLocaleString()}`,
			`Style Trophies: ${playerData.crownLevel.style.obtained.toLocaleString()}`
		].join("\n")}
	/>
	<link rel="icon" href={`https://mc-heads.net/avatar/${playerData.uuid}/128`} />
</svelte:head>

<header
	class="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50 text-lg justify-between"
>
	<a href="/" class="flex items-center ml-2 md:ml-4 font-semibold">
		<img src="/icons/logo.png" alt="Island Stats Logo" class="mr-0.5 w-8 h-8 min-w-8" />
		<p class="hidden sm:block">Island Stats</p>
	</a>
	<NavSearch />
	<Nav />
</header>
<main class="backdrop-blur-lg backdrop-brightness-50 md:w-4/5 md:mx-auto min-h-full">
	<div id="profile" class="flex flex-wrap justify-items-center gap-3 py-5 text-2xl md:text-4xl">
		<div class="flex flex-col sm:flex-row sm:space-x-2">
			<span>Stats for</span>
			<div class="flex">
				<Nametag
					{...{
						ranks: playerData.ranks,
						playerName: playerData.username
					}}
				/>
			</div>
		</div>
		<div class="w-full text-sm">
			<SocialButtons
				uuid={playerData.uuid}
				username={playerData.username}
				favorites={data.favorites?.split(",") ?? []}
			/>
		</div>
	</div>

	<div
		id="levels"
		class="flex flex-col sm:flex-row bg-black bg-opacity-30 p-5 ml-[calc(-1*20px)] mr-[calc(-1*20px)]"
	>
		<div class="mx-auto my-auto sm:mx-0">
			<PlayerModel uuid={playerData.uuid} username={playerData.username} />
		</div>
		<div class="w-full ml-0 sm:ml-4 my-auto space-y-2">
			<div class="flex text-xl space-x-1">
				{#if status.text === "Hidden"}
					<span
						class="after:content-['*'] after:ml-0.5 after:text-neutral-400 hover:after:text-sky-500 after:transition-colors after:duration-200"
					>
						{status.text}
					</span>
					<Tooltip placement="top" arrow>Status API setting disabled</Tooltip>
				{:else}
					<span>{status.text}</span>
				{/if}
				{#if status.icon}
					<img
						src={`https://cdn.islandstats.xyz/games/${status.icon}`}
						alt={status.text}
						width={32}
						height={32}
						class="rounded-md"
					/>
				{/if}
			</div>
			<CrownLevel crownLevelData={playerData.crownLevel} />
		</div>
	</div>
	<div
		id="currency"
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-5 mt-4"
	>
		<Currency currency={playerData.collections?.currency} />
	</div>
	<div id="additional-stats" class="flex space-x-2">
		<p>
			Joined:{" "}
			{#if playerData.status}
				<span
					class="after:content-['*'] after:ml-0.5 after:text-neutral-400 hover:after:text-sky-500 after:transition-colors after:duration-200"
				>
					{dayjs(playerData.status?.firstJoin).fromNow()}
				</span>
				<Tooltip placement="top" arrow>
					{dayjs(playerData.status?.firstJoin).format("MMMM DD, YYYY [at] hh:mm:ss A")}
				</Tooltip>
			{:else}
				<span
					class="after:content-['*'] after:ml-0.5 after:text-neutral-400 hover:after:text-sky-500 after:transition-colors after:duration-200"
				>
					Hidden
				</span>
				<Tooltip placement="top" arrow>Status API setting disabled</Tooltip>
			{/if}
		</p>
		<p>
			Last Updated:{" "}
			<span
				class="after:content-['*'] after:ml-0.5 after:text-neutral-400 hover:after:text-sky-500 after:transition-colors after:duration-200"
			>
				{dayjs(playerData.lastUpdated - 1000).fromNow()}
			</span>
			<Tooltip placement="top" arrow>
				{dayjs(playerData.lastUpdated).format("MMMM DD, YYYY [at] hh:mm:ss A")}
			</Tooltip>
		</p>
	</div>
	<div>
		<b>Not seeing your stats?</b> Make sure to set your API preferences in your in-game settings!
	</div>
	<div class="flex flex-row justify-center space-x-5 mt-10">
		<button
			class={`rounded-lg p-2 font-semibold text-black transition-colors duration-500 ${selectedPage == "stats" ? "bg-teal-400" : "bg-neutral-200 hover:bg-teal-200"}`}
			on:click={() => (selectedPage = "stats")}
		>
			Stats
		</button>
		<button
			class={`rounded-lg p-2 font-semibold text-black transition-colors duration-500 ${selectedPage == "friends" ? "bg-teal-400" : "bg-neutral-200 hover:bg-teal-200"}`}
			on:click={() => (selectedPage = "friends")}
		>
			Friends
		</button>
		<button
			class={`rounded-lg p-2 font-semibold text-black transition-colors duration-500 ${selectedPage == "party" ? "bg-teal-400" : "bg-neutral-200 hover:bg-teal-200"}`}
			on:click={() => (selectedPage = "party")}
		>
			Party
		</button>
	</div>
	<div class="my-5 justify-center">
		{#if selectedPage == "stats"}
			<h3 class="text-2xl font-semibold text-center">Stats</h3>
			{#if playerData.statistics === undefined}
				<p class="text-center mt-1">Statistics API setting disabled</p>
			{:else}
				<Stats stats={playerData.statistics} />
			{/if}
		{:else if selectedPage == "friends"}
			<h3 class="text-2xl font-semibold text-center align-middle">
				Friends
				{#if playerData.social !== undefined}
					<span class="text-sm text-neutral-400">({playerData.social.friends.length})</span>
				{/if}
			</h3>
			{#if playerData.social === undefined}
				<p class="text-center mt-1">Social API setting disabled</p>
			{:else}
				<Friends friends={playerData.social.friends} />
			{/if}
		{:else if selectedPage == "party"}
			<h3 class="text-2xl font-semibold text-center">Party</h3>
			{#if playerData.social === undefined}
				<p class="text-center mt-1">Social API setting disabled</p>
			{:else}
				<Party party={playerData.social.party} />
			{/if}
		{/if}
	</div>
</main>
