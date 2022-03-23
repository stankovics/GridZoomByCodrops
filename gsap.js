/** GSAP
 
 * To create an animation, gsap.to() needs two things:
  - targets  - The object(s) you are animating. This can be a raw object, an array of objects, or selector text like ".myClass".
  - vars - An object with property/value pairs that you're animating to (like opacity:0.5, rotation:45, etc.) and other optional special properties like duration and onComplete.
 */

// For example, to move an element with an id of "logo" to an x position of 100 (same as transform: translateX(100px)) over the course of 1 second:
gsap.to('#logo', { duration: 1, x: 100 });

// Note: Remember that GSAP isn't just for DOM elements, so you could even animate custom properties of a raw object like this:

var obj = { prop: 10 };
gsap.to(obj, {
  duration: 1,
  prop: 200,
  //onUpdate fires each time the tween updates; we'll explain callbacks later.
  onUpdate: function () {
    console.log(obj.prop); //logs the value on each update.
  },
});
/** Demo: gsap.to() Basic Usage
 * HTML
<h2 class="title">gsap.to() Basic Usage</h2>
<div class="box orange"></div>
<div class="box grey"></div>
<div class="box green"></div>

 * CSS
body {
  margin: 10px;
}

.box {
  display: block;
}

* JS code is under, out of comment
 */
gsap.to('h2.title', { duration: 1, opacity: 0.3 });
gsap.to('.box', { duration: 2, x: 300 });
gsap.to('.green', { duration: 3, rotation: 360, scale: 0.5 });
/*
Notice that the opacity, scale, rotation and x values are all being animated in the demo above but DOM elements don't actually have those properties! In other words, there's no such thing as element.scale or element.opacity. How'd that work then? It's the magic of GSAP. Before we talk about the details behind that, let's take a look at GSAP's plugins and how they work in general because that will clarify some important concepts.
*/

/** PLUGINS
 * Think of plugins like adding special properties that get dynamically added to GSAP in order to inject extra abilities. This keeps the core engine small and efficient, yet allows for unlimited expansion. Each plugin is associated with a specific property name.
 *
 * Among the most popular plugins are:
 *   - SplitText: Splits text blocks into lines, words, and characters and enables you to easily animate each part.
     - Draggable: Adds the ability to drag and drop any element.
     - MorphSVGPlugin: Smooth morphing of complex SVG paths.
     - DrawSVGPlugin: Animates the length and position of SVG strokes.
     - MotionPathPlugin: Animates any element along a path.
*/
/** SplitText EXAMPLE IS UNDER THE COMMENT AREA
 * import SplitType from 'split-type';
 *HTML :
 <div id="quote">text text text text text </div>
 * If we don't define how we want to split text, split-type will split by deafault into characters, lines and words. 
 */
const textToSplit = new SplitType('#quote', { type: 'words, chars' }); // this code will split text by words and characters.
/**
 *  textToSplit.words will access  split text by words. resault will be an array with divs and in each div will be word.
 * textToSplit.chars is for characters
 */

/*
See https://www.greensock.com/splittext/ for details. 
This demo uses SplitText which is a membership benefit of Club GreenSock, https://www.greensock.com/club/
*/

var tl = gsap.timeline(),
  mySplitText = new SplitText('#quote', { type: 'words,chars' }),
  chars = mySplitText.chars; //an array of all the divs that wrap each character

gsap.set('#quote', { perspective: 400 });

console.log(chars);

tl.from(chars, {
  duration: 0.8,
  opacity: 0,
  scale: 0,
  y: 80,
  rotationX: 180,
  transformOrigin: '0% 50% -50',
  ease: 'back',
  stagger: 0.01,
});

document.getElementById('animate').onclick = function () {
  tl.restart();
};

/** CSSPlugin
 * In the previous example, GSAP used a core plugin (one that's included in GSAP's core) called CSSPlugin. It automatically noticed that the target is a DOM element, so it intercepted the values and did some extra work behind the scenes, applying them as inline styles (element.style.transform and element.style.opacity in that case). Be sure to watch the "Getting Started" video at the top of this article to see it in action.
 *
 * CSSPlugin Features:
    - Normalizes behavior across browsers and works around various browser bugs and inconsistencies
    - Optimizes performance by auto-layerizing, caching transform components, preventing layout thrashing, etc.
    - Controls 2D and 3D transform components (x, y, rotation, scaleX, scaleY, skewX, etc.) independently (eliminating order-of-operation woes)
    - Reads computed values so you don't have to manually define starting values
    - Animates complex values like borderRadius:"50% 50%" and boxShadow:"0px 0px 20px 20px red"
    - Applies vendor-specific prefixes (-moz-, -ms-, -webkit-, etc.) when necessary
    - Animates CSS Variables
    - Normalizes behavior between SVG and DOM elements (particularly useful with transforms)
    - ...and lots more
 
  * 2D and 3D transforms

    GSAP	          CSS
    x: 100	        transform: translateX(100px)
    y: 100	        transform: translateY(100px)
    rotation:       360	transform: rotate(360deg)
    rotationX:      360	transform: rotateX(360deg)
    rotationY:      360	transform: rotateY(360deg)
    skewX: 45	      transform: skewX(45deg)
    skewY: 45	      transform: skewY(45deg)
    scale: 2	      transform: scale(2, 2)
    scaleX: 2	      transform: scaleX(2)
    scaleY: 2	      transform: scaleY(2)
    xPercent:       -50	transform: translateX(-50%)
    yPercent:       -50	transform: translateY(-50%)

* GSAP can animate any transform value but we strongly recommend using the shortcuts above because they're faster and more accurate (GSAP can skip parsing computed matrix values which are inherently ambiguous for rotational values beyond 180 degrees). The other major convenience GSAP affords is independent control of each component while delivering a consistent order-of-operation.

Performance note: it's much easier for browsers to update x and y (transforms) rather than top and left which affect document flow. So to move something, we recommend animating x and y.
 
*/
/** Demo: Multiple 2D and 3D transforms
 * HTML
<div class="box green"></div>
<div class="box orange"></div>
<div class="box grey"></div>
 * CSS
body {
  margin: 10px;
}
 * JS is out of comment area, under
 */

gsap.to('.green', { duration: 3, rotationX: 360 });
gsap.to('.orange', { duration: 3, rotationY: 360 });
gsap.to('.grey', {
  duration: 3,
  x: 100,
  y: 100,
  scale: 2,
  skewX: 45,
  rotation: 180,
});
/**
 * Things to keep in mind:
 * Be sure to camelCase all hyphenated properties. font-size should be fontSize, background-color should be backgroundColor.
 * When animating positional properties such as left and top, it's imperative that the elements you are trying to move also have a CSS position value of absolute, relative, or fixed.
 */

/** FROM
 * gsap.from()
 * Sometimes it's amazingly convenient to set up your elements where they should end up (after an intro animation, for example) and then animate from other values. That's exactly what gsap.from() is for.

For example, perhaps your "#logo" element currently has its natural x position at 0 and you create the following tween:

gsap.from("#logo", {duration: 1, x: 100});
The #logo will immediately jump to an x of 100 and animate to an x of 0 (or whatever it was when the tween started). In other words, it's animating FROM the values you provide to whatever they currently are.
 */

/** set()
 * set()
If you want to immediately set some properties, use the .set() method. It's essentially a zero duration tween, so you can use all of the same properties that you can use in other GSAP tweens.

gsap.set("#logo", {fontSize: 20, x: 10});
 */
/** Special properties
 * A special property is like a reserved keyword that GSAP handles differently than a normal (animated) property. Special properties are used to define callbacks, delays, easing, staggers and more.

A basic example of a special property is duration (which we've been using already):

gsap.to("#logo", {duration: 1, x: 100});
Other common special properties are:

delay - The delay before starting an animation.
onComplete - A callback that should be invoked when the animation finishes.
onUpdate - A callback that should be invoked every time the animation updates/renders.
ease - The ease that should be used (like "power2.inOut").
stagger - Staggers the starting time for each target/element animation.
 */

/** EASING
 * If your animation had a voice, what would it sound like? Should it look playful? Robotic? Slick? Realistic? To become an animation rock star, you must develop a keen sense of easing because it determines the style of movement between point A and point B.

An "ease" controls the rate of change during a tween. Below is an interactive tool that allows you to visually explore various eases. Note: You can click on the underlined parts of the code at the bottom to change the values.

Values, take a visual look on doc page 
none
power1
power2
power3
power4
back
elastic
bounce
rough
slows
teps
circ
expo
sine
*/

/** STAGGERS
 * Staggers make it easy to animate a group of objects with a small delay between the start of each object's animation.
 */

/** Callbacks
Callbacks invoke a function when a specific animation-related event occurs:

onComplete: invoked when the animation has completed.
onStart: invoked when the animation begins
onUpdate: invoked every time the animation updates (on every frame while the animation is active).
onRepeat: invoked each time the animation repeats.
onReverseComplete: invoked when the animation has reached its beginning again when reversed. 

To fire a tweenComplete() function when an animation finishes, you'd do:

gsap.to("#logo", {duration: 1, x: 100, onComplete: tweenComplete});

function tweenComplete() {
  console.log("the tween is complete");
}

Callback Parameters
Each callback function can optionally be passed any amount of parameters. Since there can be multiple parameters, they must be passed as an Array (even if there is only one).

gsap.to("#logo", {duration: 1, x: 100, onComplete: tweenComplete, onCompleteParams: ["done!"]});

function tweenComplete(message) {
  console.log(message);
}
By default the scope of a callback (what this refers to inside that function) is the tween itself, but you can define it as something else if you prefer, like callbackScope: yourScope

*/

/** Controlling Animations
 *
 * To control an animation, you need an instance to work with. The to(), from(), and fromTo() methods all return a Tween instance, so you can store it as a variable and then control it very easily:
 */
//create a reference to the animation
var tween = gsap.to('#logo', { duration: 1, x: 100 });

//pause
tween.pause();

//resume (honors direction - reversed or not)
tween.resume();

//reverse (always goes back towards the beginning)
tween.reverse();

//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);

//jump to exacty 1/4th into the tween's progress:
tween.progress(0.25);

//make the tween go half-speed
tween.timeScale(0.5);

//make the tween go double-speed
tween.timeScale(2);

//immediately kill the tween and make it eligible for garbage collection
tween.kill();
/** 
 *Sequencing with Timelines


 * Choreographing complex sequences is crazy simple with GSAP's Timelines.

A timeline is a container for tweens where you place them in time (like a schedule). They can overlap or have gaps between them; you have total control. As the timeline's playhead moves, it scrubs across its child tweens and renders them accordingly! Insert as many as you want and control the entire group as a whole with the standard methods (play(), reverse(), pause(), etc.). You can even nest timelines within timelines!

When to Use a Timeline
To control a group of animations as a whole.
To build a sequence without messing with lots of delay values (progressively build so that timing adjustments to earlier animations automatically affect later ones, greatly simplifying experimentation and maintenance).
To modularize your animation code.
To do any kind of complex choreographing.
To fire callbacks based on a group of animations (like "after all of these animations are done, call myFunction()").

Basic Sequencing
Timelines have the familiar to(), from(), and fromTo() methods that provide a quick way to create a tween and add() it to the timeline:

 */
//create a timeline instance
var tl = gsap.timeline();

//the following two lines do the SAME thing:
tl.add(gsap.to('#id', { duration: 2, x: 100 }));
tl.to('#id', { duration: 2, x: 100 }); //shorter syntax!
/**
 Method Chaining
 */
var tl = gsap.timeline();

//chain all to() methods together on one line
tl.to('.green', { duration: 1, x: 200 })
  .to('.orange', { duration: 1, x: 200, scale: 0.2 })
  .to('.grey', { duration: 1, x: 200, scale: 2, y: 20 });

//we recommend breaking each to() onto its own line for legibility
tl.to('.green', { duration: 1, x: 200 })
  .to('.orange', { duration: 1, x: 200, scale: 0.2 })
  .to('.grey', { duration: 1, x: 200, scale: 2, y: 20 });
