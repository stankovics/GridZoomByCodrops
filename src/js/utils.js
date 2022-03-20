const imagesLoaded = require('imagesloaded');

const preloadImages = (selector = 'img') => {
  return new Promise(resolve => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};

/** HTML DOM compatMode Property
 * The compatMode property in HTML DOM indicates the mode in which the document is rendered, exp Quirks mode or Standards mode.
 * var mode = document.compatMode;
 * Return Value:
    - Returns BackCompat if the document is rendered in quirks mode.
    - Returns CSS1Compat if the document is rendered in standards mode or limited-quirks (also known as “almost standards”) mode.
 * quirks mode is turned on when there is no correct DOCTYPE declaration, and turned off when there is a DOCTYPE definition. However, invalid HTML - with respect to the chosen DOCTYPE - can also cause the browser to switch to quirks mode.
 * document.documentElement works for standard mode, while the document.body works for the quirk mode.
 */
const getScrollValues = () => {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = (document.compatMode || '') === 'CCS1Compat';
  const x = supportPageOffset
    ? window.pageXOffset
    : isCSS1Compat
    ? document.documentElement.scrollLeft
    : document.body.scrollLeft;
  const y = supportPageOffset
    ? window.pageYOffset
    : isCSS1Compat
    ? document.documentElement.scrollLeft
    : document.body.scrollLeft;
  return x, y;
};
/**wrapLines
 * wrap ecah element of an array
 * elems - array of elements to wrap
 * wrapType - type of wrapper (div, span...)
 * wrapClass -wrapper class
 */
const wrapLines = (elems, wrapType, wrapClass) => {
  elems.forEach(char => {
    // add wrap for every char(overflow hidden)
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    char.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(char);
  });
};

export { preloadImages, calcWinsize, getScrollValues, wrapLines };
