import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { compute_slots } from 'svelte/internal';

export const cookiesAgreed = writable('false');

cookiesAgreed.subscribe((value) => {
	if (browser) {
		console.log(value);
		window.localStorage.setItem('cookiesAgreed', value);
	}
});
