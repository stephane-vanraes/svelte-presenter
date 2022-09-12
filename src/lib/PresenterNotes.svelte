<script>
	import { page } from '$app/stores';
	const isPresentation = $page.url.searchParams.has('presentation');
</script>

{#if !isPresentation}
	<div>
		<slot />
	</div>
{/if}

<style>
	div {
		background-color: salmon;
	}
</style>
