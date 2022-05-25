<script>
    import {token} from "../../../../stores/store.js";
    import {page} from '$app/stores';
    import axios from 'axios';
    import Navbar from "../../../../components/Navbar.svelte";
    import Alert from "../../../../components/Alert.svelte";
    import {onMount} from "svelte";

    let alertContent;
    let alertDisplay;

    function showAlert(content) {
        alertContent = content;
        alertDisplay = "flex";

        setTimeout(() => {
            alertDisplay = "none";
        }, 3000);
    }

    const slug = $page.params.slug;
    const url = "https://api-materialy.matyashimmer.eu/articles/specific/" + slug;
    ///
    let article = [];
    let fetched = false;

    onMount(async () => {
        auth();
    });


    async function fetchData() {
        const response = await axios.get(url);
        article = response.data[0]
        if(article.author !== me.name) {
            window.location.href = "/maturita";
        }
        fetched = true;
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
            fetchData();
        });
    }

    async function updateArticle() {
        //bearer
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        const response = await axios.patch(url, {
            title: article.title,
            content: article.content,
            originalAuthor: article.originalAuthor
        }, config);

        console.log(response)

        if (response.status === 200) {
            showAlert("Article updated");
        } else if (response.status === 204) {
            showAlert("You are not authorized to edit this article");
            setTimeout(() => window.location.href = "/maturita/", 3000);
        } else {
            showAlert("Something went wrong");
        }
    }


</script>
<Alert content={alertContent} display={alertDisplay}/>
<Navbar/>
<main>
    {#if fetched}
        <div class="content-wrapper">
            <section class="info">
                <input bind:value={article.title} placeholder="Nadpis">
                <input bind:value={article.originalAuthor} placeholder="Autor díla">
            </section>
            <hr>
            <textarea bind:value={article.content} placeholder="Text článku"></textarea>
            <hr>
            <section class="info">
                <input readonly bind:value={article.author}>
                <input readonly value={article.publishedAt}>
            </section>
        </div>
        <section class="contain">
            <button on:click={updateArticle}>Odeslat</button>
        </section>
    {/if}
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

</style>