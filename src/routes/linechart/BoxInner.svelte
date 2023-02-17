<script lang="ts">
	import type { marginType } from './+page.svelte';
	export let width: number;
	export let height: number;
	export let margin: marginType;
	const li = 5; // left inset
	const bo = 0; // botton offset
</script>

<line
	x1={margin.left}
	y1={margin.top}
	x2={width - margin.right}
	y2={margin.top}
	stroke="yellow"
/>
<line x1={0} y1={0} x2={width} y2={0} stroke="yellow" />

<line
	x1={margin.left}
	y1={height - margin.bottom}
	x2={width - margin.right}
	y2={height - margin.bottom}
	stroke="yellow"
/>
<line x1={0} y1={height - bo} x2={width} y2={height - bo} stroke="yellow" />

<line
	x1={margin.left + li}
	y1={height - margin.bottom}
	x2={margin.left + li}
	y2={margin.top}
	stroke="yellow"
/>
<line x1={0} y1={height} x2={0} y2={0} stroke="yellow" />

<line
	x1={width - margin.right}
	y1={height - margin.bottom}
	x2={width - margin.right}
	y2={margin.top}
	stroke="yellow"
/>
<line x1={width} y1={height} x2={width} y2={0} stroke="yellow" />
