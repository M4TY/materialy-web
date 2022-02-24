<script>
	import Navbar from '../components/Navbar.svelte';
	import QuizCard from '../components/QuizCard.svelte';
	import { onMount } from 'svelte';
	let temp = [];
	let quizzes = [];
	let links = [];
	function fetchData() {
		fetch('https://api.github.com/repos/M4TY/zapisky/git/trees/main?recursive=1')
			.then((response) => response.json())
			.then((data) => {
				temp = data.tree;
				filterData(temp);
			});
	}
	function filterData(data) {
		data.forEach((element) => {
			if (element.path.endsWith('.json') && element.path.includes('Kvízy')) {
				let obj = element.path;
				console.log(obj);
				links = [...quizzes, obj];
				populateQuizzes(links);
			}
		});
	}
	function populateQuizzes(links) {
		links.forEach((element) => {
			fetch('https://raw.githubusercontent.com/M4TY/zapisky/main/' + element)
				.then((response) => response.json())
				.then((data) => {
					quizzes = [...quizzes, data];
					console.log(quizzes.length);
				});
		});
	}
	onMount(fetchData);
	//   question
	let currentQuestion = 1;
	let currentQuiz = 0;
	let questionLabel;
	let answerLabel;
	let currentLabel;
	let answerShown = 'shown';

	function chooseQuiz(i) {
		console.log(i);
		currentQuiz = i;
		currentQuestion = 1;
		answerShown = 'hidden';
		currentLabel.innerHTML = quizzes[i][0].theme;
		questionLabel.innerHTML = quizzes[i][currentQuestion].question;
		answerLabel.innerHTML = quizzes[i][currentQuestion].answer;
	}
	function next() {
		if (currentQuestion == quizzes[currentQuiz].length - 1) return;
		currentQuestion += 1;
		questionLabel.innerHTML = quizzes[currentQuiz][currentQuestion].question;
		answerLabel.innerHTML = quizzes[currentQuiz][currentQuestion].answer;
		answerShown = 'hidden';
	}
	function previous() {
		if (currentQuestion == 1) return;
		currentQuestion -= 1;
		questionLabel.innerHTML = quizzes[currentQuiz][currentQuestion].question;
		answerLabel.innerHTML = quizzes[currentQuiz][currentQuestion].answer;
		answerShown = 'hidden';
	}
	function random() {
		currentQuestion = Math.floor(Math.random() * (quizzes[currentQuiz].length - 1)) + 1;
		console.log(currentQuestion);
		questionLabel.innerHTML = quizzes[currentQuiz][currentQuestion].question;
		answerLabel.innerHTML = quizzes[currentQuiz][currentQuestion].answer;
		answerShown = 'hidden';
	}
	function toggleAnswer() {
		if (answerShown === 'hidden') {
			answerShown = 'shown';
		} else {
			answerShown = 'hidden';
		}
	}
</script>

<Navbar quizzesActive="active" />

<div class="wrapper">
	<div class="list-view">
		{#each quizzes as quiz, i}
			<div on:click={() => chooseQuiz(i)} class="logic-wrap">
				<QuizCard title={quiz[0].theme} subject={quiz[0].subject} />
			</div>
		{/each}
	</div>

	<div class="questionMenuWrapper">
		<p class="current" bind:this={currentLabel} />
		<div class="text">
			<p class="question" bind:this={questionLabel}>Vyber si téma</p>
			<p class="answer{answerShown}" bind:this={answerLabel}>
				Za stoprocentní správnost otázek neručíme
			</p>
		</div>
		<div class="nav">
			<button on:click={previous}>Předchozí</button>
			<button on:click={next}>Další</button>
			<button on:click={random}>Náhodná otázka</button>
			<button on:click={toggleAnswer}>Ukázat odpověď</button>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.wrapper {
		height: 90vh;
		width: 100vw;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}
	.list-view {
		padding: 20px;
		margin-top: 10px;
		width: 80%;
		display: flex;
		flex-direction: row;
		overflow: auto;
		gap: 20px;
		border: 1px solid gray;
		border-radius: 1vmin;
		overflow-y: hidden;
	}

	.questionMenuWrapper {
		/* background-color: azure; */
		width: 70%;
		height: 70%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		margin-top: 20px;
	}
	.text {
		font-family: 'Montserrat', sans-serif;
		background-color: rgb(61, 62, 81);
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		color: white;
		width: 100%;
		height: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 20px;
	}
	.nav {
		font-family: 'Montserrat', sans-serif;
		background-color: rgb(44, 42, 44);
		height: 10%;
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 10%;
		align-items: flex-start;
	}
	.nav button {
		font-family: 'Montserrat', sans-serif;
		height: 100%;
		width: 20%;
		background-color: rgba(255, 255, 255, 0);
		color: white;
		font-size: 18px;
		transition: 0.25s;
		border: 2px solid gray;
	}
	.nav button:hover {
		height: 100%;
		width: 20%;
		background-color: rgba(255, 255, 255, 1);
		color: black;
		transition: 0.25s;
	}
	.answerhidden {
		display: none;
	}
	.answershown {
		display: auto;
		text-align: center;
	}
	.question {
		font-size: 45px;
		text-align: center;
	}
	.answershown {
		font-size: 40px;
		color: rgb(177, 177, 177);
	}
	.current {
		font-family: 'Montserrat', sans-serif;
		padding-top: 10px;
		background-color: rgb(61, 62, 81);
		color: white;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
	}

	@media screen and (min-width: 320px) and (max-width: 800px) {
		.list-view {
			padding: 0;
			width: 90%;
		}
		.question {
			font-size: 2rem;
		}
		.answerhidden {
			font-size: 1rem;
		}
		.answershown {
			font-size: 1rem;
		}
		.nav button {
			font-size: 8px;
		}
		.questionMenuWrapper {
			margin-top: 20px;
			width: 90%;
		}
	}
	@media screen and (min-width: 800px) and (max-width: 1400px) {
		.question {
			font-size: 2rem;
		}
		.answerhidden {
			font-size: 1rem;
			width: 50%;
		}
		.answershown {
			font-size: 1rem;
			width: 50%;
		}
		.nav button {
			font-size: 0.6rem;
		}
		.nav button:hover {
			font-size: 0.6rem;
		}
	}
</style>
