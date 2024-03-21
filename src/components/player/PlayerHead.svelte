<script lang="ts">
	import { getPlayerHead } from "$lib/utils";

	export let uuid: string;
	export let username: string;
</script>

<img
	src={getPlayerHead(uuid)}
	alt={`${username}'s player head`}
	class="rounded-md pixelated m-auto"
	width={64}
	height={64}
/>
