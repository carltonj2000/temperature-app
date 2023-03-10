<script lang="ts">
	export let width: number;
	export let height: number;
	export let margin: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	const lo = 2; // left inset
	const ro = 2; // left inset
	const bo = 2; // bottom offset
	const to = 2; // bottom offset
</script>

<line
	x1={margin.left}
	y1={margin.top - to}
	x2={width - margin.right}
	y2={margin.top - to}
	stroke="yellow"
/>
<line x1={0} y1={0} x2={width} y2={0} stroke="yellow" />

<line
	x1={margin.left}
	y1={height - margin.bottom + bo}
	x2={width - margin.right}
	y2={height - margin.bottom + bo}
	stroke="yellow"
/>
<line x1={0} y1={height} x2={width} y2={height} stroke="yellow" />

<line
	x1={margin.left - lo}
	y1={height - margin.bottom}
	x2={margin.left - lo}
	y2={margin.top}
	stroke="yellow"
/>
<line x1={0} y1={height} x2={0} y2={0} stroke="yellow" />

<line
	x1={width - margin.right + ro}
	y1={height - margin.bottom}
	x2={width - margin.right + ro}
	y2={margin.top}
	stroke="yellow"
/>
<line x1={width} y1={height} x2={width} y2={0} stroke="yellow" />
