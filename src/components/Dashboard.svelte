<script>
    import {token} from "../stores/store.js"
    import {onMount} from "svelte";
    import axios from "axios";

    let me = [];
    let loaded = false;
    let eventName, eventSubject, eventPriority, eventDue;

    function auth() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };

        axios.get(
            'https://api-materialy.matyashimmer.eu/users/me',
            config
        ).then((data) => {
            me = data.data;
            loaded = true;
        });
    }

    function sendEvent() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        if (eventName === undefined || eventSubject === undefined || eventDue === undefined) {
            alert("You have to fill all of the fields")
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
            alert("Successfully added event")
            eventName = "";
            eventSubject = "";
            eventDue = "";
        });
    }

    onMount(auth)
</script>

<div class="wrapper">
    <div class="name">
        {#if me.name !== undefined}
        <p>Vítej, {me.name}.</p>
        {/if}
    </div>

    {#if loaded}
    {#if me.group !== "USER"}
        <div class="eventForm">
            <h2 class="title">Přidání události</h2>
            <input bind:value={eventName} type="text" placeholder="Název události">
            <input bind:value={eventSubject} type="text" placeholder="Předmět události">
            <input bind:value={eventDue} type="date" placeholder="Datum">
            <button on:click={() => sendEvent() }>Odeslat</button>
        </div>

    {/if}
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

    .wrapper {
        font-family: 'Montserrat', sans-serif;
        width: 100vw;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }

    .name {
        width: 90%;
    }

    .name p {
        margin-top: 20px;
        font-size: 24px;
    }

    .wrapper input, button {
        font-family: 'Montserrat', sans-serif;
    }

    .eventForm {
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

    .eventForm input {
        padding: 10px;
        background-color: black;
        border: none;
        color: white;
        border: 2px solid white;
        border-radius: 1vmin;
    }

    .eventForm button {
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
    }

</style>