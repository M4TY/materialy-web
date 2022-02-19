<script>
	export let title;
	export let subject;
	export let link;

	function onClick() {
		window.open('/note?link=' + link, '_self');
	}
</script>

<div on:click={onClick} class="card">
	<section class="top">
		<h2>{title}</h2>
	</section>
	<section class="bottom">
		<p>{subject}</p>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.card {
		font-family: 'Montserrat', sans-serif;
		background-color: #334756;
		width: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-radius: 1vmin;
		transition: 0.25s;
	}
	.card:hover {
		transform: scale(1.05);
		transition: 0.25s;
	}

	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.top h2 {
		color: white;
		font-weight: bold;
		font-size: 23px;
		margin: 30px;
	}
	.bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		background-color: #082032;
		border-bottom-left-radius: 1vmin;
		border-bottom-right-radius: 1vmin;
	}
	.bottom p {
		margin: 10px;
		color: rgb(185, 185, 185);
	}
</style>
