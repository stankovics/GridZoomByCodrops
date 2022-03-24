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
   * @param {Element} DOM_el - the .grid--large element
   */
  constructor(DOM_el) {}
}
