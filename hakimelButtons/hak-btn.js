class HakBtn {

	constructor(obj) {
		this.obj = obj;
		
		this.offset = 15;
		this.animationDuration = 250;
		this.animationEasing = "cubic-bezier(.02,.42,.27,1)";

		// Determining state and disabled
		this.static = false;
		this.disabled = false;

		// Adding all the event listeners
		obj.addEventListener("mouseenter", () => { this.overlayAnimationTrigger(event, this) });
		obj.addEventListener("mouseleave", () => { this.overlayAnimationTrigger(event, this) });
	}

	fetchChildren() {
		// Finding the buttons overlay and content in the DOM-Tree
		Array.from(this.obj.childNodes).forEach( (entry) => {

			if (entry.classList !== undefined) { // Element is not an empty '#text' element
				if (entry.classList.contains('btn-hak-overlay')) {
					this.overlay = entry;

				} else if (entry.classList.contains('btn-hak-content')) {
					this.content = entry;
				}
			}
		});
	}

	setSizes() {
		// Setting the different elements sizes (parent, content, overlay) depending on user-settings
		if (this.obj.style.width != "") { // Width has been set (by user / script)
			// Elements get scaled (width) after obj 
			this.overlay.style.width = this.obj.clientWidth + "px";
			this.content.style.width = this.obj.clientWidth + "px";
		} else {
			// ELements get scaled (width) after content
			this.obj.style.width = this.content.clientWidth + "px";
			this.overlay.style.width = this.content.clientWidth + "px";
		}

		if (this.obj.clientHeight != 0) { // Height has been set (by user / script)
			// Elements get scaled (height) after obj 
			this.overlay.style.height = this.obj.clientHeight + "px";
			this.content.style.height = this.obj.clientHeight + "px";
		} else {
			// ELements get scaled (height) after content
			this.obj.style.height = this.content.clientHeight + "px";
			this.overlay.style.height = this.content.clientHeight + "px";
		}

	}

	init() {
		this.refresh();
	}

	refresh() {
		// Determining static and disabled
		this.static = this.obj.classList.contains('static') ? true : false;
		this.disabled = this.obj.classList.contains('disabled') ? true : false;

		this.fetchChildren();
		this.setSizes();
	}

	toStatic() {
		this.obj.classList.remove('dynamic');
		this.obj.classList.add('static');
		this.refresh();
	}
	toDynamic() {
		this.obj.classList.remove('static');
		this.obj.classList.add('dynamic');
		this.refresh();
	}

	animation(el, offsetX, offsetY, out) {
		let keyframes, finishAction; 

		if (!out) { // move in
			keyframes = [
				{ transform: "translate(" + offsetX + "px, " + offsetY +"px)", opacity: 0 },
				{ transform: 'translate(0, 0)', opacity: 1 }
			];
			finishAction = function() {
				el.overlay.style.transform = "translate(0, 0)";
				el.overlay.style.opacity = 1;
			}

		} else { // move out
			keyframes = [
				{ transform: 'translate(0, 0)', opacity: 1 },
				{ transform: "translate(" + offsetX + "px, " + offsetY +"px)", opacity: 0 }
			];
			finishAction = function() {
				el.overlay.style.transform = "translate(0, 0)";
				el.overlay.style.opacity = 0;
			}
		}

		el.overlay.animate(keyframes, { duration: el.animationDuration, easing: el.animationEasing })
		.onfinish = finishAction;
	}

	overlayAnimationTrigger(event, el) {
		let rect = event.target.getBoundingClientRect();
		let rectMouseX = event.clientX - rect.left; // X-Pos within element
		let rectMouseY = event.clientY - rect.top; // X-Pos within element

		let out = true;
		if (event.type == "mouseenter") {
			out = false;
		}

		let offsets;
		if (rectMouseY > 2*rect.height / 3) { // lower third
			if (rectMouseX > 2*rect.width / 3) { // right most third					
				offsets = [1, 1];
			} else if (rectMouseX > rect.width / 3) { // middle third
				offsets = [0, 1];
			} else { // left most third
				offsets = [-1, 1];
			}

		} else if (rectMouseY > rect.height / 3) { // middle third
			if (rectMouseX > 2*rect.width / 3) { // right most third
				offsets = [1, 0];
			} else { // left most third
				offsets = [-1, 0];
			}

		} else { // upper third
			if (rectMouseX > 2*rect.width / 3) { // right most third
				offsets = [1, -1];
			} else if (rectMouseX > rect.width / 3) { // middle third
				offsets = [0, -1];
			} else { // left most third
				offsets = [-1, -1];
			}
		}

		if (!el.static && !el.disabled) {
			el.obj.classList.toggle('hover');
			el.animation(el, el.offset*offsets[0], el.offset*offsets[1], out);
		}
	}
}
