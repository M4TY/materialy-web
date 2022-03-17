<script>
    import axios from "axios";
    import {token} from "../stores/store.js";

    let email;
    let password;
    let name;
    export let registerScreen;

    async function submit() {
        if (email === undefined || password === undefined || name === undefined) {
            alert("You have to fill all of the fields")
            return;
        }
        axios.post("https://api-materialy.matyashimmer.eu/users/register", {
            email: email,
            password: password,
            name: name
        }).then((res) => {

            if (!res.data.token) {
                alert(res.data);
            } else {
                token.set(res.data.token)
                window.location.href = "/dashboard"
            }
        })

    }
</script>

<div class="wrapper">
    <div class="registerForm">
        <input bind:value={name} type="text" name="name" placeholder="Jméno">
        <input bind:value={email} type="email" placeholder="Email">
        <input bind:value={password} type="password" name="password" placeholder="Heslo">
        <a on:click={() => registerScreen = false} class="register">Už máte účet? <span>Přihlásit se</span></a>
        <button name="" id="" value="Login" on:click={submit}>Registrovat</button>
    </div>
</div>

<style>
    .wrapper {
        font-family: 'Montserrat', sans-serif;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }
    .registerForm {
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
    .registerForm input {
        font-family: 'Montserrat', sans-serif;
        color: white;
        background-color: black;
        border: 2px solid white;
        border-radius: 1vmin;
        padding: 10px;
        width: 80%;
    }
    .registerForm a{
        color: white;
        user-select: none;
    }
    .registerForm a span {
        text-decoration: underline;
        cursor: pointer;
    }
    .registerForm button {
        width: 40%;
        padding: 10px;
        background-color: #082032;
        border: 2px solid white;
        color: white;
        border-radius: 1vmin;
        transition: 0.25s;
    }

    .registerForm button:hover {
        opacity: 0.8;
        transition: 0.25s;
        cursor: pointer;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .registerForm {
            width: 80%;
        }
    }

    @media screen and (min-width: 800px) and (max-width: 1400px) {
        .registerForm {
            width: 40%;
        }
    }
</style>