<script>
    import { onMount } from "svelte";
    import { compute_slots } from "svelte/internal";
    let temp = [];
    let notes = [];

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
                let splitted = element.path.split("/");

                let tempSubj = splitted[0];
                console.log(tempSubj);
                let tempName = splitted[1].split(".")[0];
                let tempLink =
                    "https://raw.githubusercontent.com/M4TY/zapisky/main/" +
                    element.path;

                let obj = {
                    subject: tempSubj,
                    name: tempName,
                    link: tempLink,
                };
                notes = [...notes, obj];
            }
        });
    }
</script>

<div class="grid-wrapper">
    {#each notes as note}
        <div class="card">
            <p>{note.name}</p>
            <p>{note.subject}</p>
            <p>{note.link}</p>
            <br />
        </div>
    {/each}
</div>

<style>
    .grid-wrapper {
        width: 100%;
        height: 94%;
        background-color: tomato;
    }
</style>
