<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Actions, PageData } from './$types';

	export let form: Actions;
	export let data: PageData;

	let datasets = false;
	const toggleDatasets = () => (datasets = !datasets);

	let hideAll = true;
	const togglehideAll = () => (hideAll = !hideAll);
</script>

{#if data}
	<div class="flex flex-row">
		{#each data.dirs as dir}
			<form method="POST" use:enhance>
				<input type="hidden" name="dir" value={dir} />
				<button
					formaction="?/merge"
					class="btn variant-filled-primary mr-1 mt-2"
				>
					{dir}
				</button>
			</form>
			<a href={`graph/${dir}`} class="btn variant-filled-primary mr-3 mt-2">
				Graph
			</a>
		{/each}
	</div>
{/if}

<button
	class="btn variant-filled-primary mt-4"
	on:click={togglehideAll}
	on:keyup={togglehideAll}
>
	Show/Hide Data
</button>
{#if !hideAll && form?.success}
	<div class="flex">
		<div>
			{#if datasets}
				<pre
					on:click={toggleDatasets}
					on:keyup={toggleDatasets}>{JSON.stringify(
						form.datasets,
						null,
						2
					)}</pre>
			{:else}
				<button on:click={toggleDatasets}>dataset</button>
			{/if}
		</div>
		<pre>{JSON.stringify(form.json, null, 2)}</pre>
		<pre>{JSON.stringify(form.jsoni, null, 2)}</pre>
		<pre>{JSON.stringify(form.jsonif, null, 2)}</pre>
		{#if form.table}
			<div>
				{#each form.table as row}
					<div>{row}</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
