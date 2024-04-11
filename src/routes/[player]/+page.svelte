<script lang="ts">
	import { page } from "$app/stores";
	import Nav from "../../components/core/Nav.svelte";

	
</script>

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
		<p class="text-neutral-200 text-xl font-bold transition-colors">Redirect in progress</p>
		<p class="text-neutral-200">
			You will be redirected to the player's page in a few seconds. If you are not redirected, please
			click <a class="text-sky-400 hover:text-sky-600 transition-colors duration-300" href={`/player/${$page.params.player}`}>here</a>.
		</p>
	</div>
</main>
