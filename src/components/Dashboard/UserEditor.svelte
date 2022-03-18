<script>
    import {token} from "../../stores/store.js";
    import axios from "axios";
    import {onMount} from "svelte";

    let users = [];

    function fetchData() {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        axios.get(
            "https://api-materialy.matyashimmer.eu/users/all",
            config
        ).then((res) => {
            return res.data
        }).then((data) => {
            users = data;
            users = users;
        });
    }

    function updateUser(user) {
        const config = {
            headers: {Authorization: `Bearer ${$token}`}
        };
        axios.patch(
            "https://api-materialy.matyashimmer.eu/users/updateUser",
            user,
            config
        ).then((res) => {
            console.log(res)
        })
    }

    onMount(fetchData)
</script>

<div class="userForm">
    <p>Správa uživatel</p>
    <div class="users">
        {#each users as user, i}
            <div class="user">
                <input type="text" bind:value={user.name}>
<!--                <input type="text" bind:value={user.group}>-->
                <select bind:value={user.group}>
                    <option>USER</option>
                    <option>EDITOR</option>
                    <option>EDITOR+</option>
                    <option>ADMIN</option>
                </select>
                <input type="text" bind:value={user.email}>
                <button on:click={() => updateUser(user, i)}>Aktualizovat</button>
            </div>
        {/each}
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');

    .userForm {
        font-family: 'Montserrat', sans-serif;
        border-radius: 1vmin;
        background-color: #082032;
        display: flex;
        justify-content: left;
        align-items: center;
        width: 90%;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
        gap: 20px;
    }

    .userForm input, select, button {
        padding: 10px;
        background-color: black;
        border: none;
        color: white;
        border: 2px solid white;
        border-radius: 5px;
    }

    .userForm button {
        font-family: 'Montserrat', sans-serif;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #334756;
        transition: 0.25s;
    }

    .userForm button:hover {
        opacity: 0.8;
        transition: 0.25s;
        cursor: pointer;
    }

    .user {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

</style>