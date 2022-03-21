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
 */
