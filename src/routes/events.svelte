<script>
    import Navbar from "../components/Navbar.svelte";
    import axios from "axios";
    import ContentCard from "../components/ContentCard.svelte"
    import {onMount} from "svelte";
    let activeEvents = [];
    function fetchData() {
        axios.get("https://api-materialy.matyashimmer.eu/events/active").then((res) => res.data).then((data) => activeEvents = data);
    }

    onMount(fetchData)

</script>
<Navbar eventsActive="active"/>
<div class="wrapper">
<div class="cards">
    {#each activeEvents as event}
        <ContentCard title="{event.name}" subject="{event.subject}" due="{(new Date(event.due)).toLocaleDateString()}"></ContentCard>
        {/each}
</div>
</div>

<style>
    .wrapper {
        width: 100vw;
        display: flex;
        justify-content: center;
    }
    .cards {
        padding-top: 20px;
    }
</style>