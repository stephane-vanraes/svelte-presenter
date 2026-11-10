export const prerender = true;
export const ssr = false;

export async function load() {
	const page_count = Object.keys(import.meta.glob('./*/+page.svelte')).length - 1;
  
	return {
		page_count
	};
}
