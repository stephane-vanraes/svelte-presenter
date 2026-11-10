<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import presentation, { initializePresentation } from '#lib/stores/presentation.svelte.ts';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	$effect(initializePresentation);

	$effect(() => {
		const slug = presentation.value.current_page.toString().padStart(2, '0');
		if (slug != page.url.pathname.substring(1)) {
			goto(`/${slug}${page.url.search}`);
		}
	});

	const handleKeyUp = (ev: KeyboardEvent) => {
		switch (ev.key) {
			case 'ArrowRight': {
				if (presentation.value.current_page < data.page_count) {
					presentation.value.current_page += 1;
				}
				break;
			}
			case 'ArrowLeft': {
				if (presentation.value.current_page > 0) {
					presentation.value.current_page -= 1;
				}
			}
		}
	};
</script>

<svelte:window on:keyup={handleKeyUp} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<input type="number" bind:value={presentation.value.current_page} />
<p>{presentation.value.current_page}</p>

{@render children()}
