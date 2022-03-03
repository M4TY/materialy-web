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

	function removeQuestion(index, objec) {
		edited.splice(index, 1);
		// objec.classList.add('animated');
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
			<p class="subject">Editace kvízu</p>
			<p class="theme"><u>{item.theme}</u></p>
		{:else}
			<div class="wrapperWindows">
				<div class="index">
					<p>{i}</p>
				</div>
				<textarea bind:value={item.question} type="text" />
				<textarea bind:value={item.answer} type="text" />
				<button on:click={() => removeQuestion(i, this)}>🗑️</button>
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
		justify-content: center;
		align-items: center;
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
		border-radius: 10px;
		background-color: rgb(224, 224, 224);
		animation: fade 1s;
		transition: 0.25s;
	}
	@keyframes fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.animated {
		opacity: 0;
		transition: 0.25s;
	}
	.index {
		position: absolute;
		background-color: rgb(61, 62, 81);
		left: 0px;
		top: 0;
		height: 100%;
		width: 3vmax;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.index p {
		text-align: center;
		width: 100%;
		color: white;
	}
	textarea {
		font-family: 'Montserrat', sans-serif;
		text-align: center;
		resize: none;
	}
	.wrapperWindows button {
		position: absolute;
		right: 5px;
		transition: 0.25s;
		border-radius: 5px;
		border: 1px solid black;
	}
	.wrapperWindows button:hover {
		transition: 0.25s;
		opacity: 0.8;
	}
	.options {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 20px;
	}
	.options button {
		height: 100%;
		padding: 10px;
		font-family: 'Montserrat', sans-serif;
		font-size: 17px;
		transition: 0.25s;
		border: 1px solid black;
		border-radius: 5px;
	}
	.options textarea {
		height: 100px;
		margin-bottom: 20px;
		transition: 0.25s;
	}
</style>
