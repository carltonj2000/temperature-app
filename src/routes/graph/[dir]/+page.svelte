<script lang="ts">
	import type { PageData } from '../$types';
	import LineGraph from './LineGraph.svelte';
	export let data: PageData;
</script>

<div>
	<LineGraph din={data} />
</div>

<style>
	div {
		display: flex;
	}
</style>
