<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Actions, PageData } from './$types';

	import GraphDb from './graphdb/index.svelte';
	export let form: Actions;
	export let data: PageData;

	const tc = 'green'; // temperature color
	const hc = 'yellow'; // humidity color
	const c1 = 'black'; // group 1 color
	const c2 = 'red'; // group 2 color
</script>

<div class="flex flex-col items-center">
	<div class="mt-3 flex flex-row gap-3 mb-3">
		<form method="post" use:enhance>
			<!-- <button formaction="?/insert1" class="btn variant-filled-primary"> -->
			<!-- 	Insert 1 -->
			<!-- </button> -->
			<!-- <button formaction="?/selectall" class="btn variant-filled-primary"> -->
			<!-- 	Select All -->
			<!-- </button> -->
			<!-- <button formaction="?/insertnselect" class="btn variant-filled-primary"> -->
			<!-- 	Insert And Select -->
			<!-- </button> -->
			<button formaction="?/insertbulk1" class="btn variant-filled-primary">
				Insert Bulk
			</button>
			<button formaction="?/clearTable" class="btn variant-filled-primary">
				Clear Table
			</button>
		</form>
	</div>

	{#if form?.success}
		{#if form?.date}
			<pre class="mb-1">{JSON.stringify(form.date, null, 2)}</pre>
		{/if}
		<div class="flex flex-row gap-1">
			<pre>{JSON.stringify(form.result, null, 2)}</pre>
			{#if form?.result2}
				<pre>{JSON.stringify(form.result2, null, 2)}</pre>
			{/if}
		</div>
	{/if}

	<h4>
		DB data from
		{new Date(data.minDate).toUTCString()}
		to
		{new Date(data.maxDate).toUTCString()}
	</h4>

	<p>
		<span style="color: {tc}">Temperature</span>
		<span style="color: {hc}">Humidity</span>
		<span style="color: {c1}">Sensor 1 cj</span>
		<span style="color: {c2}">Sensor 2 tdr</span>
	</p>
	<GraphDb dnchX2={data.tnh} {tc} {hc} {c1} {c2} />
</div>
