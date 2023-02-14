<script lang="ts">
	import type { Actions, PageData } from './$types';

	export let data: PageData;
	export let form: Actions;
</script>

{#if data.dirs}
	<h1>Temperature Data Dirs</h1>
	{#each data.dirs as dir}
		<form method="POST">
			<input type="hidden" name="dir" value={dir} />
			<button>{dir}</button>
		</form>
	{/each}
{/if}

{#if form?.success}
	<pre>{JSON.stringify(form.datasets, null, 2)}</pre>
{/if}
