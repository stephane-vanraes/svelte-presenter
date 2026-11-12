/**
 * Everything that needs to be shared between the presenter view and the
 * public view lives in this type. Keep it plain and serializable (no
 * functions, classes, Maps or Sets), because it is sent through a
 * BroadcastChannel and compared with JSON.stringify.
 */
type PresentationState = {
	code: boolean;
	current_page: number;
};

/**
 * The shared presentation state, as reactive Svelte state. Read and write it
 * from any component, in any view:
 *
 *   import presentation from '$lib/presentation.svelte';
 *
 *   presentation.value.current_page;      // read
 *   presentation.value.current_page += 1; // write, every open view follows
 * *
 */
const presentation = $state<{ value: PresentationState }>({
	value: {
		current_page: 0
	}
});

export default presentation;

// ---------------------------------------------------------------------------
// Implementation details of the synchronization. You do not need to read or
// change anything below this line to use `presentation`.
// ---------------------------------------------------------------------------

type ChannelMessage = { type: 'INIT' } | { type: 'DATA'; payload: PresentationState };

export const initializePresentation = () => {
	$effect(() => {
		const channel = new BroadcastChannel('presentation');
		let ready = false;

		channel.onmessage = ({ data }: MessageEvent<ChannelMessage>) => {
			if (data.type === 'INIT') {
				if (!ready) return;
				channel.postMessage({ type: 'DATA', payload: $state.snapshot(presentation.value) });
			} else if (data.type === 'DATA') {
				if (JSON.stringify(data.payload) !== JSON.stringify(presentation.value)) {
					presentation.value = data.payload;
				}
				ready = true;
			}
		};

		channel.postMessage({ type: 'INIT' });

		const timeout = setTimeout(() => (ready = true), 250);

		$effect(() => {
			const snapshot = $state.snapshot(presentation.value);
			if (!ready) return;
			channel.postMessage({ type: 'DATA', payload: snapshot });
		});

		return () => {
			clearTimeout(timeout);
			channel.close();
		};
	});
};
