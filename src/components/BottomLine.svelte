<script>
	import { tick } from 'svelte';

	export let x;
	export let y;
	export let maxwidth;
	export let text;
	export let quantity = 0;
	export let autoupdate = true;
	
	let extra;
	let element;
	let dx = 0;
	
	let promise;
	
	$: promise = calculateExtra(text, maxwidth);
	
	$: extra = '<'.repeat(quantity);
	
	async function calculateExtra(text, maxwidth) {
		await tick();
		if (typeof window !== 'undefined') {
			if (autoupdate) {
				let cwidth = element.getBBox().width;
				let diff = maxwidth - cwidth;
				quantity = parseInt(diff / 11.8);
			}
		
			dx = element.getBBox().width + element.getBBox().x;
		}
	}
</script>

<text x={x} y={y} bind:this={element}
			font-family="Lato"
			font-size="20px"
			fill="#88846a"
			letter-spacing="1.5px"
			>{text}</text>

{#await promise}
<text x={dx} y={y}
			font-family="Lato"
			font-size="20px"
			fill="#88846a"
			letter-spacing="1.5px"></text>
{:then}
<text x={dx} y={y}
			font-family="Lato"
			font-size="20px"
			fill="#88846a"
			letter-spacing="1.5px">{extra}</text>
{/await}
