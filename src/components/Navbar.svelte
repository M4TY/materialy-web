<script>
	export let notesActive = '';
	export let quizzesActive = '';
	export let eventsActive = '';
	export let profileActive = '';

	function open() {
		window.location.href = "/dashboard"
	}
</script>

<nav>
	<div class="buttons">
		<a class={notesActive} href="/">Zápisky</a>
		<a class={quizzesActive} href="/kvizy">Kvízy</a>
		<a class={eventsActive} href="/events">Události</a>
	</div>
	<div class="profile {profileActive}" on:click={open}>
		<img src="https://icon-library.com/images/profile-icon-white/profile-icon-white-6.jpg" alt="">
	</div>
</nav>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	nav {
		background-color: #000000;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid rgb(25, 27, 27);
		position: relative;
	}

	.buttons {
		font-family: 'Montserrat', sans-serif;
		background-color: #000000;
		width: 50vw;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin: 5px;
	}
	.buttons a {
		margin-top: 10px;
                margin-bottom: 10px;
		color: white;
		text-decoration: none;
		font-size: 30px;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Old versions of Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

		transition: all 0.25s;
	}

	.profile {
		position: absolute;
		right: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.25s;
	}
	.profile active {
		opacity: 0.6;
	}

	.profile:hover {
		cursor: pointer;
		opacity: 0.8;
		transition: 0.25s;
	}
	.profile img {
		height: 32px;
	}
	.buttons a:hover {
		opacity: 0.7;
		transition: all 0.25s;
	}
	.active {
		opacity: 0.6;
	}
</style>
