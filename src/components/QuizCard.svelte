<script>
    import {token} from "../stores/store.js";
    import axios from "axios";
    import {onMount} from "svelte";

    export let title;
    export let subject;

    export let link;

    let me = [];
    let loaded = false;

    function onClick() {
        window.open('/editQuiz?quiz=' + link, '_self');
    }

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

    onMount(auth)
</script>

<div class="card">
    {#if loaded}
        {#if me.group !== "USER" && me.group !== "EDITOR" && me.group}
            <button on:click={onClick}>Edit</button>
        {/if}
    {/if}
    <section class="top">
        <h2>{title}</h2>
    </section>
    <section class="bottom">
        <p>{subject}</p>
    </section>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

    .card {
        font-family: 'Montserrat', sans-serif;
        background-color: #334756;
        width: 200px;
        height: 150px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        border-radius: 1vmin;
        transition: 0.25s;
        box-shadow: 0 0 10px rgb(51, 51, 51);
        position: relative;
    }

    button {
        font-family: 'Montserrat', sans-serif;
        position: absolute;
        right: 0;
        border: none;
        box-shadow: none;
        color: rgb(0, 0, 0);
        font-size: 16px;
        border-top-right-radius: 1vmin;
    }

    button:hover {
        cursor: pointer;
    }

    .card:hover {
        transform: scale(1.05);
        transition: 0.25s;
        cursor: pointer;
    }

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60%;
    }

    .top h2 {
        color: white;
        font-weight: bold;
        font-size: 23px;
        margin: 30px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .bottom {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        background-color: #082032;
        border-bottom-left-radius: 1vmin;
        border-bottom-right-radius: 1vmin;
        height: 30%;
    }

    .bottom p {
        margin: 10px;
        color: rgb(185, 185, 185);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .card {
            height: 75px;
            width: 100px;
        }

        .top h2 {
            font-size: 12px;
            margin: 0px;
        }

        .bottom p {
            font-size: 10px;
            margin: 10px;
        }

        button {
            display: none;
        }
    }
</style>
