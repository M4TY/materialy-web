<script>
	import Navbar from '../components/Navbar.svelte';
	import { onMount } from 'svelte';
	let users = [];
	function fetchdata() {
		fetch('https://api.github.com/repos/M4TY/zapisky/contributors')
			.then((res) => res.json())
			.then((data) => (users = [...data]));
	}

	onMount(fetchdata);

	function open(link) {
		window.open(link);
	}
</script>

<Navbar />

<div class="wrapper">
	{#each users as user, i}
		<div class="slot">
			<div class="pfp">
				<img on:click={open('https://github.com/' + user.login)} src={user.avatar_url} alt="PFP" />
			</div>
			<div class="text">
				<p class="index">no. {i + 1}</p>
				<p class="name">{user.login}</p>
				<p class="contributions">{user.contributions} contributions</p>
			</div>
		</div>
	{/each}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.wrapper {
		margin-top: 20px;
		height: 90vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
	}
	.slot {
		font-family: 'Montserrat', sans-serif;
		display: flex;
		color: white;
		justify-content: space-between;
		align-items: center;
		width: 60%;
	}

	.slot img {
		height: 128px;
		border-radius: 50%;
		transition: all 0.25s;
	}

	.slot img:hover {
		cursor: pointer;
		opacity: 0.7;
		transition: all 0.25s;
	}
	.text {
		display: flex;
		width: 80%;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	@media screen and (min-width: 320px) and (max-width: 800px) {
		.slot img {
			height: 64px;
			border-radius: 50%;
		}
		.text {
			width: 100%;
			font-size: 12px;
		}
	}
</style>
