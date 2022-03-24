<script>
    import Navbar from "../components/Navbar.svelte";
    import axios from "axios";
    import ContentCard from "../components/EventCard.svelte"
    import {onMount} from "svelte";
    let activeEvents = [];
    function fetchData() {
        axios.get("https://api-materialy.matyashimmer.eu/events/active").then((res) => res.data).then((data) => {
            filterData(data);
        });
    }

    function filterData(data) {
        data.forEach(element => {
            const firstDate = new Date().setHours(0);
            const secondDate = new Date(element.due);
            const diffDays = Math.round((secondDate-firstDate)/(1000*60*60*24));

            let inDays;
            if(diffDays === 0) {
                inDays = "dnes";
            } else if(diffDays === 1) {
                inDays = "zítra";
            } else if(diffDays > 1 && diffDays < 5) {
                inDays = "za " + diffDays + " dny";
            } else {
                inDays = "za " + diffDays + " dnů";
            }

            let newObject = {
                name: element.name,
                subject: element.subject,
                due: (new Date(element.due)).toLocaleDateString(),
                inDays: inDays
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
        <ContentCard title="{event.name}" subject="{event.subject}" due="{event.due}" inDays={event.inDays}></ContentCard>
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
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 70%;
    }
</style>
