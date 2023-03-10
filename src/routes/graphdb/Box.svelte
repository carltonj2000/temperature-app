<script lang="ts">
	export let width: number;
	export let height: number;
	export let offset: { x: number; y: number };
</script>

<g transform="translate({offset.x},{offset.y})">
	<line x1={0} y1={0} x2={width} y2={0} stroke="yellow" />
	<line x1={0} y1={height} x2={width} y2={height} stroke="yellow" />
	<line x1={0} y1={height} x2={0} y2={0} stroke="yellow" />
	<line x1={width} y1={height} x2={width} y2={0} stroke="yellow" />
</g>
