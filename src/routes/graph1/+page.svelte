<script>
	import Barchart from './Barchart.svelte';
	import data from './pop';
</script>

<h1>Bar Chart</h1>

<p>
	Graph created by following the
	<a href="https://blog.logrocket.com/data-visualization-svelte-d3/"
		>Data visualization with Svelte and D3</a
	>
	article.
</p>

<div class="container">
	<Barchart {data} />
</div>

<style>
	:global(.chart) {
		width: 100%;
		min-width: 600px;
		max-width: 1200px;
	}
	.container {
		overflow-x: auto;
	}
</style>
