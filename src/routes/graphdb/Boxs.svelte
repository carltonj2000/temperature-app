<script lang="ts">
	import type { marginType } from './types';
	export let height: number;
	export let width: number;
	export let margin: marginType;
	export let radius: number;
	export let padding: number;

	import Box from './Box.svelte';
</script>

<g>
	<Box {width} {height} offset={{ x: 0, y: 0 }} />
	<Box
		width={width - margin.left - margin.right}
		height={height - margin.top - margin.bottom}
		offset={{ x: margin.left, y: margin.top }}
	/>
	<Box
		width={width - margin.left - margin.right - 2 * radius}
		height={height - margin.top - margin.bottom - 2 * radius}
		offset={{ x: margin.left + radius, y: margin.top + radius }}
	/>
	<Box
		width={width - margin.left - margin.right - 2 * radius - 2 * padding}
		height={height - margin.top - margin.bottom - 2 * radius - 2 * padding}
		offset={{
			x: margin.left + radius + padding,
			y: margin.top + radius + padding
		}}
	/>
</g>
