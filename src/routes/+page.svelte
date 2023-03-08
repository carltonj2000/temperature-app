<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Actions, PageData } from './$types';

	export let form: Actions;
</script>

<div class="mt-3 flex flex-row gap-3 mb-3">
	<form method="post" use:enhance>
		<button formaction="?/insert1" class="btn variant-filled-primary">
			Insert 1
		</button>
		<button formaction="?/selectall" class="btn variant-filled-primary">
			Select All
		</button>
		<button formaction="?/insertnselect" class="btn variant-filled-primary">
			Insert And Select
		</button>
		<button formaction="?/insertbulk1" class="btn variant-filled-primary">
			Insert Bulk
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
