<script>
    import {token} from "../stores/store.js"
    import {onMount} from "svelte";
    import axios from "axios";
    import EventCreation from "./Dashboard/EventCreation.svelte";
    import UserEditor from "./Dashboard/UserEditor.svelte";
    import EventEditor from "./Dashboard/EventEditor.svelte";
    import CodeEditor from "./Dashboard/CodeEditor.svelte";

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

    function logout() {
        token.set("");
        window.location.reload();
    }

    onMount(auth)
</script>

<div class="wrapper">
    <div class="name">
        {#if me.name !== undefined}
            <div class="wrap">
                <p>Vítej, {me.name}.</p>
                <button on:click={logout} class="logout">Odhlásit se</button>
            </div>
        {/if}
    </div>

    {#if loaded}
        {#if me.group !== "USER"}
            <EventCreation/>
        {:else}
            <p>Vypadá to že nemáš práva na žádné akce. Pokud si myslíš, že se jedná o omyl, kontaktuj mě.</p>
        {/if}
        {#if me.group === "ADMIN"}
            <UserEditor/>
            <EventEditor/>
            <CodeEditor/>
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
        margin-bottom: 30px;
    }

    .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .wrap button {
        padding: 5px;
        border: 2px solid white;
        border-radius: 5px;
        background-color: black;
        color: white;
        transition: 0.25s
    }

    .wrap button:hover {
        opacity: 0.8;
        transition: 0.25s;
        cursor: pointer;
    }

    .name {
        width: 90%;
    }

    .name p {
        font-size: 24px;
    }

    .wrapper input, button {
        font-family: 'Montserrat', sans-serif;
    }

</style>