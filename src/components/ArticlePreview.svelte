<script>
	export let title;
	export let originalAuthor;
	export let author;
	export let slug;
	export let published;

	function onClick() {
		window.open('/maturita/article/' + slug, '_self');
	}
</script>

<div class="card">
	<section class="top">
		<h2>{title}</h2>
		<p>{originalAuthor}</p>
	</section>
	<section class="bottom">
		<section class="titles">
			<p>{author}</p>
			<p>{new Date(published).toLocaleDateString()}</p>
			<button on:click={onClick}>Přečíst >>></button>
		</section>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.card {
		font-family: 'Montserrat', sans-serif;
		background-color: #334756;
		width: 35%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		border-radius: 1vmin;
		transition: 0.25s;
		box-shadow: 0 0 10px rgb(51, 51, 51);
		height: 250px;
	}
	.card:hover {
		box-shadow: 0 0 25px rgb(51, 51, 51);
		transition: 0.25s;
	}

	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 60%;
		gap: 10px;
		flex-direction: column;
	}
	.top h2 {
		color: white;
		font-weight: bold;
		font-size: 35px;
		text-align: center;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.top p {
		color: rgb(185, 185, 185);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		width: 100%;
		background-color: #082032;
		border-bottom-left-radius: 1vmin;
		border-bottom-right-radius: 1vmin;
		height: 30%;
	}
	.bottom p {
		color: rgb(185, 185, 185);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		white-space: nowrap;
	}
	.bottom button {
		background: none;
		border: none;
		text-decoration: underline;
		color: rgb(185, 185, 185);
		cursor: pointer;
		transition: 0.25s;
	}

	.bottom button:hover {
		color: white;
	}

	.bottom .titles {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		flex-direction: row;
		gap: 10px;
	}
	@media screen and (min-width: 320px) and (max-width: 800px) {
		.card {
			width: 300px;
			height: 190px;
			border-radius: 2vmax;
		}
		.bottom {
			border-bottom-left-radius: 2vmax;
			border-bottom-right-radius: 2vmax;
		}
		.top h2 {
			font-size: 16px;
			margin: 5px;
		}

		.bottom {
			font-size: 14px;
		}

		.titles button {
			font-size: 13px;
		}
	}
</style>
