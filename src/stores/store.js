import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const cookies = writable((browser && localStorage.getItem('cookies')) || 'false');
cookies.subscribe((val) => {
	if (browser) return (localStorage.cookies = val);
});
