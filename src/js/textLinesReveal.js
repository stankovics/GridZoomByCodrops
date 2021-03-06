/**
 * Class TextLinesReveal represents text inside pop-up window
 */
import SplitType from 'split-type';
import { wrapLines } from './utils';
import { gsap } from 'gsap';

export class TextLinesReveal {
  // animates div with class .content__item-text / whole text
  constructor(animationElems) {
    this.DOM = {
      animationElems: Array.isArray(animationElems)
        ? animationElems
        : [animationElems],
    };
    // Array of SplitType instances
    this.SplitTypeInstances = [];
    // Array of all HTML .line
    this.lines = [];

    for (const el of this.DOM.animationElems) {
      const SplitTypeInstance = new SplitType(el, { types: 'lines' });
      // wrap the lines (div with class .oh)
      // the inner child will be the one animating the transform
      wrapLines(SplitTypeInstance.lines, 'div', 'oh'); // 1. creates new div, 2. adds to div class of '.oh', 3. append created div as last child of lines parent element, 4. append each word as last child in new div with class of .oh
      this.lines.push(SplitTypeInstance.lines);
      // keep a reference to the SplitType instance
      this.SplitTypeInstances.push(SplitTypeInstance);
    }
    this.initEvents();
  }
  in() {
    // Lines are visible
    this.isVisible = true;

    // Animation
    gsap.killTweensOf(this.lines);
    // prettier-ignore
    return gsap.timeline({ defaults: { duration: 1.2, ease: 'expo' } })
      .set(this.lines, {
        y: '150%',
        rotate: 15,
      })
      .to(this.lines, {
        y: '0%',
        rotate: 0,
        stagger: 0.04,
      });
  }
  out() {
    // lines are invisible
    this.isVisible = false;

    // animation
    gsap.killTweensOf(this.lines);
    // prettier-ignore
    return gsap.timeline({
        defaults: { duration: 0.5, ease: 'expo.in' },
      })
      .to(this.lines, {
        y: '-150%',
        rotate: -5,
        stagger: 0.02,
      });
  }
  initEvents() {
    window.addEventListener('resize', () => {
      // empty the lines array
      this.lines = [];
      // re initialize the Split Text
      for (const instance of this.SplitTypeInstances) {
        // re-split text
        // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
        instance.split();

        // need to wrap again the new lines elements (div with class .oh)
        wrapLines(instance.lines, 'div', 'oh');
        this.lines.push(instance.lines);
      }
      // hide the lines
      if (!this.isVisible) {
        gsap.set(this.lines, { y: '-150%' });
      }
    });
  }
}
