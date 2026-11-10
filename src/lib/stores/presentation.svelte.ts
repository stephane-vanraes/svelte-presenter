/**
 * Everything that needs to be shared between the presenter view and the
 * public view lives in this type. Keep it plain and serializable (no
 * functions, classes, Maps or Sets), because it is sent through a
 * BroadcastChannel and compared with JSON.stringify.
 */
type PresentationState = {
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
 *
 * The state is wrapped in `{ value }` so the whole object can be replaced
 * when a message arrives from another view (a `$state` export cannot be
 * reassigned from another module).
 *
 * Call `initializePresentation()` once in a root layout, otherwise changes
 * are not synchronized between views.
 */
const presentation = $state<{ value: PresentationState }>({
	value: {
		current_page: 0
	}
});

/**
 * Starts the synchronization with other views. Call it once, during
 * component initialization (for example in the root `+layout.svelte`),
 * because it registers a `$effect`.
 */
export const initializePresentation = () => {
	channel.postMessage({ type: 'INIT' });

	$effect(() => {
		channel.postMessage({
			type: 'DATA',
			payload: $state.snapshot(presentation.value)
		});
	});
};

export default presentation;

// ---------------------------------------------------------------------------
// Implementation details of the synchronization. You do not need to read or
// change anything below this line to use `presentation`.
//
// Protocol: a new view sends INIT to ask for the current state. Every view
// that receives INIT answers with DATA. Whenever the local state changes, it
// is broadcast as DATA. A received DATA message is only applied if it differs
// from the local state, which stops views from echoing the same update back
// and forth forever.
// ---------------------------------------------------------------------------

type ChannelMessage = { type: 'INIT' } | { type: 'DATA'; payload: PresentationState };

const channel = new BroadcastChannel('presentation');

channel.onmessage = ({ data }: MessageEvent<ChannelMessage>) => {
	if (data.type == 'INIT') {
		channel.postMessage({
			type: 'DATA',
			payload: $state.snapshot(presentation.value)
		});
	} else if (data.type == 'DATA') {
		if (JSON.stringify(data.payload) !== JSON.stringify(presentation.value)) {
			presentation.value = data.payload;
		}
	}
};
