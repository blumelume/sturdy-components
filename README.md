# Sturdy Components
Easily includable, Bootstrap-friendly web components written in HTML, CSS and JS.

### [**View the Demo!**](https://blumelume.github.io/sturdy-components)

## To-Do
0. Page
	* Enable the user to include the whole bundle
	* Select components and get all links assembled in oe paste-box (see google fonts) 
1. HakBtn
	* ~~Support disabled (styling (& animations))~~
	* Support button background that sits below the overlay
	* ~~Documentation~~

---

## Hakimel Buttons

1. [Getting started](https://github.com/blumelume/sturdy-components/#getting-started.)
	* [Include](https://github.com/blumelume/sturdy-components/#1-include)
	* [Place](https://github.com/blumelume/sturdy-components/#2-place)
	* [Initialize](https://github.com/blumelume/sturdy-components/#3-initialize)

2. [How it works](https://github.com/blumelume/sturdy-components#how-does-it-work)	
	* [Child Elements](https://github.com/blumelume/sturdy-components#child-elements)
	* [setSizes Function](https://github.com/blumelume/sturdy-components#setsizes-function)
	* [refresh Function](https://github.com/blumelume/sturdy-components#refresh-function)
	* [Button states](https://github.com/blumelume/sturdy-components#button-states)

### Getting started.
#### 1. Include
Paste these two into your HTML file

	<link rel="stylesheet" href="https://blumelume.github.io/sturdy-components/hakimelButtons/hak-btn-default.css">
	<script type="text/javascript" src="https://blumelume.github.io/sturdy-components/hakimelButtons/hak-btn.js"></script>

#### 2. Place
This is the default hakButton.

	<div class="btn-hak">
		<div class="btn-hak-overlay">
			<div class="btn-hak-wrapper"></div>
		</div>
		<div class="btn-hak-content">
			<div class="btn-hak-wrapper">
				Your Content
			</div>
		</div>
	</div>

#### 3. Initialize
A new HakButton instance requires a reference to the DOM Element with the class 'btn-hak' (here 'el').

	let hakBtn = new HakBtn(el);
	hakBtn.init();

To initialize all of them in one go, do:

	Array.from(document.getElementsByClassName('btn-hak')).forEach( (entry) => {
		let hakBtn = new HakBtn(entry);
		hakBtn.init();
	});
	
It's probably a good idea to keep track of your instances with a list.

#### Done!

### How does it work?
A standard 'hak-btn' is composed of a main container that holds the overlay and main content. 
Both of which contain a wrapper that can hold the actual content.

	<div class="btn-hak">
		<div class="btn-hak-overlay">
			<div class="btn-hak-wrapper"></div>
		</div>
		<div class="btn-hak-content">
			<div class="btn-hak-wrapper"></div>
		</div>
	</div>

All content that is placed in the overlay wrapper gets animated with the overlay. The default, alwas visible text (or whatever content you put in there) is placed in the wrapper inside the 'btn-hak-content' div. 

It doesn't matter what kind of HTML-elements these are as long as the classes are correct. That means the HakButton can be used like a normal HTML-button or like a normal HTML-hyperlink like so:
	
	...
		<button class="btn-hak-content" onclick="...">
			<div class="btn-hak-wrapper"></div>
		</button>

or

	...
		<a class="btn-hak-content" href="...">
			<div class="btn-hak-wrapper"></div>
		</a>

#### Child Elements
A HakButton instance also always contains references to the overlay and content DOM Nodes. They can be acessed and modified through:

	hakBtn.overlay; 
	hakBtn.content;

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
