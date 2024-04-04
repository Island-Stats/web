<script>
	import { dev } from "$app/environment";
	import "../app.css";
</script>

<slot />
{#if !dev}
	<!-- Cloudflare Web Analytics -->
	<script
		defer
		src="https://static.cloudflareinsights.com/beacon.min.js"
		data-cf-beacon={'{"token": "f6aa8136d824417b972f0c496b792711"}'}
	></script>
	<!-- End Cloudflare Web Analytics -->
{/if}
