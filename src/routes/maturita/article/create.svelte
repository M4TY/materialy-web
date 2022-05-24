<script>
    import axios from 'axios';
    import Navbar from "../../../components/Navbar.svelte";
    import {token} from "../../../stores/store.js";
    import {onMount} from "svelte";

    let me = [];
    function auth() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };

        axios.get(
            'https://api-materialy.matyashimmer.eu/users/me',
            config
        ).then((data) => {
            me = data.data;
        });
    }

    onMount(auth)

</script>
<Navbar/>
    <main>
        <div class="content-wrapper">
            <section class="info">
                <input placeholder="Nadpis">
                <input placeholder="Autor díla">
            </section>
            <hr>
            <textarea placeholder="Text článku"></textarea>
            <hr>
            <section class="info">
                <input readonly bind:value={me.name}>
                <input readonly value={new Date().toLocaleString("cs-cz")}>
            </section>
        </div>
    </main>


<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

  main {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .content-wrapper {
    margin-top: 20px;
    background-color: #191919;
    box-shadow: 0px 0px 10px 0px rgba(122, 97, 97, 0.75);
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    text-align: justify;
    border-radius: 1vmin;
  }

  .content-wrapper pre {
    font-size: 1rem;
    white-space: pre-wrap;
  }

  .content-wrapper h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .content-wrapper hr {
    width: 80%;

    border: 0;
    height: 1px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0));

  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 97%;
  }

  .contentText {
    line-height: 1.4rem;
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px

  }

</style>