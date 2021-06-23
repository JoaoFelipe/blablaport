<script>
	import { passportdate, isodate } from '../lib/dateutils.js';
	import { svgToPng, svgToURL } from '../lib/downloadsvg.js';
	import { fundo, fundo2, photo } from '../lib/fundo.js';
	import BottomLine from '../lib/BottomLine.svelte';
    import Info from '../lib/Info.svelte';
	
	let search = "";
	if (typeof window !== 'undefined') {
		search = window.location.search;
	}

    const urlParams = new URLSearchParams(search);	

	let profile = urlParams.get('photo') || photo;
	let background = urlParams.has('bla')? fundo2 : fundo;
	if (urlParams.has('background')) {
		background = urlParams.get('background');
	}
	
	let passtype = urlParams.get('passtype') || 'S';
	let country = urlParams.get('country') || 'BBL';	
	let number = urlParams.get('number') || 'AA000000';
	let surname = urlParams.get('surname') || 'Sobrenome';
	let name = urlParams.get('name') || 'Nome';

	if (urlParams.has('fullname')) {
		let fullname = urlParams.get('fullname').split(' ')
		name = fullname[0];
		fullname.shift();
		surname = fullname.join(' ');
		
	}

	let nationality = urlParams.get('nationality') || 'Brasileira';
	
	let thebirthdate = urlParams.get('birthdate') || "";
	let birthdate;
	$: birthdate = passportdate(thebirthdate);
	let birthplace = urlParams.get('birthplace') || "Naturalidade";
	
	let today = new Date();
	today = new Date(today.getUTCFullYear(), today.getUTCMonth(), 1);
	if (urlParams.has('expeditiondate')) {
		today = new Date(urlParams.get('expeditiondate'));
	}
	let theexpeditiondate = today.toISOString().split('T')[0];
	let expeditiondate;
	$: expeditiondate = passportdate(theexpeditiondate);
    let authority = urlParams.get('authority') || "Imperatriz Mila";
	
	let future = new Date(today.getUTCFullYear() + 10, today.getUTCMonth(), 1);
	future.setDate(future.getDate() - 1);
	if (urlParams.has('expiredate')) {
		future = new Date(urlParams.get('expiredate'));
	}
	let theexpiredate = future.toISOString().split('T')[0];
	let expiredate;
	$: expiredate = passportdate(theexpiredate);
	
	let firstline;
	let extrafirst;
	$: firstline = "S<BBL" + surname.replace(/ /g, "<").toUpperCase() + "<" + name.replace(/ /g, "<").toUpperCase();
	let secondline; 
	$: secondline = number + "<0BBL" + isodate(theexpeditiondate) + "V" + isodate(theexpiredate);
	let extrasecond;
	let auto = true;
	
	let svg;
	
	const onSelect = (e)=>{
		return new Promise(function(resolve, reject) {
			let image = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = e => {
				resolve(e.target.result)
			};
		})
		
    }

	function setProfile(result) {
		profile = result;
    }

	function setBackground(result) {
		background = result;
    }

	function downloadPNG() {
		svgToPng(svg.outerHTML, 1127, 747).then(
			(pngbin) => {
				var a = document.createElement("a");
				a.href = pngbin;
				a.setAttribute("download", "passaporte.png");
				a.click();
			},
			() => {alert('Falha')}
		);
	}

	function downloadSVG() {
		svgToURL(svg.outerHTML).then(
			(svgURL) => {
				var a = document.createElement("a");
				a.href = svgURL;
				a.setAttribute("download", "passaporte.svg");
				a.click();
			},
			() => {alert('Falha')}
		);
	}
</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato&display=swap" rel="stylesheet">
</svelte:head>


<style>
	form {
		width: 520px;
	}

	label span {
		width: 100px;
		display: inline-block
	}
	
	label input:not([type~="checkbox"]) {
		width: 250px;
	}
	
	.container {
		display: flex;
	}
	
	.container div {
		width: 100%;
	}

	.container svg {
		max-height: 747px;
	}
</style>
<div class="container">
	<form>
		<label><span title="passtype">Tipo:</span> <input bind:value={passtype}></label>
		<label><span title="number">Número:</span> <input bind:value={number}></label>
		<label><span title="name">Nome:</span> <input bind:value={name}></label>
		<label><span title="surname">Sobrenome:</span> <input bind:value={surname}></label>
		<label><span title="nationality">Nacionalidade:</span> <input bind:value={nationality}></label>
		<label><span title="birthdate">Nascimento:</span> <input type=date bind:value={thebirthdate}></label>
		<label><span title="birthplace">Naturalidade:</span> <input bind:value={birthplace}></label>
		<label><span title="expeditiondate">Expedição:</span> <input type=date bind:value={theexpeditiondate}></label>
		<label><span title="expiredate">Validade:</span> <input type=date bind:value={theexpiredate}></label>

		<label><span>Foto:</span> <input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onSelect(e).then(setProfile)} ></label>
		<label><span>Fundo:</span> <input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onSelect(e).then(setBackground)} ></label>
		<label><input type=checkbox bind:checked={auto}> Preenchimento automático de &lt;</label>
		{#if !auto}
			<label><span>Primeira linha:</span> <input type="number" bind:value={extrafirst}></label>
			<label><span>Segunda:</span> <input type="number" bind:value={extrasecond}></label>
		{/if}
	</form>
	<div>
		<svg xmlns="http://www.w3.org/2000/svg"
				 xmlns:xlink="http://www.w3.org/1999/xlink"
				 viewbox="0 0 1127 747"
				 class="downloadsvg"
				 bind:this={svg}>
			<image
						 width="1127" height="747"
						 xlink:href="{background}"
						 />

			<image
						 x="43" y="188" width="265" height="371"
						 xlink:href="{profile}"
						 />

			<Info x="409" y="129" bind:text={passtype}/>
			<Info x="564" y="130" bind:text={country}/>
			<Info x="816" y="129" bind:text={number}/>

			<Info x="410" y="203" bind:text={surname}/>

			<Info x="409" y="288" bind:text={name}/>

			<Info x="409" y="368" bind:text={nationality}/>

			<Info x="409" y="455" bind:text={birthdate}/>
			<Info x="683" y="455" bind:text={birthplace}/>

			<Info x="410" y="581" bind:text={expeditiondate}/>
			<Info x="834" y="581" bind:text={authority}/>

			<Info x="410" y="638" bind:text={expiredate}/>

			<BottomLine x="49" y="691" maxwidth={990} text={firstline} bind:autoupdate={auto} bind:quantity={extrafirst}/>
			<BottomLine x="44" y="723" maxwidth={1010} text={secondline} bind:autoupdate={auto} bind:quantity={extrasecond}/>
		</svg>
		<button type="button" on:click={downloadPNG}>PNG</button>
		<button type="button" on:click={downloadSVG}>SVG</button>
	</div>
</div>
