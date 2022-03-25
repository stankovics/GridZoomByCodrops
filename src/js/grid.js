/**
 * Class Grid represents a image grid on home page
 */
import { ImageCell } from './imageCell';
import { calcWinsize, adjustedBoundingRect } from './utils';
import { TextReveal } from './textReveal';
import { gsap } from 'gsap';

// body element

const bodyEl = document.body;

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => (winsize = calcWinsize()));

/**
 * Class representing a grid of images, where the grid can be zoomed to the clicked image cell
 */

export class Grid {
  // DOM elements
  DOM = {
    // main element (.grid)
    el: null,
    // .grid__cell-img elements
    imageCells: null,
    // content section
    content: null,
    // .back button
    backCtrl: null,
    // The main mini grid shown in content area
    miniGrid: {
      //main element
      el: null,
      // cells
      cells: null,
    },
  };
  // ImageCell instances array
  imageCellArr = [];
  // Index of current imageCell
  currentCell = -1;
  // Checks if in view mode or if in content mode
  isGridView = true;
  // Checks for active animation
  isAnimating = false;
  // TextReveal obj to animate the text (slide in/out)
  textReveal = null;
  /**
   * Constructor.
   * @param {Element} DOM_el - the .grid--large element -> main grid
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.imageCells = [...this.DOM.el.querySelectorAll('.grid__cell-img')];
    this.DOM.imageCells.forEach(el =>
      this.imageCellArr.push(new ImageCell(el))
    );
    this.DOM.content = document.querySelector('.content');
    this.DOM.backCtrl = this.DOM.content.querySelector('.back');
    this.DOM.miniGrid.el = this.DOM.content.querySelector('.grid-mini');
    this.DOM.miniGrid.cells = this.DOM.content.querySelectorAll('.grid__cell');
    // Text animations
    this.textReveal = new TextReveal([...this.DOM.el.querySelectorAll('.oh')]);
    // Events
    this.initEvents();
    // Track wich cells are visible
    // this.trackVisibleCells();
  }
}
