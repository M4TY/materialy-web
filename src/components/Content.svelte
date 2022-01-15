<script>
  import { onMount } from "svelte";
  import { compute_slots } from "svelte/internal";
  import Navbar from "./Navbar.svelte";
  import { page } from "../store.js";
  let temp = [];
  let notes = [];
  let categories = [];

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
    notes.forEach((singleNote) => {
      if (categories.some((e) => e.subject === singleNote.subject)) return;
      let obj = {
        subject: singleNote.subject,
        subjectNotes: [],
      };
      categories.push(obj);
    });
    categories = categories;
    notes.forEach((singleNote) => {
      let index = categories.map((e) => e.subject).indexOf(singleNote.subject);
      categories[index].subjectNotes.push(singleNote);
    });
  }

  function openLink(link) {
    page.set(link);
    window.location = "/note";
  }
</script>

<div class="wrapper">
  <Navbar notesActive={"active"} />

  <div class="categories-wrapper">
    {#each categories as category}
      <h1 class="categoryH">{category.subject}</h1>
      <hr class="line" />
      {#each category.subjectNotes as note}
        <div on:click={() => openLink(note.link)} class="card">
          <div class="nameWrap">
            <h1>{note.name}</h1>
          </div>
          <div class="subjectWrap">
            <p>{note.subject}</p>
          </div>
        </div>
      {/each}
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
  .categories-wrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .categories-wrapper .categoryH {
    font-family: "Roboto", sans-serif;
    color: white;
    font-size: 32px;
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }

  .categories-wrapper .line {
    width: 20%;
    border-color: rgb(100, 100, 100);
  }

  .card {
    font-size: 2vh;
    font-family: "Roboto", sans-serif;
    margin-top: 20px;
    background-color: rgb(61, 62, 81);
    height: 120px;
    width: 20%;
    color: white;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    transition: 0.25s;
    box-shadow: 1px 1px 10px rgb(76, 82, 101);
    animation: fadeIn 1s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      translate: -100% 0%;
    }
    100% {
      opacity: 1;
      translate: 0 0%;
    }
  }

  .card:hover {
    transform: scale(1.05);
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

  @media screen and (min-width: 320px) and (max-width: 800px) {
    .card {
      width: 50%;
    }

    .categories-wrapper .line {
      width: 50%;
    }

    .card .nameWrap h1 {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 800px) and (max-width: 1400px) {
    .card .nameWrap h1 {
      font-size: 1.2rem;
    }

    .card .subjectWrap p {
      font-size: 1rem;
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
