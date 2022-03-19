<script>
	import {version} from "../stores/versioning.js";
</script>

<div class="wrapper">
	<a href="/halloffame">Síň slávy</a>
	<a href="https://github.com/M4TY/zapisky" target="_blank" rel="noopener">GitHub repo</a>
	<p>{version}</p>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.wrapper {
		position: relative;
		font-family: 'Montserrat', sans-serif;
		color: white;
		width: 100%;
		background-color: rgb(32, 32, 32);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}
	.wrapper a {
		color: rgb(204, 203, 203);
		font-size: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
		text-decoration: none;
		transition: all 0.25s;
	}

	.wrapper a:hover {
		opacity: 0.8;
		transition: all 0.25s;
	}

	.wrapper p {
		color: rgb(204, 203, 203);
		position: absolute;
		left: 13px;
		font-size: 14px;
	}
</style>
