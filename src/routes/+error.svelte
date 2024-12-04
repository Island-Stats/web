<script>
	import { page } from "$app/stores";
	import Nav from "../components/core/Nav.svelte";


	let error = $page.error?.message ?? "An unknown error occurred.";
</script>

<svelte:head>
	<title>Island Stats</title>
	<meta
		name="description"
		content="
		Island Stats is a website that allows you to view player stats, leaderboards, and more for the MCC Island server."
	/>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<header
	class="fixed top-0 left-0 right-0 h-12 bg-neutral-800 flex flex-row items-center z-50 text-lg"
>
	<a href="/" class="flex items-center ml-2 md:ml-4 font-semibold">
		<img src="/icons/logo.png" alt="Island Stats Logo" width={32} height={32} class="mr-0.5" />
		<p class="">Island Stats</p>
	</a>
	<Nav />
</header>
<main class="grid">
	<div class="group col-span-full py-5 px-2 text-center">
		<p class="text-neutral-200 text-xl font-bold transition-colors">Error</p>
		<p class="text-neutral-200">
			{error}
		</p>
	</div>
	<div class="group col-span-full py-5 px-2 text-center">
		<p class="text-neutral-200 text-xl font-bold transition-colors">Site preview</p>
		<p class="text-neutral-200">
			Island Stats is still in heavy development. Please report any bugs on the{" "}
			<a href="https://discord.gg/rwCnzXQMUB" class="text-sky-200 hover:text-sky-400">
				Discord
			</a>{" "}
			or{" "}
			<a href="https://github.com/Island-Stats/web/issues" class="text-sky-200 hover:text-sky-400">
				GitHub
			</a>.
		</p>
	</div>
</main>
