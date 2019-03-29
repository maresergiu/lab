"use strict";

/*
 * ---------------------------------------- *
 * ProjectName JavaScripts                  *
 * ---------------------------------------- *
 */
// project namespace
window.temp || (window.temp = {});

(function ($) {
  $(document).ready(function () {
    $.extend(true, temp, {
      cache: toolkit.cache,
      config: toolkit.config,
      helpers: toolkit.helpers
    }); // custom config        

    temp.config.breakpoints.MEDIUM_WIDTH = 1200;
    temp.config.breakpoints.X_MEDIUM_WIDTH = 1024;
    temp.config.breakpoints.SMALL_WIDTH = 768; // custom delays

    temp.cache.timer = {};
    temp.cache.timer.veryFast = 150;
    temp.cache.timer.fast = 300;
    temp.cache.timer.moderated = 500; // custom cache

    temp.cache.$header = $('#site-header');
    temp.cache.$footer = $('#site-footer');
    temp.cache.$main = $('#main'); // if the height of the body is smaller then the page make the bodies height to strech to fit the screen 

    temp.helpers.isContentScrolable(); // detect if js in enable

    temp.cache.$html.removeClass('no-js').addClass('js'); // animate the elements that are in the viewport on load

    temp.helpers.animateElemInView(); // window events
    // -------------
    // avoiding the momentum scrolling on mobile and trigger animations

    if (temp.helpers.deviceWithTouch()) {
      temp.cache.$window.on({
        'scroll': temp.helpers.animateElemInView
      });
    } // scroll on desktop


    if (!temp.helpers.deviceWithTouch()) {
      toolkit.scrollTimer.push(temp.helpers.animateElemInView);
    }
  });
})(jQuery);