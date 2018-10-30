'use strict';

const Header = () => {
  var ticking = false;
  var lastScrollY;
  const header = document.querySelector('.header');
  const mq = window.matchMedia('(min-width: 1201px)');

  /**
   * Callback for our scroll event - just
   * keeps track of the last scroll value
   */
  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }

  /**
  * Calls rAF if it's not already
  * been done already
  */

  function requestTick() {
    if(!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  /**
  * Our animation callback
  */
  function update() {
    
    if (lastScrollY >= 20){
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }

    if(mq.matches){
      if (lastScrollY >= 520){
        header.classList.add('fixed-cta');
      } else {
        header.classList.remove('fixed-cta');
      }
    }
  // allow further rAFs to be called
    ticking = false;
  }

  // only listen for scroll events
  //window.addEventListener('scroll', onScroll, false);
};

export default Header()