<!-- 
Svelted version of Exercise 2 of Front End Masters course Introduction to Data Visualization with d3.js v4 by Shirley Wu
https://frontendmasters.com/courses/d3-v4/
https://svelte.dev/repl/8262eb73a08f48adba8e0b706c1a939f?version=3.22.1
-->
<script lang="ts" context="module">
	import {
		line,
		curveStep,
		scaleLinear,
		timeParse,
		extent,
		scaleTime
	} from 'd3';
	import { default as din } from './data.js';
	// import BoxInner from './BoxInner.svelte';

	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	let width = 800;
	let height = 300;
	export type marginType = {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	let margin = { top: 10, bottom: 30, left: 30, right: 10 };

	type DATAT = {
		date: Date;
		temp: number;
	};

	const data: DATAT[] = din.map((d) => {
		const date = timeParse('%Y%m%d')(d.date)!;
		const temp = Number(d.austin);
		return { date, temp };
	});

	// scales
	let extentX = <[Date, Date]>extent(data, (d) => d.date);
	let xScale = scaleTime()
		.domain(extentX)
		.range([margin.left, width - margin.right]);

	let extentY = <[number, number]>extent(data, (d) => d.temp);
	let yScale = scaleLinear()
		.domain(extentY)
		.range([height - margin.bottom, margin.top]);

	let path = line<DATAT>()
		.x((d) => xScale(d.date))
		.y((d) => yScale(d.temp))
		.curve(curveStep);

	// ticks for x axis - first day of each month found in the data
	let xTicks: Date[] = [];
	data.forEach((d) => {
		if (d.date.getDate() == 1) {
			xTicks.push(d.date);
		}
	});

	// x axis labels string formatting
	let xLabel = (x: Date) => monthNames[x.getMonth()] + ' ' + x.getFullYear();

	// y ticks count to label by 5's
	let yTicks: number[] = [];
	for (
		let i = Math.round(extentY[0]);
		i < Math.round(extentY[1] + 1);
		i = i + 5
	) {
		yTicks.push(Math.floor(i / 5) * 5);
	}

	// d's for axis paths
	let xPath = `M${margin.left},0H${width - margin.right / 2}`;
	let yPath = `M0,${height - margin.bottom + 2}V${margin.top / 2}`;
</script>

<h1>SVG Here</h1>
<svg {width} {height} transform="translate({margin.left}, {margin.top})">
	<!-- <BoxInner {height} {width} {margin} /> -->
	<g>
		<path d={path(data)} fill="none" stroke="blue" />
	</g>

	<g transform="translate({margin.left}, 0)">
		<path stroke="currentColor" d={yPath} fill="none" />

		{#each yTicks as y}
			<g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
				<line stroke="currentColor" x2="-5" />
				<text dy="0.32em" fill="currentColor" x="-1.75em">
					{y}
				</text>
			</g>
		{/each}
	</g>

	<g transform="translate(0, {height - margin.bottom + 2})">
		<path stroke="currentColor" d={xPath} fill="none" />

		{#each xTicks as x}
			<g class="tick" opacity="1" transform="translate({xScale(x)},0)">
				<line stroke="currentColor" y2="6" />
				<text fill="currentColor" y="9" dy="0.71em" x="-1.5em">
					{xLabel(x)}
				</text>
			</g>
		{/each}
	</g>
</svg>

<style>
	.tick {
		font-size: 12px;
	}
</style>
