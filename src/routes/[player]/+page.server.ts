import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const searchedPlayer = params.player;

	// Redirect to the player's page
	redirect(302, `/player/${searchedPlayer}`);
}
