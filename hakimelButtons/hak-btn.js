let offset = 15;

// Adding event-listeners to all buttons
Array.from(document.getElementsByClassName("btn-hak")).forEach( (entry) => {
		let overlay = entry.getElementsByClassName("btn-hak-overlay")[0];
		let content = entry.getElementsByClassName("btn-hak-content")[0];

		if (entry.style.width == "") {
			entry.style.width = content.clientWidth + "px";
		} else {
			content.style.width = entry.style.width;
		}
		if (entry.style.height == "") {
			entry.style.height = content.clientHeight + "px";
		} else {
			content.style.height = entry.style.height;
		}

		overlay.style.width = content.clientWidth + "px";
		overlay.style.height = content.clientHeight + "px";

	if (!entry.classList.contains('static') && !entry.classList.contains('disabled')) {
		entry.addEventListener("mouseenter", overlayAnimationTrigger);
		entry.addEventListener("mouseleave", overlayAnimationTrigger);
	} 
});

function animate(element, offsetX, offsetY, out) {
	if (!out) { // move in
		keyframes = [
			{ transform: "translate(" + offsetX + "px, " + offsetY +"px)", opacity: 0 },
			{ transform: 'translate(0, 0)', opacity: 1 }
		];
		finishAction = function() {
			element.style.transform = "translate(0, 0)";
			element.style.opacity = 1;
		}

	} else { // move out
		keyframes = [
			{ transform: 'translate(0, 0)', opacity: 1 },
			{ transform: "translate(" + offsetX + "px, " + offsetY +"px)", opacity: 0 }
		];
		finishAction = function() {
			element.style.transform = "translate(0, 0)";
			element.style.opacity = 0;
		}
	}

	element.animate(keyframes, 
		{
			duration: 250,
			easing: "cubic-bezier(.02,.42,.27,1)"
		}
	).onfinish = finishAction;
}

function overlayAnimationTrigger(event) {
	this.classList.toggle('hover');

	let overlay = this.getElementsByClassName("btn-hak-overlay")[0];

	let rect = event.target.getBoundingClientRect();
	let rectMouseX = event.clientX - rect.left; // X-Pos within element
	let rectMouseY = event.clientY - rect.top; // X-Pos within element

	let out = true;
	if (event.type == "mouseenter") {
		out = false;
	}

	if (rectMouseY > 2*rect.height / 3) { // lower third
		if (rectMouseX > 2*rect.width / 3) { // right most third					
			animate(overlay, offset, offset, out);
		} else if (rectMouseX > rect.width / 3) { // middle third
			animate(overlay, 0, offset, out);
		} else { // left most third
			animate(overlay, -offset, offset, out);
		}

	} else if (rectMouseY > rect.height / 3) { // middle third
		if (rectMouseX > 2*rect.width / 3) { // right most third
			animate(overlay, offset, 0, out);
		} else { // left most third
			animate(overlay, -offset, 0, out);
		}

	} else { // upper third
		if (rectMouseX > 2*rect.width / 3) { // right most third
			animate(overlay, offset, -offset, out);
		} else if (rectMouseX > rect.width / 3) { // middle third
			animate(overlay, 0, -offset, out);
		} else { // left most third
			animate(overlay, -offset, -offset, out);
		}
	}
}