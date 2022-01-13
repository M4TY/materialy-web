<script>
    import { onMount } from "svelte";

    import { page } from "./store.js";

    let pageData = "";

    function fetchData() {
        fetch($page)
            .then((response) => response.text())
            .then((data) => (pageData = data));
    }

    onMount(fetchData);
</script>

<div class="wrapper">
    <iframe srcdoc="<html>{pageData}</html>" title="view" frameborder="0" />
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
    .wrapper iframe {
        width: 100%;
        height: 100%;
        background-color: rgb(76, 82, 101);
    }
</style>
