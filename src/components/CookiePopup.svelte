<script>
	import { cookies } from '../stores/store.js';
	let popup;
	function Close() {
		cookies.set('true');
		popup.style.display = 'none';
	}
</script>

<div bind:this={popup} class="wrapper">
	<p>Tato stránka využívá službu Google Analytics, jejím používáním souhlasíte s jejími <a href="https://marketingplatform.google.com/about/analytics/terms/cz/">podmínkami</a>.</p>
	<button on:click={Close}>OK</button>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.wrapper {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 5%;
		background-color: rgba(29, 29, 29, 0.9);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.wrapper p {
		font-family: 'Montserrat', sans-serif;
		color: white;
		margin-left: 10px;
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

	@media screen and (min-width: 320px) and (max-width: 800px) {
		.wrapper p {
			font-size: 12px;
		}
		.wrapper button {
			font-size: 10px;
			margin-right: 10px;
		}
	}
</style>
