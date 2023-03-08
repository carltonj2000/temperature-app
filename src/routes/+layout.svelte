<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<AppBar>
		<svelte:fragment slot="lead">
			<a href="/">Temperature Data</a>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a href="/">Home</a>
			<a href="/mergeNgraph">Merge And Graph</a>
			<a href="/examples">Examples</a>
		</svelte:fragment>
	</AppBar>

	<slot />
</AppShell>
