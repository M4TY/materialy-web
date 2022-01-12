<script>
    import { onMount } from "svelte";
    import { compute_slots } from "svelte/internal";
    let temp = [];
    $: notes = [];

    function fetchData() {
        fetch(
            "https://api.github.com/repos/M4TY/zapisky/git/trees/main?recursive=1"
        )
            .then((response) => response.json())
            .then((data) => {
                temp = data.tree;
                filterData(temp);
            });
    }

    onMount(fetchData);
    function filterData(data) {
        data.forEach((element) => {
            if (element.path.endsWith(".html")) {
                notes.push(element);
                console.log(element);
                console.log(notes.length);
            }
        });
    }
</script>

<div class="grid-wrapper">
    {#each notes as note}
        <p>{note}</p>
    {/each}
</div>

<style>
    .grid-wrapper {
        width: 100%;
        height: 94%;
        background-color: tomato;
    }
</style>
