<script>
	import Navbar from '../components/Navbar.svelte';
	import Card from '../components/Card.svelte';
	import Content from '../components/Content.svelte';
	import CookiePopup from '../components/CookiePopup.svelte';
	import { cookiesAgreed } from '../stores/store.js';
</script>

<Navbar notesActive="active" />
<Content />
{#if $cookiesAgreed}
	<CookiePopup />
{/if}
