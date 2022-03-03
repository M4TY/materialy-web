<script>
	export let index;
	export let question;
	export let answer;

	function removeButton() {}
</script>

<div class="wrapper">
	<p>{index}</p>
	<input type="text" value={question} />
	<textarea type="text" value={answer} />
	<button>🗑️</button>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
	.wrapper {
		padding-top: 10px;
		padding-bottom: 10px;
		font-family: 'Montserrat', sans-serif;
		background-color: white;
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 10px;
		position: relative;
	}
	input {
		font-family: 'Montserrat', sans-serif;
	}
	textarea {
		font-family: 'Montserrat', sans-serif;
	}
	button {
		position: absolute;
		right: 5px;
	}
</style>
