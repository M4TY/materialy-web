<script>
	import Question from '../components/Question.svelte';
	import { onMount } from 'svelte';
	let link;
	let source = [];
	onMount(() => {
		let temp = window.location.search;
		let splitted = temp.split('=');
		link = splitted[1];
		fetchData();
	});

	function fetchData() {
		fetch(link)
			.then((res) => res.json())
			.then((data) => (source = data));
	}
</script>

{#each source as item, i}
	{#if i === 0}
		<p>{item.subject}</p>
		<p>{item.theme}</p>
	{:else}
		<Question index={i} question={item.question} answer={item.answer} />
	{/if}
{/each}
