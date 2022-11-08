<script>
	import { onMount } from 'svelte';
	import Card from '../components/Card.svelte';
	import Footer from '../components/Footer.svelte';
	import {year} from "../stores/store.js";

	let loaded = false;
	let temp = [];
	let notes = [];
	let categories = [];
	let raw = [];

	function fetchData() {
		fetch('https://api.github.com/repos/M4TY/zapisky/git/trees/main?recursive=1')
			.then((response) => response.json())
			.then((data) => {
				temp = data.tree;
				raw = temp;
				filterData(temp);
			});
	}
	onMount(fetchData);
	function filterData(data) {
		notes = [];
		categories = [];
		data.forEach((element) => {
			if (element.path.endsWith('.md')) {
				if(element.path.includes("README.md")) {
					return;
				}
				if(element.path.includes("todo.md")) {
					return;
				}

				if(!element.path.includes($year)) return;
				let splitted = element.path.split('/');
				let tempSubj = splitted[1];
				let tempName = splitted[2].split('.')[0];
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
		console.log(categories)
	}
</script>

<div class="content">
	<div class="main">
		<select bind:value={$year} on:change={() => filterData(raw)}>
			<option>2022-2023</option>
			<option>2021-2022</option>
		</select>
		<p>{year}</p>
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 100%;
	}

	select {
		width: 10%;
		padding: 5px;
		background-color: black;
		border: none;
		color: white;
		border: 2px solid white;
		border-radius: 5px;
		text-align: center;
		font-size: 20px;
		font-family: 'Montserrat', sans-serif;
		margin-top: 10px;
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

	@media screen and (min-width: 320px) and (max-width: 800px) {
		select {
			width: 50%;
			font-size: 16px;

		}
	}
</style>
