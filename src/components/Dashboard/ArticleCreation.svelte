<script>
    import {token} from "../../stores/store.js";
    import axios from "axios";
    import Alert from "../Alert.svelte";

    let loaded = false;
    let eventName, eventSubject, eventPriority, eventDue;

    let alertContent;
    let alertDisplay;
    function showAlert(content) {
        alertContent = content;
        alertDisplay = "flex";

        setTimeout(() => {  alertDisplay = "none"; }, 3000);
    }
</script>

<Alert content={alertContent} display={alertDisplay}/>

<div class="articleForm">
    <h2 class="title">Přidání maturitního shrnutí</h2>
    <button on:click={() => window.location.href = "/maturita/article/create"}>Pro přidání shrnutí díla přejdi sem</button>

</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
    .articleForm {
        font-family: 'Montserrat', sans-serif;
        border-radius: 1vmin;
        background-color: #082032;
        display: flex;
        justify-content: left;
        align-items: center;
        width: 90%;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
        gap: 20px;
        position: relative;
    }

    .articleForm input, button {
        padding: 10px;
        background-color: black;
        border: none;
        color: white;
        border: 2px solid white;
        border-radius: 5px;
    }

    .articleForm button {
        font-family: 'Montserrat', sans-serif;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #334756;
        transition: 0.25s;
    }

    .articleForm button:hover {
        opacity: 0.8;
        transition: 0.25s;
        cursor: pointer;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .articleForm {
            flex-direction: column;
            gap: 15px;
        }
    }

    @media screen and (min-width: 800px) and (max-width: 1400px) {
        .articleForm {
            gap: 7px;
        }
        .articleForm h2 {
            font-size: 14px;
        }
    }

</style>