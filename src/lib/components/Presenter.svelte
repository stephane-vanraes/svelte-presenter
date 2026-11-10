<script lang="ts" module>
	let show = $state(true);
</script>

<script lang="ts">
	import { page } from '$app/state';
	import Icon from './Icon.svelte';

	const { children } = $props();

	const toggleShow = () => (show = !show);
</script>

{#if page.url.search !== '?viewer'}
	{#if show}
		<div>
			{@render children()}
		</div>
	{/if}
	<!-- svelte-ignore a11y_accesskey -->
	<button onclick={toggleShow} accesskey="P">
		{#if show}
			<Icon icon="arrow-down" />
		{:else}
			<Icon icon="arrow-up" />
		{/if}
	</button>
{/if}

<style>
	div {
		background-color: var(--notes-bg);
		block-size: 25dvh;
		color: var(--notes-text);
		font-family: monospace;
		font-size: 1rem;
		inset: auto 0 0 0;
		padding: 2rem;
		position: fixed;
	}

	button {
		align-items: center;
		background-color: var(--control-bg);
		border: none;
		color: var(--control-text);
		display: flex;
		gap: 1ch;
		inset: auto 0 0 auto;
		padding: 0.5em;
		position: fixed;
	}
</style>
