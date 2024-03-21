<script lang="ts">
	import { type Currency } from "$lib/schema";

	export let currency: Currency | undefined;
</script>

<div class="mx-auto col-span-full flex flex-col text-center">
	<h3 class="text-neutral-200 font-semibold">Wallet</h3>
	{#if currency}
		<div class="grid grid-cols-2 md:grid-cols-5 justify-items-start md:justify-items-center">
			<div class="flex items-center">
				<img
					src="https://cdn.islandstats.xyz/icons/coin.png"
					alt="Coins"
					title="Coins"
					width={32}
					height={32}
					class="pixelated mr-0.5"
					loading="lazy"
					fetchPriority="low"
					decoding="async"
				/>
				<span>
					{currency.coins.toLocaleString()}
				</span>
			</div>
			<div class="flex items-center">
				<img
					src="https://cdn.islandstats.xyz/icons/gem.png"
					alt="Gems"
					title="Gems"
					width={32}
					height={32}
					class="pixelated mr-0.5"
					loading="lazy"
					fetchPriority="low"
					decoding="async"
				/>
				<span>
					{currency.gems.toLocaleString()}
				</span>
			</div>
			<div class="flex items-center">
				<img
					src="https://cdn.islandstats.xyz/icons/material_dust.png"
					alt="Material Dust"
					title="Material Dust"
					width={32}
					height={32}
					class="pixelated mr-0.5"
					loading="lazy"
					fetchPriority="low"
					decoding="async"
				/>
				<span>
					{currency.materialDust.toLocaleString()}
				</span>
			</div>
			<div class="flex items-center">
				<img
					src="https://cdn.islandstats.xyz/icons/silver.png"
					alt="Silver"
					title="Silver"
					width={32}
					height={32}
					class="pixelated mr-0.5"
					loading="lazy"
					fetchPriority="low"
					decoding="async"
				/>
				<span>
					{currency.silver.toLocaleString()}
				</span>
			</div>
			<div class="col-span-2 mx-auto flex items-center md:col-auto">
				<img
					src="https://cdn.islandstats.xyz/icons/royal_reputation.png"
					alt="Royal Reputation"
					title="Royal Reputation"
					width={32}
					height={32}
					class="pixelated mr-0.5"
					loading="lazy"
					fetchPriority="low"
					decoding="async"
				/>
				<span>
					{currency.royalReputation.toLocaleString()}
				</span>
			</div>
		</div>
	{:else}
		<p>Collections API setting disabled</p>
	{/if}
</div>
