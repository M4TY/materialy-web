<script>
    import axios from 'axios';
    import Navbar from "../../../components/Navbar.svelte";
    import {token} from "../../../stores/store.js";
    import {onMount} from "svelte";

    import Alert from "../../../components/Alert.svelte";

    let alertContent;
    let alertDisplay;
    let active = true;

    function showAlert(content) {
        alertContent = content;
        alertDisplay = "flex";

        setTimeout(() => {
            alertDisplay = "none";
        }, 3000);
    }


    let me = [];

    function auth() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };

        axios.get(
            'https://api-materialy.matyashimmer.eu/users/me',
            config
        ).then((data) => {
            me = data.data;
        });
    }


    let title;
    let content;
    let originalAuthor;
    let visible;

    async function createArticle() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };

        console.log("visible: " + visible);
        let response = await axios.post(
            'https://api-materialy.matyashimmer.eu/articles/new',
            {
                title: title,
                content: content,
                originalAuthor: originalAuthor,
                author: me.name,
                visible: visible
            },
            config
        )

        if (response.status === 201) {
            showAlert('Článek byl úspěšně vytvořen');
            setTimeout(() => {
                window.location.href = "/maturita"
            }, 3000);
        }
    }

    onMount(auth)

</script>
<Alert content={alertContent} display={alertDisplay}/>
<Navbar/>
<main>
    <div class="content-wrapper">
        <section class="info">
            <input bind:value={title} placeholder="Nadpis">
            <input bind:value={originalAuthor} placeholder="Autor díla">
        </section>
        <hr>
        <textarea bind:value={content} placeholder="Text článku"></textarea>
        <hr>
        <section class="info">
            <input readonly bind:value={me.name}>
            <section>
                <label for="visible">Veřejné</label>
                <input name="visible" type="checkbox" bind:checked={visible}>
            </section>
            <input readonly value={new Date().toLocaleString("cs-cz")}>
        </section>
    </div>
    <section class="contain">
        <button on:click={createArticle}>Odeslat</button>
    </section>
</main>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

    main {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        flex-direction: column;
        gap: 20px;
    }

    .contain {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .content-wrapper {
        margin-top: 20px;
        background-color: #191919;
        box-shadow: 0px 0px 10px 0px rgba(122, 97, 97, 0.75);
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        text-align: justify;
        border-radius: 1vmin;
    }

    .content-wrapper pre {
        font-size: 1rem;
        white-space: pre-wrap;
    }

    .content-wrapper h1 {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .content-wrapper hr {
        width: 80%;

        border: 0;
        height: 1px;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));

    }

    .content-wrapper input, select, button, textarea {
        padding: 10px;
        background-color: black;
        border: none;
        color: white;
        border: 2px solid white;
        border-radius: 5px;
    }

    .content-wrapper button {

    }

    .contain button:hover {
        background-color: #191919;
        color: white;
        cursor: pointer;
    }

    .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 97%;
    }

    .contentText {
        line-height: 1.4rem;
        width: 90%;
        margin-top: 10px;
        margin-bottom: 10px

    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .content-wrapper {
            width: 90%;
        }

        .content-wrapper input, select, button, textarea {
            padding: 5px;
            background-color: black;
            border: none;
            color: white;
            border: 2px solid white;
            border-radius: 5px;
        }
        .contain {
            width: 90%;
        }
    }
</style>