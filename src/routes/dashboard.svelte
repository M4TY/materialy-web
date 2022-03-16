<script>
    import Navbar from '../components/Navbar.svelte';
    import LoginForm from "../components/LoginForm.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import axios from "axios";
    import { token } from '../stores/store.js';
    import {onMount} from "svelte";

    let loggedIn = true;
    let show = false;

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
        <LoginForm/>
    {:else}
        <Dashboard/>
    {/if}
{/if}


