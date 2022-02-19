<script>
	import Navbar from '../components/Navbar.svelte';
	import Card from '../components/Card.svelte';
	import Content from '../components/Content.svelte';
	import CookiePopup from '../components/CookiePopup.svelte';
	import { cookies } from '../stores/store.js';
	console.log($cookies);
</script>

<Navbar notesActive="active" />
<Content />
{#if $cookies === 'false'}
	<CookiePopup />
{/if}
