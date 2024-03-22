<div class="align-middle">
	<button
		class="expander ml-4"
		aria-expanded={false}
		id="info-button"
		on:click={(event) => {
			const button = event.currentTarget;
			const expanded = button.getAttribute("aria-expanded") == "true";
			button.setAttribute("aria-expanded", String(!expanded));
		}}
	>
		About
	</button>
	<div id="info-box" class="expandable text-base space-y-5">
		<p>Island Stats is a free open source stats viewer for MCC Island.</p>
		<p>
			Powered by the MCC Island API, you can check the stats of yourself, your friends or anyone in
			between. 
		</p>
		<p>
			Want to help contribute? Check out the
			<a href={"https://github.com/Island-Stats/web"}>GitHub</a>
			repo or join our <a href={"https://discord.islandstats.xyz"}>Discord</a>.
		</p>
		<p>
			Design inspired by{" "}
			<a href={"https://sky.shiiyu.moe/"}>SkyCrypt</a>.
		</p>
		<p>
			Island Stats is not affiliated with{" "}
			<a href={"https://noxcrew.com/"} target="_blank"> Noxcrew </a>{" "}
			or{" "}
			<a href={"https://mcchampionship.com/"}>MCC Island</a>.
		</p>
	</div>
</div>
