<script>
    import {token} from "../../stores/store.js";
    import axios from "axios";
    import {onMount} from "svelte";
    import Alert from "../Alert.svelte";

    let events = [];

    let alertContent;
    let alertDisplay;
    let active = true;
    function showAlert(content) {
        alertContent = content;
        alertDisplay = "flex";

        setTimeout(() => {  alertDisplay = "none"; }, 3000);
    }

    function fetchData() {
        let url;
        if(active) {
            url = "https://api-materialy.matyashimmer.eu/events/active";
        }  else {
            url = "https://api-materialy.matyashimmer.eu/events/all"
        }
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        axios.get(
            url,
            config
        ).then((res) => {
            return res.data
        }).then((data) => {
            events = data;
            events = events;
        });
    }

    function updateEvent(event) {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        axios.patch(
            "https://api-materialy.matyashimmer.eu/events/updateEvent",
            event,
            config
        ).then((res) => {
            showAlert("Událost byla úspěšně přidána")
            fetchData()
        })
    }

    function deleteEvent(event) {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        axios.post(
            "https://api-materialy.matyashimmer.eu/events/deleteEvent",
            event,
            config
        ).then((res) => {
            showAlert("Událost byla úspěšně odebrána")
            fetchData()
        })
    }

    onMount(fetchData)
</script>

<Alert content={alertContent} display={alertDisplay}/>
<div class="eventForm">
    <p>Správa událostí</p>
    <input type="checkbox" id="activeCheck" bind:checked={active} on:change={() => fetchData()}>
    <div class="events">
        {#each events as event, i}
            <div class="event">
                <input type="text" bind:value={event.name}>
                <input type="text" bind:value={event.subject}>
                <input type="text" bind:value={event.due}>
                <button on:click={() => updateEvent(event, i)}>Aktualizovat</button>
                <button on:click={() => deleteEvent(event, i)}>Odstranit</button>
            </div>
        {/each}
    </div>
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
    }

    .eventForm input, select, button {
        padding: 10px;
        background-color: black;
        border: none;
        color: white;
        border: 2px solid white;
        border-radius: 5px;
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

    .event {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    .events {
        gap: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .eventForm {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .event {
            flex-direction: column;
            gap: 10px;
        }
    }
</style>