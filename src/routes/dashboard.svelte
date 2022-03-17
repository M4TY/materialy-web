<script>
    import Navbar from '../components/Navbar.svelte';
    import LoginForm from "../components/LoginForm.svelte";
    import RegisterForm from "../components/RegisterForm.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import axios from "axios";
    import { token } from '../stores/store.js';
    import {onMount} from "svelte";

    let loggedIn = true;
    let show = false;

    let registerScreen = false;
    onMount(checkLogIn)

    function checkLogIn() {
        if($token === "false") {
            loggedIn = false;

        } else {
            loggedIn = true;
        }

        show = true
    }
</script>

<Navbar profileActive="active"/>
{#if show}
    {#if !loggedIn}
        {#if registerScreen}
            <RegisterForm bind:registerScreen={registerScreen}/>
        {:else}
            <LoginForm bind:registerScreen={registerScreen}/>
        {/if}
    {:else}
        <Dashboard/>
    {/if}
{/if}


