<script lang="ts">
	import {
		line,
		curveStep,
		scaleLinear,
		timeParse,
		extent,
		scaleTime
	} from 'd3';
	import type { dateFileTthType } from './+page.server';
	import BoxInner from './BoxInner.svelte';

	export let din: dateFileTthType;

	let width = 800;
	let height = 300;
	let margin = { top: 10, bottom: 30, left: 40, right: 5 };

	type DATAT = {
		date: Date;
		temp: number;
	};

	const data: DATAT[] = din.tth.map((d) => {
		const date = timeParse('%Y-%m-%d %H:%M:%S')(d.time)!;
		const temp = Number(d.temperature.td);
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

	// ticks for x axis
	const dx = (+extentX[1] - +extentX[0]) / 10;
	let xTicks: Date[] = [];
	for (let i = +extentX[0]; i < +extentX[1] + dx; i = i + dx) {
		xTicks.push(new Date(i));
	}

	// x axis labels string formatting
	let xLabel = (x: Date) =>
		x.getMonth() +
		1 +
		'/' +
		x.getDate() +
		' ' +
		x.getHours() +
		':' +
		('0' + x.getMinutes()).slice(-2);

	// y ticks count to label by dy
	const dy = (extentY[1] - extentY[0]) / 10;
	let yTicks: number[] = [];
	for (let i = extentY[0]; i < extentY[1] + dy; i = i + dy) {
		yTicks.push(Math.round(i * 100) / 100);
	}
	// d's for axis paths
	let xPath = `M${margin.left},0H${width - margin.right / 2}`;
	let yPath = `M0,${height - margin.bottom + 2}V${margin.top / 2}`;
</script>

<div>
	<h1>SVG Here</h1>
	<svg {width} {height} transform="translate({margin.left}, {margin.top})">
		<g>
			<path d={path(data)} fill="none" stroke="blue" />
		</g>

		<g transform="translate({margin.left}, 0)">
			<path stroke="currentColor" d={yPath} fill="none" />

			{#each yTicks as y}
				<g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
					<line stroke="currentColor" x2="-5" />
					<text dy="0.32em" fill="currentColor" x="-3em">
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
</div>

<style>
	.tick {
		font-size: 12px;
	}
</style>
