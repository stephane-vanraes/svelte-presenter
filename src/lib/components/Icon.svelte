<script lang="ts">
	import type { IconType } from './Icons.svelte';

	type Props = {
		icon: IconType;
		label?: string;
	};

	const { icon, label }: Props = $props();
</script>

<svg
	viewBox="0 0 24 24"
	aria-hidden={label ? undefined : 'true'}
	aria-label={label ?? undefined}
	height="1em"
	width="1em"
>
	<use href="#svg-{icon}" />
</svg>
