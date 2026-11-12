<script lang="ts">
	import Icon from './Icon.svelte';
	import presentation from '#lib/stores/presentation.svelte.ts';

	const { children } = $props();
</script>

<button
	id="show"
	commandfor="code-block"
	command="show-modal"
	onclick={() => (presentation.value.code = true)}
>
	<Icon icon="gear" />
</button>
<dialog id="code-block" class="card" open={presentation.value.code}>
	<button commandfor="code-block" command="close" onclick={() => (presentation.value.code = false)}>
		<Icon icon="close" />
	</button>
	<code><pre>{@render children()}</pre></code>
</dialog>

<style>
	dialog {
		display: fixed;
		font-family: monospace;
		font-size: 1rem;
		inline-size: 80dvw;
		inset: 50%;
		opacity: 1;
		translate: -50% -50%;
		transition: opacity 250ms linear;

		@starting-style {
			opacity: 0;
		}

		> button {
			background: none;
			border: none;
			inset: 0.5rem 0.5rem auto auto;
			position: fixed;
		}
	}

	#show {
		aspect-ratio: 1;
		background-color: var(--yellow);
		border: none;
		border-radius: 50%;
		inline-size: 2rem;
		display: grid;
		place-items: center;
	}

	pre {
		font-size: 1.25em;
		letter-spacing: 1px;
		line-height: 1.5;
	}
</style>
