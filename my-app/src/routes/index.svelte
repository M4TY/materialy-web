<script>
	import Navbar from '../components/Navbar.svelte';
	import Card from '../components/Card.svelte';
</script>

<Navbar notesActive="active" />
<div class="content">
	<Card>
		<p>aa</p>
	</Card>
</div>

<style>
	.content {
		background-color: white;
		width: 100%;
	}
</style>
