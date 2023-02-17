<script>
	import Barchart from './Barchart.svelte';
	import data from './pop.js';
</script>

<h1>Bar Chart</h1>

<p>
	Graph created by following the
	<a href="https://blog.logrocket.com/data-visualization-svelte-d3/"
		>Data visualization with Svelte and D3</a
	>
	article.
</p>

<Barchart {data} />
