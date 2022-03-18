<script>
    import Navbar from "../components/Navbar.svelte";
    import axios from "axios";
    import ContentCard from "../components/ContentCard.svelte"
    import {onMount} from "svelte";
    let activeEvents = [];
    function fetchData() {
        axios.get("https://api-materialy.matyashimmer.eu/events/active").then((res) => res.data).then((data) => {
            filterData(data);
        });
    }

    function filterData(data) {
        data.forEach(element => {
            let newObject = {
                name: element.name,
                subject: element.subject,
                due: (new Date(element.due)).toLocaleDateString()
            }

            activeEvents.push(newObject);

        })

        activeEvents = activeEvents;
    }
    onMount(fetchData)

</script>
<Navbar eventsActive="active"/>
<div class="wrapper">
<div class="cards">
    {#each activeEvents as event}
        <ContentCard title="{event.name}" subject="{event.subject}" due="{event.due}"></ContentCard>
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
        gap: 20px;
    }
</style>