# Sturdy Components
Easily includable, Bootstrap-friendly web components written in HTML, CSS and JS.

## To-Do
1. Adjust breakpoints


## Hakimel Buttons
A standard 'hak-btn' is composed of a main container that holds the overlay and main content. 
Both of which contain a wrapper that can hold the actual content.

	<div class="hak-btn">
		<div class="hak-btn-overlay">
			<div class="hak-btn-wrapper"></div>
		</div>
		<div class="hak-btn-content">
			<div class="hak-btn-wrapper"></div>
		</div>
	</div>

All content that is placed in the overlay wrapper gets animated with the overlay. The default, alwas visible text (or whatever content you put in there) is placed in the wrapper inside the 'hak-btn-content' div. 
