<script lang="ts">
	import { onMount } from 'svelte';

	let parent: string;
	onMount(async () => {
		parent = window.location.href;
	});
</script>

<div class="mt-3">
	<a class="btn variant-filled-primary" href="{parent}/graph1">Bar Chart</a>
	<a class="btn variant-filled-primary" href="{parent}/linechart">Line Chart</a>
</div>
