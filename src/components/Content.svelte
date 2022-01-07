<script>
  import { page } from "../store.js";
</script>

<div class="wrapper">
  <iframe src={$page} frameborder="0" />
</div>

<style>
  .wrapper {
    width: 100%;
    height: 94%;
    background-color: tomato;
  }
  .wrapper iframe {
    width: 100%;
    height: 100%;
    background-color: tomato;
  }
</style>
