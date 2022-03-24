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
  DOM = {};
}
