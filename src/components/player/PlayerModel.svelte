<script lang="ts">

	export let uuid: string;
	export let username: string;

</script>

<div>
	<img
		src={`https://starlightskins.lunareclipse.studio/render/default/${uuid}/full`}
		alt={`${username} skin`}
		class="w-16 h-32 sm:w-32 sm:h-64"
		
	/>
</div>
