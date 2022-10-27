/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	return {
		path: url.pathname.slice(1)
	};
}
