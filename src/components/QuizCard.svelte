<script>
	export let title;
	export let subject;
</script>

<div class="card">
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
		height: 150px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		border-radius: 1vmin;
		transition: 0.25s;
		box-shadow: 0 0 10px rgb(51, 51, 51);
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
		height: 60%;
	}
	.top h2 {
		color: white;
		font-weight: bold;
		font-size: 23px;
		margin: 30px;
		text-align: center;
	}
	.bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		background-color: #082032;
		border-bottom-left-radius: 1vmin;
		border-bottom-right-radius: 1vmin;
		height: 30%;
	}
	.bottom p {
		margin: 10px;
		color: rgb(185, 185, 185);
	}

	@media screen and (min-width: 320px) and (max-width: 800px) {
		.card {
			height: 75px;
			width: 100px;
		}
		.top h2 {
			font-size: 12px;
			margin: 0px;
		}
		.bottom p {
			font-size: 10px;
			margin: 10px;
		}
	}
</style>
