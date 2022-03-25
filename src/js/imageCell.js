/**
 * ImageCell class represents an image cell (.grid__cell-img) / cells with pics on homepage grid.
 */
import { ContentItem } from './contentitem';

export class ImageCell {
  //DOM Elements
  DOM = {
    //Main element (.grid__cell-img) /  image container
    el: null,
    // Inner element / pic inside image container/grid cell
    inner: null,
    // The ImageCell's content item id
    contentId: null,
    // The ContentItem instance
    contentItem: null,
  };
  /**
   * Constructor.
   * @param {Element} DOM_el - the .grid__cell-img element.
   */
  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.grid__cell-img-inner');

    // The ImageCell's content idem id
    this.contentId = this.DOM.inner.dataset.item;
    // This ContentItem instance
    this.contentItem = new ContentItem(
      document.querySelector(`#${this.contentId}`)
    );
  }
}
