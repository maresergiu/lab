"use strict";

/*
 * ---------------------------------------- *
 * ProjectName JavaScripts                  *
 * ---------------------------------------- *
 */
// project namespace
window.lab || (window.lab = {});

(function ($) {
  function siteHeaderMod() {
    var burgerTimer;
    lab.cache.$header.find('.burger').on('click', function () {
      var $thisBurger = $(this);
      $thisBurger.parent().find('.nav-element').removeClass('anim');
      clearTimeout(burgerTimer);
      burgerTimer = setTimeout(function () {
        $thisBurger.toggleClass('active');

        if ($thisBurger.hasClass('active')) {
          lab.helpers.animateElemInView();
        }
      }, lab.cache.timer.fast);
    });
  }

  $(document).ready(function () {
    $.extend(true, lab, {
      cache: toolkit.cache,
      config: toolkit.config,
      helpers: toolkit.helpers
    }); // custom config

    lab.config.breakpoints = {
      MEDIUM_WIDTH: 1200,
      X_MEDIUM_WIDTH: 1024,
      SMALL_WIDTH: 768 // custom delays

    };
    lab.cache.timer = {
      veryFast: 150,
      fast: 300,
      moderated: 500
    }; // custom cache

    lab.cache.$header = $('#site-header');
    lab.cache.$footer = $('#site-footer');
    lab.cache.$main = $('#main'); // if the height of the body is smaller then the page make the bodies height to strech to fit the screen 

    lab.helpers.isContentScrolable(); // detect if js in enable

    lab.cache.$html.toggleClass('no-js js'); // animate the elements that are in the viewport on load

    lab.helpers.animateElemInView(); // global modules

    if (lab.cache.$header.length) {
      siteHeaderMod();
    } // window events
    // -------------
    // avoiding the momentum scrolling on mobile and trigger animations


    if (lab.helpers.deviceWithTouch()) {
      lab.cache.$window.on({
        'scroll': lab.helpers.animateElemInView
      });
    } else {
      toolkit.scrollTimer.push(lab.helpers.animateElemInView);
    }
  });
})(jQuery);