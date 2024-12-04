<div class="align-middle">
	<button
		class="expander ml-4"
		aria-expanded={false}
		id="nav-button"
		on:click={(event) => {
			const button = event.currentTarget;
			const expanded = button.getAttribute("aria-expanded") == "true";
			button.setAttribute("aria-expanded", String(!expanded));
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-white w-6 md:mr-2"
			><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
				d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
			/></svg
		>
	</button>
	<div id="info-box" class="expandable text-base space-y-5">
		<div class="w-full">
			<p>Links: </p>
			<a href="/">
				Home
			</a> |
			<a href="/leaderboards">
				Leaderboards
			</a>
		</div>
		<p>Island Stats is a free open source stats viewer for MCC Island.</p>
		<p>
			Powered by the MCC Island API, you can check the stats of yourself, your friends or anyone in
			between.
		</p>
		<p>
			Want to help contribute? Check out the
			<a href={"https://github.com/Island-Stats/web"} target="_blank">GitHub</a>
			repo or join our <a href={"https://discord.gg/rwCnzXQMUB"} target="_blank">Discord</a>.
		</p>
		<p>
			Design inspired by{" "}
			<a href={"https://sky.shiiyu.moe/"} target="_blank">SkyCrypt</a>.
		</p>
		<p>
			Island Stats is not affiliated with{" "}
			<a href={"https://noxcrew.com/"} target="_blank"> Noxcrew </a>{" "}
			or{" "}
			<a href={"https://mcchampionship.com/"} target="_blank">MCC Island</a>.
		</p>
	</div>
</div>
