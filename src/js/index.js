import { preloadImages } from './utils';

// Preload images then remove loader (loading class) from body
preloadImages('.grid__cell-img-inner, .slide-nav__img').then(() =>
  document.body.classList.remove('loading')
);
