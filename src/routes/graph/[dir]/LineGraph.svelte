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

	const width = 800;
	const height = 300;
	const margin = { top: 10, bottom: 30, left: 40, right: 5 };

	type DATAT = {
		date: Date;
		temp: number[];
	};

	const data: DATAT[] = din.tth.map((d) => {
		const date = timeParse('%Y-%m-%d %H:%M:%S')(d.time)!;
		const temp = [
			Number(d.temperature.cj),
			Number(d.temperature.td),
			Number(d.humidity.cj),
			Number(d.humidity.td)
		];
		return { date, temp };
	});

	// scales
	const extentX = <[Date, Date]>extent(data, (d) => d.date);
	const xScale = scaleTime()
		.domain(extentX)
		.range([margin.left, width - margin.right]);

	const extentY_0 = <[number, number]>extent(data, (d) => d.temp[0]);
	const extentY_1 = <[number, number]>extent(data, (d) => d.temp[1]);
	const extentY_2 = <[number, number]>extent(data, (d) => d.temp[2]);
	const extentY_3 = <[number, number]>extent(data, (d) => d.temp[3]);
	const extentY0 = Math.min(
		extentY_0[0],
		extentY_1[0],
		extentY_2[0],
		extentY_3[0]
	);
	const extentY1 = Math.max(
		extentY_0[1],
		extentY_1[1],
		extentY_2[1],
		extentY_3[1]
	);
	const extentY = [extentY0, extentY1];

	const yScale = scaleLinear()
		.domain(extentY)
		.range([height - margin.bottom, margin.top]);

	const path = (i: number) =>
		line<DATAT>()
			.x((d) => xScale(d.date))
			.y((d) => yScale(d.temp[i]))
			.curve(curveStep);

	// ticks for x axis
	const dx = (+extentX[1] - +extentX[0]) / 10;
	const xTicks: Date[] = [];
	for (let i = +extentX[0]; i < +extentX[1] + dx; i = i + dx) {
		xTicks.push(new Date(i));
	}

	// x axis labels string formatting
	const xLabel = (x: Date) =>
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
	const yTicks: number[] = [];
	for (let i = extentY[0]; i < extentY[1] + dy; i = i + dy) {
		yTicks.push(Math.round(i * 100) / 100);
	}
	// d's for axis paths
	const xPath = `M${margin.left},0H${width - margin.right / 2}`;
	const yPath = `M0,${height - margin.bottom + 2}V${margin.top / 2}`;
</script>

<div>
	<h1>{din.dir}</h1>
	<svg {width} {height} transform="translate({margin.left}, {margin.top})">
		<g>
			<path d={path(0)(data)} fill="none" stroke="blue" />
			<path d={path(1)(data)} fill="none" stroke="green" />
			<path d={path(2)(data)} fill="none" stroke="pink" />
			<path d={path(3)(data)} fill="none" stroke="orange" />
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
