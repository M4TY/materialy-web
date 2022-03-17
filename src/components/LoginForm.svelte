<script>
    import axios from "axios";
    import {token} from "../stores/store.js";

    let email;
    let password;
    let name;

    async function submit() {
        if(email === undefined || password === undefined || name === undefined) {
            alert("You have to fill all of the fields")
            return;
        }
        axios.post("https://api-materialy.matyashimmer.eu/users/login", {
            email: email,
            password: password,
            name: name
        }).then((res) => {

            if(!res.data.token) {
                alert(res.data);
            } else {
                token.set(res.data.token)
                window.location.href = "/dashboard"
            }
        })

    }
</script>

<div class="wrapper">
    <input bind:value={email} type="email" placeholder="Email">
    <input bind:value={password} type="password" name="password" placeholder="Heslo">
    <input bind:value={name} type="text" name="name" placeholder="Jméno">
    <button name="" id="" value="Login" on:click={submit}>Login</button>
</div>

<style>
    .wrapper {
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
    }
</style>