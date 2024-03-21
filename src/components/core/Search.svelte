<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	let ign: string;

	function validateURL(url: string) {
		if (
			url.match(
				/^([0-9a-fA-F]{8})-?([0-9a-fA-F]{4})-?([0-9a-fA-F]{4})-?([0-9a-fA-F]{4})-?([0-9a-fA-F]{12})$/
			)
		) {
			return "/player/" + url;
		} else if (url.match(/^[\w ]{1,16}$/)) {
			url = url.replace(" ", "_");
		} else {
			throw new Error(`"${url}" is not a valid username or UUID`);
		}
		return "/player/" + url;
	}

	const handleSubmit = () => {
		window.location.href = validateURL(ign);
	};
</script>

<form
	class="grid col-span-full grid-cols-1 justify-items-center gap-6 py-5 text-center"
	on:submit|preventDefault={handleSubmit}
>
	<p class="text-2xl font-bold">Show Island stats for:</p>

	<input
		id="ign"
		enterKeyHint="go"
		placeholder="Enter Username"
		aria-label="username"
		class="h-9 w-full bg-white bg-opacity-10 text-center text-white text-xl"
		required
		bind:value={ign}
	/>
	<button
		type="submit"
		class="flex h-9 items-center bg-sky-500 rounded-md uppercase text-sm text-black font-bold px-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-sky-400"
	>
		Search
	</button>
</form>
