<script>
    import axios from "axios";
    import {token} from "../stores/store.js";
    import Alert from "./Alert.svelte";
    import {onMount} from "svelte";

    export let email;
    let code;
    let codeInput;
    let sendButton;

    export let registerScreen = false;

    let alertContent;
    let alertDisplay;
    function showAlert(content) {
        alertContent = content;
        alertDisplay = "flex";

        setTimeout(() => {  alertDisplay = "none"; }, 3000);
    }

    function mount() {
        codeInput.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                sendButton.click();
            }
        });
    }


    async function submit() {
        if (code === undefined) {
            showAlert("Vyplňte prosím všechny položky")
            return;
        }
        axios.post("https://api-materialy.matyashimmer.eu/users/2fa", {
            email: email,
            code: code
        }).then((res) => {

            if (!res.data.token) {
                showAlert(res.data);
            } else {
                token.set(res.data.token)
                window.location.href = "/dashboard"
            }
        })
    }

    onMount(mount);
</script>

<Alert content={alertContent} display={alertDisplay}/>
<div class="wrapper">
    <div class="loginForm">
        <input bind:this={codeInput} bind:value={code} type="number" placeholder="Verifikační kód">
        <button bind:this={sendButton} name="" id="" value="Login" on:click={submit}>Ověřit</button>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
    .wrapper {
        font-family: 'Montserrat', sans-serif;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }

    .loginForm {
        background: #082032;
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        padding: 30px;
        width: 20%;
        border-radius: 1vmin;
    }
    .loginForm input {
        font-family: 'Montserrat', sans-serif;
        color: white;
        background-color: black;
        border: 2px solid white;
        border-radius: 1vmin;
        padding: 10px;
        width: 80%;
    }
    .loginForm a{
        color: white;
        user-select: none;
    }
    .loginForm a span {
        text-decoration: underline;
        cursor: pointer;
    }
    .loginForm button {
        width: 40%;
        padding: 10px;
        background-color: #082032;
        border: 2px solid white;
        color: white;
        border-radius: 1vmin;
        transition: 0.25s;
    }

    .loginForm button:hover {
        opacity: 0.8;
        transition: 0.25s;
        cursor: pointer;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .loginForm {
            width: 80%;
        }
    }

    @media screen and (min-width: 800px) and (max-width: 1400px) {
        .loginForm {
            width: 40%;
        }
    }
</style>