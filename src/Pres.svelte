<script>
  import { onMount } from "svelte";
  import { pdf } from "./store.js";
  import Navbar from "./components/Navbar.svelte";

  console.log($pdf);
</script>

<div class="wrap">
  <Navbar />
  <div class="flexWrapper">
    <iframe
      src="https://github.com/M4TY/zapisky/blob/main/Čeština/ivona.vitova_2021-12-03_09-47-27.pdf"
      title="view"
      frameborder="0"
    />
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
