/**
 * Class ContentItem represents (.content__item) / pop up window.
 */
import { TextReveal } from './textReveal';
import { TextLinesReveal } from './textLinesReveal';

export class ContentItem {
  // DOM elements
  DOM = {
    // Main element (.content__item)
    el: null,
  };
  // TextReveal obj to animate the texts (slide in/out)
  textReveal = null;
  // TextLinesReveal obj to animate the ,ulti line texts (slide in/out)
  textLinesReveal = null;

  /**
   * Constructor.
   * @param {Element} DOM_el - the .content__item element.
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.nav = {
      prev: this.DOM.el.querySelector('.slide-nav__img--prev'),
      next: this.DOM.el.querySelector('.slide-nav__img--next'),
    };

    // Text animations
    this.textReveal = new TextReveal([...this.DOM.el.querySelectorAll('.oh')]);
    // Text lines animations
    this.textLinesReveal = new TextLinesReveal(
      this.DOM.el.querySelector('.content__item-text')
    );
  }
}
