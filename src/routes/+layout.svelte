<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import presentation, { initializePresentation } from '#lib/stores/presentation.svelte.ts';
	import '#lib/styles/index.css';
	import Icons from '#lib/components/Icons.svelte';
	import Icon from '#lib/components/Icon.svelte';

	initializePresentation();

	let { data, children } = $props();

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

<main>
	{@render children()}

	{#if page.url.search != '?viewer'}
		<a href="?viewer" target="_blank">
			<Icon icon="presentation" />
		</a>
	{/if}
</main>

<Icons />

<style>
	a {
		aspect-ratio: 1;
		background-color: var(--control-bg);
		border-radius: 50%;
		color: var(--control-text);
		display: grid;
		inline-size: 1.5lh;
		place-items: center;
		position: fixed;
		inset: 5px 5px auto auto;
	}
</style>
