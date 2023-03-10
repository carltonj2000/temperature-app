<script lang="ts">
	import type { marginType, yScaleType } from './types';
	export let height: number;
	export let yRange: [number, number];
	export let yScale: yScaleType;
	export let margin: marginType;

	const yTicks: number[] = [];
	const count = 5;
	const dy = (yRange[1] - yRange[0]) / count;
	for (let i = yRange[0]; i < yRange[1] + dy; i = i + dy) yTicks.push(i);
	const yLabel = (v: number) => (Math.round(v * 10) / 10 + '.0').slice(0, 4);
</script>

<g>
	<line
		stroke="currentColor"
		x1={margin.left}
		y1={height - margin.bottom}
		x2={margin.left}
		y2={margin.top}
	/>
	{#each yTicks as y, i}
		<g opacity="1" transform="translate({margin.left},{yScale(y)})">
			<line stroke="currentColor" x2="-4" />
			<text
				dominant-baseline="middle"
				dx="-35"
				y={i === yTicks.length - 1 ? '7' : '0'}
			>
				{yLabel(y)}
			</text>
		</g>
	{/each}
</g>
