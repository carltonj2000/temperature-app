<script lang="ts">
	import type { marginType, xScaleType } from './types';
	export let height: number;
	export let width: number;
	export let xRange: [Date, Date];
	export let xScale: xScaleType;
	export let margin: marginType;

	const xTicks: Date[] = [];
	const count = 5;
	const dx = (+xRange[1] - +xRange[0]) / count;
	for (let i = +xRange[0]; i < +xRange[1] + dx; i = i + dx)
		xTicks.push(new Date(i));
	const xTime = (d: Date) =>
		d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2);
	const xDate = (d: Date) => d.getMonth() + 1 + '/' + d.getDate();
</script>

<g>
	<line
		stroke="currentColor"
		x1={margin.left}
		y1={height - margin.bottom}
		x2={width - margin.right}
		y2={height - margin.bottom}
	/>
	{#each xTicks as x, i}
		<g opacity="1" transform="translate({xScale(x)},{height - margin.bottom})">
			<line stroke="currentColor" y2="6" />
			<text
				y="6"
				dominant-baseline="hanging"
				dy="2"
				dx={i === xTicks.length - 1 ? '-60' : '-30'}
			>
				{xTime(x)}
			</text>
			<text
				y="6"
				dominant-baseline="hanging"
				dy="6"
				dx={i === xTicks.length - 1 ? '-20' : '10'}
				font-size="x-small"
			>
				{xDate(x)}
			</text>
		</g>
	{/each}
</g>
