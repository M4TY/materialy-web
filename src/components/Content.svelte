<script>
  import { onMount } from "svelte";
  import { compute_slots } from "svelte/internal";
  import Navbar from "./Navbar.svelte";
  import { page } from "../store.js";
  let temp = [];
  let notes = [];

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

  onMount(fetchData);
  function filterData(data) {
    data.forEach((element) => {
      if (element.path.endsWith(".html")) {
        let splitted = element.path.split("/");

        let tempSubj = splitted[0];
        let tempName = splitted[1].split(".")[0];
        let tempLink =
          "https://raw.githubusercontent.com/M4TY/zapisky/main/" + element.path;

        let obj = {
          subject: tempSubj,
          name: tempName,
          link: tempLink,
        };
        notes = [...notes, obj];
      }
    });
  }

  function openLink(link) {
    page.set(link);
    window.location = "/note";
  }
</script>

<div class="wrapper">
  <Navbar notesActive={"active"} />

  <div class="grid-wrapper">
    {#each notes as note}
      <div on:click={() => openLink(note.link)} class="card">
        <div class="nameWrap">
          <h1>{note.name}</h1>
        </div>
        <div class="subjectWrap">
          <p>{note.subject}</p>
        </div>
      </div>
    {/each}
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
    width: 70%;
    height: 90%;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 80px;
    grid-column-gap: 40px;
  }

  .card {
    font-size: 2vh;
    font-family: "Roboto", sans-serif;
    margin-top: 20px;
    background-color: rgb(61, 62, 81);
    height: 100%;
    width: 100%;
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
