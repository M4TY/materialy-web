<script>
    import Navbar from '../components/Navbar.svelte';
    import LoginForm from "../components/LoginForm.svelte";
    import RegisterForm from "../components/RegisterForm.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import axios from "axios";
    import {token} from '../stores/store.js';
    import {onMount} from "svelte";
    import Alert from "../components/Alert.svelte";
    import CodeForm from "../components/CodeForm.svelte";

    let loggedIn = true;
    let show = false;
    let code;
    let email;

    let registerScreen = false;
    onMount(checkLogIn)

    let alertContent;
    let alertDisplay;

    function showAlert(content) {
        alertContent = content;
        alertDisplay = "flex";

        setTimeout(() => {
            alertDisplay = "none";
        }, 3000);
    }

    function checkLogIn() {
        showAlert("Z bezpečnostních důvodů byla resetovaná hesla ke všem účtům")
        if ($token === "false") {
            loggedIn = false;

        } else {
            const config = {
                headers: {Authorization: `Bearer ${$token}`}
            };
            axios.get(
                'https://api-materialy.matyashimmer.eu/users/me',
                config
            ).then((data) => {
                if (data.data === "Not found") {
                    loggedIn = false;
                } else {
                    loggedIn = true;
                }
            });
        }

        show = true
    }
</script>

<Navbar profileActive="active"/>
{#if show}
    {#if !loggedIn}
        {#if registerScreen}
            <RegisterForm bind:code={code} bind:email={email} bind:registerScreen={registerScreen}/>
            {#if code}
                <CodeForm bind:email={email}/>
            {/if}
        {:else}
            <LoginForm bind:code={code} bind:email={email} bind:registerScreen={registerScreen}/>
            {#if code}
                <CodeForm bind:email={email}/>
            {/if}
        {/if}
    {:else}
        <Dashboard/>
    {/if}
{/if}


