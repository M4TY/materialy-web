<script>
	import Question from '../components/Question.svelte';
	import { onMount } from 'svelte';
	let link;
	let source = [];
	let edited = [];
	let finalText;
	onMount(() => {
		let temp = window.location.search;
		let splitted = temp.split('=');
		link = splitted[1];
		fetchData();
	});

	function fetchData() {
		fetch(link)
			.then((res) => res.json())
			.then((data) => {
				source = data;
				edited = source;
			});
	}

	function removeQuestion(index) {
		console.log(edited);
		edited.splice(index, 1);
		edited = edited;
		finalText = '';
	}

	function addQuestion() {
		let obj = {
			question: '',
			answer: ''
		};
		edited.push(obj);
		edited = edited;
		finalText = '';
	}

	function exportQuiz() {
		var json = JSON.stringify(edited);
		finalText = json;
	}
</script>

<div class="wrapper">
	{#each edited as item, i}
		{#if i === 0}
			<p class="subject">{item.subject}</p>
			<p class="theme">{item.theme}</p>
		{:else}
			<div class="wrapperWindows">
				<p>{i}</p>
				<input bind:value={item.question} type="text" />
				<textarea bind:value={item.answer} type="text" />
				<button on:click={() => removeQuestion(i)}>🗑️</button>
			</div>
		{/if}
	{/each}
	<div class="options">
		<button on:click={addQuestion}>Přidat otázku</button>
		<button on:click={exportQuiz}>Exportovat</button>
		<textarea bind:value={finalText} />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.subject {
		font-family: 'Montserrat', sans-serif;
		margin-left: 20px;
		margin-top: 20px;
		font-size: 20px;
		color: white;
	}
	.theme {
		font-family: 'Montserrat', sans-serif;
		color: white;
		margin-left: 20px;
		font-size: 20px;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.wrapperWindows {
		padding-top: 10px;
		padding-bottom: 10px;
		font-family: 'Montserrat', sans-serif;
		background-color: white;
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 10px;
		position: relative;
	}
	input {
		font-family: 'Montserrat', sans-serif;
	}
	textarea {
		font-family: 'Montserrat', sans-serif;
	}
	.wrapperWindows button {
		position: absolute;
		right: 5px;
	}
</style>
