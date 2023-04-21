<script>
	import Navbar from '../components/Navbar.svelte';
	import Content from '../components/Content.svelte';
	import CookiePopup from '../components/CookiePopup.svelte';
	import { cookies } from '../stores/store.js';
	import { versionSeen } from '../stores/store.js';
	import {version} from "../stores/versioning.js";
	import NewVersion from "../components/NewVersion.svelte";
</script>

<svelte:head>
    <title>Materiály | Home</title>
</svelte:head>
<Navbar notesActive="active" />
<Content />
{#if $cookies === 'false'}
	<CookiePopup />
{/if}
<!--{#if $versionSeen !== version}-->
<!--	<NewVersion />-->
<!--{/if}-->
