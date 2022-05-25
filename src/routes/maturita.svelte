<script>
    import Navbar from '../components/Navbar.svelte';
    import {onMount} from 'svelte';
    import ArticlePreview from "../components/ArticlePreview.svelte";
    import axios from 'axios';
    let endpoint = 'https://api-materialy.matyashimmer.eu/articles/all';

    let data = [];

    async function getArticles() {
        const response = await axios.get(endpoint);
        data = response.data;
        data.sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
    }

    onMount(getArticles)

</script>
<Navbar maturitaActive="active"/>
<div class="container">
    {#each data as item}
        <ArticlePreview title={item.title} originalAuthor={item.originalAuthor} slug={item.slug} published={item.publishedAt} author={item.author}/>
    {/each}
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        padding-top: 40px;
        gap: 20px;
        flex-direction: column;
        align-items: center;
        padding-bottom: 40px;
    }
</style>
