<script>
	import Navbar from '../components/Navbar.svelte';
	import Content from '../components/Content.svelte';
	import CookiePopup from '../components/CookiePopup.svelte';
	import { cookies } from '../stores/store.js';
</script>

<Navbar notesActive="active" />
<Content />
{#if $cookies === 'false'}
	<CookiePopup />
{/if}
