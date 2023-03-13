<script lang="ts">
	import { extent, scaleTime, scaleLinear } from 'd3';
	import type { dnchX2Type } from '../utils';
	import Boxs from './Boxs.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import AxisY2 from './AxisY2.svelte';

	export let dnchX2: dnchX2Type;
	export let tc: string; // temperature font and stroke
	export let hc: string; // humidity font and stroke
	export let c1: string; // color group 1
	export let c2: string; // color group 2

	const width = 800;
	const height = 300;
	const radius = 3;
	const padding = 3;
	const margin = { top: 0, bottom: 40, left: 50, right: 50 };

	const cj = dnchX2.cj!;
	const tdr = dnchX2.tdr!;
	const xRange1 = <[Date, Date]>extent(cj, (d) => new Date(d.date));
	const xRange2 = <[Date, Date]>extent(tdr, (d) => new Date(d.date));
	const xRange: [Date, Date] = [
		+xRange1[0] < +xRange2[0] ? xRange1[0] : xRange2[0],
		+xRange1[1] > +xRange2[1] ? xRange1[1] : xRange2[1]
	];
	const xScale = scaleTime()
		.domain(xRange)
		.range([
			margin.left + radius + padding,
			width - margin.right - radius - padding
		]);

	const yRangeT1 = <[number, number]>extent(cj, (d) => d.celsius);
	const yRangeT2 = <[number, number]>extent(tdr, (d) => d.celsius);

	const yRange: [number, number] = [
		Math.min(yRangeT1[0], yRangeT2[0]),
		Math.max(yRangeT1[1], yRangeT2[1])
	];

	const yScale = scaleLinear()
		.domain(yRange)
		.range([
			height - margin.bottom - radius - padding,
			margin.top + radius + padding
		]);

	const yRange2H1 = <[number, number]>extent(cj, (d) => d.humidity);
	const yRange2H2 = <[number, number]>extent(tdr, (d) => d.humidity);
	const yRange2: [number, number] = [
		Math.min(yRange2H1[0], yRange2H2[0]),
		Math.max(yRange2H1[1], yRange2H2[1])
	];

	const yScale2 = scaleLinear()
		.domain(yRange2)
		.range([
			height - margin.bottom - radius - padding,
			margin.top + radius + padding
		]);

	const sw = 2;
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
	<g>
		{#each tdr as d}
			<circle
				r={radius}
				cx={xScale(new Date(d.date))}
				cy={yScale(d.celsius)}
				fill={tc}
				stroke={c2}
				stroke-width={sw}
			/>
			<circle
				r={radius}
				cx={xScale(new Date(d.date))}
				cy={yScale2(d.humidity)}
				fill={hc}
				stroke={c2}
				stroke-width={sw}
			/>
		{/each}
	</g>
</svg>
