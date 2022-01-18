<script>
    import { onMount } from "svelte";
    import { compute_slots } from "svelte/internal";
    import Navbar from "./components/Navbar.svelte";
    let temp = [];
    let books = [];
    let categories = [];

    function fetchData() {
        fetch(
            "https://raw.githubusercontent.com/M4TY/zapisky/main/Knihy/knihy.json"
        )
            .then((response) => response.json())
            .then((data) => {
                populateBooks(data);
            });
    }

    function populateBooks(response) {
        response.forEach((element) => {
            books = [...books, element];
        });
    }
    onMount(fetchData);
</script>

<div class="wrapper">
    <Navbar prActive={"active"} />

    <div class="categories-wrapper">
        <div class="card-wrapper">
            {#each books as book}
                <div class="card">
                    <div class="nameWrap">
                        <h1>{book.name}</h1>
                    </div>
                    <div class="subjectWrap">
                        <a href={book.linkToBook} target="_blank">Odkaz</a>
                        {#if book.souhrn}
                            <a href={book.souhrn} target="_blank">Shrnutí</a>
                        {/if}
                    </div>
                </div>
            {/each}
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
    .categories-wrapper {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card-wrapper {
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
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
        width: 30%;
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

    .card .subjectWrap a {
        font-size: 16px;
        margin-right: 10px;
        opacity: 0.8;
        color: white;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .card {
            width: 100%;
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
            width: 40%;
        }

        .card .subjectWrap {
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }
</style>
