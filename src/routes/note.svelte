<script>
	import Navbar from '../components/Navbar.svelte';
	import { onMount } from 'svelte';
	let link;
	let pageData = '';
	onMount(() => {
		let temp = window.location.search;
		let splitted = temp.split('=');
		link = splitted[1];
		console.log(link);
		fetchData();
	});

	function fetchData() {
		fetch(link)
			.then((response) => response.text())
			.then((data) => (pageData = data));
	}
</script>

<Navbar />
<iframe srcdoc="<html>{pageData}</html>" />

<style>
	iframe {
		width: 100vw;
		height: 100vh;
	}
</style>
