<script>
  import { onMount } from "svelte";
  import { page } from "./store.js";
  import Navbar from "./components/Navbar.svelte";

  let pageData = "";

  function fetchData() {
    fetch($page)
      .then((response) => response.text())
      .then((data) => (pageData = data));
  }

  onMount(fetchData);
</script>

<div class="wrap">
  <Navbar />
  <div class="flexWrapper">
    <iframe srcdoc="<html>{pageData}</html>" title="view" frameborder="0" />
  </div>
</div>

<style>
  .flexWrapper {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    background-color: rgb(255, 255, 255);
  }
  .flexWrapper iframe {
    width: 100%;
    height: 100%;
    background-color: rgb(38, 38, 38);
  }
  .wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
