<script>
    import { versionSeen } from '../stores/store.js';
    let popup;
    let blur;
    function Close() {
        versionSeen.set('3.0.1b1');
        popup.style.display = 'none';
        blur.style.display = 'none';
    }
</script>

<section class="blur" bind:this={blur}></section>
<div bind:this={popup} class="wrapper">
    <h1>Nová verze webu je tu! <br> Co je nového?</h1>
    <ol>
        <li>Přidání maturitního tabu, kde lze vložit vlastní shrnutí děl</li>
        <li>Přidán systém pro registraci a příhlášení uživatel</li>
    </ol>
    <button on:click={Close}>OK</button>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
    .wrapper {
        position: fixed;
        bottom: 25%;
        left: 25%;
        width: 50%;
        height: 50%;
        background-color: rgba(29, 29, 29, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .blur {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(29, 29, 29, 0.9);
    }

    .wrapper p {
        font-family: 'Montserrat', sans-serif;
        color: white;
        margin-left: 10px;
    }

    .wrapper h1 {
        text-align: center;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-size: 2em;
    }

    .wrapper ol {
        list-style-type: disc;
        margin-left: 10px;
        font-family: 'Montserrat', sans-serif;
        color: white;
    }
    .wrapper button {
        margin-right: 10px;
        background: none;
        color: white;
        border: 1px solid white;
        font-size: 18px;
        width: 10%;
        transition: 0.25s;
    }
    .wrapper button:hover {
        cursor: pointer;
        background: gray;
        transition: 0.25s;
    }

    .wrapper a {
        color: rgb(172, 154, 240);
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .wrapper {
            width: 90%;
            left: 5%;
        }
        .wrapper ol {
            width: 80%;
        }
        .wrapper p {
            font-size: 12px;
        }
        .wrapper button {
            font-size: 10px;
            margin-right: 10px;
        }
    }
</style>
