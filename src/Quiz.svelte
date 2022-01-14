<script>
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar.svelte";
  let temp = [];
  let quizzes = [];
  let links = [];
  function fetchData() {
    fetch(
      "https://api.github.com/repos/M4TY/zapisky/git/trees/main?recursive=1"
    )
      .then((response) => response.json())
      .then((data) => {
        temp = data.tree;
        filterData(temp);
      });
  }

  function filterData(data) {
    data.forEach((element) => {
      if (element.path.endsWith(".json")) {
        let obj = element.path;
        console.log(obj);
        links = [...quizzes, obj];
        populateQuizzes(links);
      }
    });
  }

  function populateQuizzes(links) {
    links.forEach((element) => {
      fetch("https://raw.githubusercontent.com/M4TY/zapisky/main/" + element)
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
  let answerShown = "hidden";

  function chooseQuiz(i) {
    currentQuiz = i;
    currentQuestion = 1;
    let answerShown = "hidden";
    questionLabel.innerHTML = quizzes[i][currentQuestion].question;
    answerLabel.innerHTML = quizzes[i][currentQuestion].answer;
  }

  function next() {
    if (currentQuestion == quizzes[currentQuiz].length - 1) return;
    currentQuestion += 1;
    questionLabel.innerHTML = quizzes[currentQuiz][currentQuestion].question;
    answerLabel.innerHTML = quizzes[currentQuiz][currentQuestion].answer;
    answerShown = "hidden";
  }

  function previous() {
    if (currentQuestion == 1) return;
    currentQuestion -= 1;
    questionLabel.innerHTML = quizzes[currentQuiz][currentQuestion].question;
    answerLabel.innerHTML = quizzes[currentQuiz][currentQuestion].answer;
    answerShown = "hidden";
  }

  function toggleAnswer() {
    if (answerShown === "hidden") {
      answerShown = "shown";
    } else {
      answerShown = "hidden";
    }
  }
</script>

<div class="wrapper">
  <Navbar quizActive={"active"} notes={""} />

  <div class="grid-wrapper">
    {#each quizzes as quiz, i}
      <div on:click={() => chooseQuiz(i)} class="card">
        <div class="nameWrap">
          <h1>{quiz[0].theme}</h1>
        </div>
        <div class="subjectWrap">
          <p>{quiz[0].subject}</p>
        </div>
      </div>
    {/each}
  </div>
  <div class="questionMenuWrapper">
    <div class="text">
      <p class="question" bind:this={questionLabel}>Vyber si téma</p>
      <p class="answer{answerShown}" bind:this={answerLabel} />
    </div>
    <div class="nav">
      <button on:click={previous}>Předchozí</button>
      <button on:click={next}>Další</button>
      <button on:click={toggleAnswer}>Ukázat odpověď</button>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .grid-wrapper {
    padding-left: 20px;
    width: 70%;
    height: 15%;
    /* background-color: rgb(255, 255, 255); */
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 40px;
    padding-bottom: 40px;
  }

  .card {
    font-size: 2vh;
    font-family: "Roboto", sans-serif;
    margin-top: 20px;
    background-color: rgb(61, 62, 81);
    height: 100%;
    width: 20%;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    transition: 0.25s;
    box-shadow: 1px 1px 10px rgb(76, 82, 101);
  }

  .card:hover {
    transform: scale(1.1);
    transition: 0.25s;
    background-color: rgb(54, 55, 71);
    cursor: pointer;
  }

  .card .nameWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
  }

  .card .nameWrap h1 {
    font-size: 22px;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .card .subjectWrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: capitalize;
    width: 100%;
    height: 30%;
    background-color: rgb(76, 82, 101);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .card .subjectWrap p {
    font-size: 16px;
    margin-right: 10px;
    opacity: 0.8;
  }

  .questionMenuWrapper {
    /* background-color: azure; */
    width: 70%;
    height: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  .text {
    font-family: "Roboto", sans-serif;
    background-color: rgb(61, 62, 81);
    border-radius: 3px;
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
    font-family: "Roboto", sans-serif;
    background-color: rgb(44, 42, 44);
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10%;
    align-items: flex-start;
  }

  .nav button {
    height: 100%;
    width: 20%;
    background-color: rgba(255, 255, 255, 0);
    color: white;
    font-size: 20px;
    transition: 0.25s;
  }

  .nav button:hover {
    height: 100%;
    width: 20%;
    background-color: rgba(255, 255, 255, 1);
    color: black;
    font-size: 20px;
    transition: 0.25s;
  }
  .answerhidden {
    display: none;
  }

  .answershown {
    display: auto;
  }

  .question {
    font-size: 45px;
  }

  .answershown {
    font-size: 40px;
    color: rgb(177, 177, 177);
  }
  @media only screen and (max-width: 736px) {
    .grid-wrapper {
      width: 40%;

      display: grid;
      grid-auto-flow: row;
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(10, 1fr);
      grid-row-gap: 40px;
    }
    .grid-wrapper:last-child {
      margin-bottom: 20px;
    }

    .card .nameWrap h1 {
      font-size: 1.2em;
    }

    .card .subjectWrap p {
      font-size: 1em;
    }

    .card {
      border-radius: 3px;
    }

    .card .subjectWrap {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
</style>
