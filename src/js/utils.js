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

export { preloadImages, calcWinsize };
