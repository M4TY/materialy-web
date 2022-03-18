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

    function sendEvent() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        if (eventName === undefined || eventSubject === undefined || eventDue === undefined) {
            showAlert("You have to fill all the fields")
            return;
        }
        const bodyParameters = {
            name: eventName,
            subject: eventSubject,
            due: eventDue
        };

        axios.post(
            "https://api-materialy.matyashimmer.eu/events/new",
            bodyParameters,
            config
        ).then((data) => {
            showAlert("Successfully added event")
            eventName = "";
            eventSubject = "";
            eventDue = "";
        });
    }
</script>

<Alert content={alertContent} display={alertDisplay}/>
<div class="eventForm">
    <h2 class="title">Přidání události</h2>
    <input bind:value={eventName} type="text" placeholder="Název události">
    <input bind:value={eventSubject} type="text" placeholder="Předmět události">
    <input bind:value={eventDue} type="date" placeholder="Datum">
    <button on:click={() => sendEvent() }>Odeslat</button>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
    .eventForm {
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

    .eventForm input, button {
        padding: 10px;
        background-color: black;
        border: none;
        color: white;
        border: 2px solid white;
        border-radius: 1vmin;
    }

    .eventForm button {
        font-family: 'Montserrat', sans-serif;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #334756;
        transition: 0.25s;
    }

    .eventForm button:hover {
        opacity: 0.8;
        transition: 0.25s;
        cursor: pointer;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .eventForm {
            flex-direction: column;
            gap: 15px;
        }
    }

    @media screen and (min-width: 800px) and (max-width: 1400px) {
        .eventForm {
            gap: 7px;
        }
        .eventForm h2 {
            font-size: 14px;
        }
    }

</style>