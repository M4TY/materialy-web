<script>
	import Navbar from '../components/Navbar.svelte';
	import Card from '../components/Card.svelte';
</script>

<Navbar notesActive="active" />
<div class="content">
	<Card title="Maj" subject="Čeština" link="http://google.com" />
</div>

<style>
	.content {
		margin-top: 20px;
		background-color: rgb(0, 0, 0);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}
</style>
