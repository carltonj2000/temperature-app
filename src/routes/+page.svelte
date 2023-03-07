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

<h1 on:click={togglehideAll} on:keyup={togglehideAll}>Temperature Data</h1>

{#if data}
	<div class="dirs">
		{#each data.dirs as dir}
			<form method="POST" use:enhance>
				<div class="dir">
					<button formaction="?/insert1">Insert 1</button>
					<button formaction="?/selectall">Select All</button>
				</div>
				<input type="hidden" name="dir" value={dir} />
				<button formaction="?/merge">{dir}</button>
				<a href={`graph/${dir}`}>Graph</a>
			</form>
		{/each}
	</div>
{/if}

<div class="graphs">
	<a href="graph1">Bar Chart</a>
	<a href="linechart">Line Chart</a>
</div>

{#if hideAll}
	<p>Click Title To Show/Hide Data</p>
{:else if form?.success}
	<div class="side-by-side">
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

<style>
	.graphs {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	a {
		padding: 0.5rem 1rem;
		color: white;
		background: gray;
		border-radius: 0.5rem;
		text-decoration: none;
		text-align: center;
	}
	.side-by-side {
		display: flex;
		gap: 1rem;
	}
	.dirs {
		display: flex;
		gap: 1rem;
	}
	.dirs button {
		padding: 0.5rem 1rem;
	}
	.dir {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
