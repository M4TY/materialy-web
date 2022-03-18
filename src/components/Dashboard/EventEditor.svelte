<script>
    import {token} from "../../stores/store.js";
    import axios from "axios";
    import {onMount} from "svelte";

    let events = [];

    function fetchData() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        axios.get(
            "https://api-materialy.matyashimmer.eu/events/all",
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

        })
    }

    onMount(fetchData)
</script>

<div class="eventForm">
    <p>Správa událostí</p>
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
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }


</style>