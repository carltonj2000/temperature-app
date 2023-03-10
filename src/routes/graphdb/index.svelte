<script lang="ts">
	import { extent, scaleTime, scaleLinear } from 'd3';
	import type { dnchX2Type } from '../utils';
	import Boxs from './Boxs.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	export let dnchX2: dnchX2Type;

	const width = 800;
	const height = 300;
	const radius = 10;
	const padding = 3;
	const margin = { top: 0, bottom: 40, left: 50, right: 0 };

	const cj = dnchX2.cj!;
	const xRange = <[Date, Date]>extent(cj, (d) => new Date(d.date));
	const xScale = scaleTime()
		.domain(xRange)
		.range([
			margin.left + radius + padding,
			width - margin.right - radius - padding
		]);

	const yRange = <[number, number]>extent(cj, (d) => d.celsius);
	const yScale = scaleLinear()
		.domain(yRange)
		.range([
			height - margin.bottom - radius - padding,
			margin.top + radius + padding
		]);
</script>

<svg {width} {height}>
	<!-- <Boxs {width} {height} {margin} {radius} {padding} /> -->
	<AxisX {height} {width} {margin} {xRange} {xScale} />
	<AxisY {height} {margin} {yRange} {yScale} />
	<g>
		{#each cj as d}
			<circle
				r={radius}
				cx={xScale(new Date(d.date))}
				cy={yScale(d.celsius)}
				fill="purple"
				stroke="yellow"
			/>
		{/each}
	</g>
</svg>
