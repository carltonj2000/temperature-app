<script lang="ts">
	import { extent, scaleTime, scaleLinear } from 'd3';
	import type { dnchX2Type } from '../utils';
	import Boxs from './Boxs.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import AxisY2 from './AxisY2.svelte';

	export let dnchX2: dnchX2Type;

	const width = 800;
	const height = 300;
	const radius = 3;
	const padding = 3;
	const margin = { top: 0, bottom: 40, left: 50, right: 50 };

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
	const yRange2 = <[number, number]>extent(cj, (d) => d.humidity);
	const yScale2 = scaleLinear()
		.domain(yRange2)
		.range([
			height - margin.bottom - radius - padding,
			margin.top + radius + padding
		]);

	const sw = 2;
	const tc = 'green'; // temperature font and stroke
	const hc = 'yellow'; // humidity font and stroke
	const c1 = 'black';
	const h1c = 'green';
</script>

<svg {width} {height}>
	<!-- <Boxs {width} {height} {margin} {radius} {padding} /> -->
	<AxisX {height} {width} {margin} {xRange} {xScale} />
	<AxisY {height} {margin} {yRange} {yScale} color={tc} />
	<AxisY2
		{height}
		{width}
		{margin}
		yRange={yRange2}
		yScale={yScale2}
		color={hc}
	/>
	<g>
		{#each cj as d}
			<circle
				r={radius}
				cx={xScale(new Date(d.date))}
				cy={yScale(d.celsius)}
				fill={tc}
				stroke={c1}
				stroke-width={sw}
			/>
			<circle
				r={radius}
				cx={xScale(new Date(d.date))}
				cy={yScale2(d.humidity)}
				fill={hc}
				stroke={c1}
				stroke-width={sw}
			/>
		{/each}
	</g>
</svg>
