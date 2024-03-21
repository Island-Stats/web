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

<form class="relative ml-3 mr-3 sm:ml-auto sm:mr-auto flex max-w-[500px] flex-grow rounded-md bg-neutral-300 p-1 text-base text-white" on:submit|preventDefault={handleSubmit}>
		<input
		id="ign"
		enterKeyHint="go"
		placeholder="Enter Username"
		aria-label="username"
		class="bg-inherit align-middle left-1 placeholder-neutral-800"
		required
		bind:value={ign}
	/>
	<button type="submit" class="absolute bottom-0 right-0 top-0 grid w-12 place-items-center rounded-lg text-neutral-800 transition-colors duration-500 hover:text-sky-800">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 stroke-2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
	</button>
</form>
