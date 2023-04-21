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
<p>Materiály (kromě kvízů) od března roku 2023 už nejsou aktualizovány. Je používán <a href="https://ripe-periwinkle-82e.notion.site/2022-2023-4138a54b7a154fd2850cbe72dd95ed7a">nový zdroj</a></p>
<Content />
{#if $cookies === 'false'}
	<CookiePopup />
{/if}
<!--{#if $versionSeen !== version}-->
<!--	<NewVersion />-->
<!--{/if}-->

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

    p {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        text-align: center;
        margin-top: 1rem;
        color: white;
        font-weight: bold;
    }

    a {
      color: #639dca;
      text-decoration: underline;
    }
</style>