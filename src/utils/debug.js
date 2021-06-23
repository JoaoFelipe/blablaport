let x = 0;
let y = 0;

function mousemove(evt) {
	const rect = evt.currentTarget.getBoundingClientRect();
	x = (evt.clientX - rect.x)/rect.width;
	y = (evt.clientY - rect.y)/rect.height;
}