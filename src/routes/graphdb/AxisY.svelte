<script lang="ts">
	import type { marginType, yScaleType } from './types';
	export let height: number;
	export let yRange: [number, number];
	export let yScale: yScaleType;
	export let margin: marginType;
	export let color: string;

	const yTicks: number[] = [];
	const count = 5;
	const dy = (yRange[1] - yRange[0]) / count;
	for (let i = 0; i <= count; i++) yTicks.push(yRange[0] + i * dy);
	const c2f = (c: number) => (9 * c) / 5 + 32;
	const yLabel = (v: number) =>
		(Math.round(c2f(v) * 10) / 10 + '.0').slice(0, 4);
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
				y={i === yTicks.length - 1 ? '6' : '0'}
				fill={color}
			>
				{yLabel(y)}
			</text>
		</g>
	{/each}
</g>
