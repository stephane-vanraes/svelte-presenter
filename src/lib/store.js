import { get, writable } from 'svelte/store';

let channel;
let store;

store = writable(0, () => {
	channel = new BroadcastChannel('current');
	channel.onmessage = function (ev) {
		if (ev.data.init) {
			channel.postMessage({
				value: get(store)
			});
		} else {
			if (get(store) !== ev.data.value) store.set(ev.data.value);
		}
	};

	channel.postMessage({
		init: true
	});

	return () => {
		channel.close();
	};
});

function set(value) {
	store.set(value);
	channel.postMessage({
		value
	});
}

export default {
	set,
	subscribe: store.subscribe
};
