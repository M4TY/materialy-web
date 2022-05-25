import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const cookies = writable((browser && localStorage.getItem('cookies')) || 'false');
cookies.subscribe((val) => {
	if (browser) return (localStorage.cookies = val);
});

export const token = writable((browser && localStorage.getItem('token')) || "false");
token.subscribe((val) => {
	if (browser) return (localStorage.token = val);
});

export const versionSeen = writable((browser && localStorage.getItem('versionSeen')) || "false");
versionSeen.subscribe((val) => {
	if (browser) return (localStorage.versionSeen = val);
});