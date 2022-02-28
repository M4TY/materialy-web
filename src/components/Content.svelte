<script>
	import { onMount } from 'svelte';
	import Card from '../components/Card.svelte';
	import Footer from '../components/Footer.svelte';

	let loaded = false;
	let temp = [];
	let notes = [];
	let categories = [];

	function fetchData() {
		fetch('https://api.github.com/repos/M4TY/zapisky/git/trees/main?recursive=1')
			.then((response) => response.json())
			.then((data) => {
				temp = data.tree;
				filterData(temp);
			});
	}
	onMount(fetchData);
	function filterData(data) {
		data.forEach((element) => {
			if (element.path.endsWith('.html')) {
				let splitted = element.path.split('/');
				let tempSubj = splitted[0];
				let tempName = splitted[1].split('.')[0];
				let tempLink = 'https://raw.githubusercontent.com/M4TY/zapisky/main/' + element.path;
				let obj = {
					subject: tempSubj,
					name: tempName,
					link: tempLink
				};
				notes = [...notes, obj];
			}
		});
		notes.forEach((singleNote) => {
			if (categories.some((e) => e.subject === singleNote.subject)) return;
			let obj = {
				subject: singleNote.subject,
				subjectNotes: []
			};
			categories.push(obj);
		});
		categories = categories;
		notes.forEach((singleNote) => {
			let index = categories.map((e) => e.subject).indexOf(singleNote.subject);
			categories[index].subjectNotes.push(singleNote);
		});
		loaded = true;

		fetchAd();
	}

	export let image_url;

	function fetchAd() {
		fetch('https://cdn.matyashimmer.eu/')
			.then((res) => res.text())
			.then((text) => (image_url = text));
	}
</script>

<div class="content">
	<div class="main">
		<!-- <div class="ad" style="background-image: url({image_url});" /> -->
		<div class="categories-wrapper">
			{#each categories as category}
				<h2>{category.subject}</h2>
				<hr class="line" />
				<div class="cards-wrapper">
					{#each category.subjectNotes as note}
						<Card title={note.name} subject={note.subject} link={note.link} />
					{/each}
				</div>
			{/each}
		</div>
		<!-- <div class="ad" style="background-image: url({image_url});" /> -->
	</div>
	{#if loaded}
		<Footer />
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.content {
		font-family: 'Montserrat', sans-serif;
		width: 100vw;
		height: 100vh;
		background-color: rgb(0, 0, 0);
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 0px;
	}
	.main {
		display: flex;
	}

	.ad {
		color: white;
		/* background-image: url('https://cdn.matyashimmer.eu/ad.png'); */
		background-position: center center;
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.categories-wrapper h1 {
		color: white;
	}

	.categories-wrapper {
		margin-top: 20px;
		color: white;
		width: 100%;
		/* background-color: red; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 20px;
	}

	.categories-wrapper h2 {
		font-size: 32px;
		font-weight: bold;
		margin-top: 20px;
	}
	.categories-wrapper h2:first-child {
		margin-top: 0px;
	}

	.categories-wrapper hr {
		width: 15%;
		margin-bottom: 20px;
	}

	.cards-wrapper {
		width: 80%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}
</style>
