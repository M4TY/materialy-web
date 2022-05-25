<script>
    import {page} from '$app/stores';
    import axios from 'axios';
    import Navbar from "../../../components/Navbar.svelte";
    import {onMount} from "svelte";

    const slug = $page.params.slug;
    const url = "https://api-materialy.matyashimmer.eu/articles/specific/" + slug;
    ///
    let article = [];
    let fetched = false;

    onMount(async () => {
        const response = await axios.get(url);
        article = response.data[0]
        fetched = true;
    });


</script>
<Navbar/>
{#if fetched}
    <main>
        <div class="content-wrapper">
            <section class="info">
                <h1>{article.title}</h1>
                <p>{article.originalAuthor}</p>
            </section>
            <hr>
            <pre class="contentText">{article.content}</pre>
            <hr>
            <section class="infoBottom">
                <p>{article.author}</p>
                <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
            </section>
        </div>
    </main>
{/if}


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

    main {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .content-wrapper {
        margin-top: 20px;
        margin-bottom: 20px;
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

    .info, .infoBottom {
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
        .content-wrapper h1 {
            font-size: 0.8rem;
        }
        .content-wrapper pre {
            font-size: 0.8rem;
        }
        .content-wrapper p {
            font-size: 0.8rem;
        }

        .info {
            justify-content: space-around;
            align-items: center;
            margin-bottom: 10px;
        }
        .infoBottom {
            width: 90%;
            margin-top: 10px;
        }
    }
</style>