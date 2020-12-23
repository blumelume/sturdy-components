# Sturdy Components
Easily includable, Bootstrap-friendly web components written in HTML, CSS and JS.

## To-Do
1. HakBtn
	* ~~Support disabled (styling (& animations))~~
	* Support button background that sits below the overlay
	* Documentation

---

## Hakimel Buttons

### Getting started.
#### 1. Include
Paste these two into your HTML file

	<link rel="stylesheet" href="https://blumelume.github.io/sturdy-components/hakimelButtons/hak-btn-default.css">
	<script defer type="text/javascript" src="https://blumelume.github.io/sturdy-components/hakimelButtons/hak-btn.js"></script>

#### 2. Place
This is the default hakButton.

	<div class="hak-btn">
		<div class="hak-btn-overlay">
			<div class="hak-btn-wrapper"></div>
		</div>
		<div class="hak-btn-content">
			<div class="hak-btn-wrapper">
				Your Content
			</div>
		</div>
	</div>

#### 3. Initialize

	let hakBtn = new HakBtn(el);
	hakBtn.init();

To initialize all of then in one go, do:

	Array.from(document.getElementsByClassName('btn-hak')).forEach( (entry) => {
		let hakBtn = new HakBtn(entry);
		hakBtn.init();
	});
	
It's probably a good idea to keep track of your instances with a list.

#### Done!

### How does it work?
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

It doesn't matter what kind of HTML-elements these are as long as the classes are correct. That means the HakButton can be used like a normal HTML-button or like a normal HTML-hyperlink like so:
	
	...
		<button class="hak-btn-content" onclick="...">
			<div class="hak-btn-wrapper"></div>
		</button>
	...
		<a class="hak-btn-content" href="...">
			<div class="hak-btn-wrapper"></div>
		</a>
	...

#### setSizes Function
```setSizes()``` is a function that when called goes through the children and seperately sets widths and heights depending on whether the user has set any on the btn-hak element. (```hakBtn.setSizes();```)

#### Refresh Function
A HakButton instance can be refreshed by calling ```hakBtn.refresh()``` which will:
1. Reset the button states (see below) to those assigned by classes 
2. Re-fetch the btn-hak child nodes
3. Set sizes for the whole button

#### Button States
HakButtons can be static or dynmaic (not static) which is the default. 
If the button is static, it is not animated and stays in its activated state until it is set back to dynamic. That is useful, for example, if you HakButton is used as some kind of toggle.
They can be set to static by assigning a 'static' class to the DOM Node and refreshing the instance with ```hakBtn.refresh()```. 
Or by calling the ```toStatic()``` and the ```toDynamic()``` functions on the instance.
	
	hakBtn.toStatic(); // Button is now static
	hakBtn.toDynamic(); // Button is now dynamic again

HakButtons can also be disabled which, contrary to static, makes it stay in the unhovered, inactive state until it's set back to active. You can disable the button by assigning the 'disabled' class to the DOM Node.

Both classes ('static' and 'disabled') can of course also be used for additional styling.
