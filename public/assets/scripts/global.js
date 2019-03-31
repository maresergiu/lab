"use strict";

/*
 * ---------------------------------------- *
 * ProjectName JavaScripts                  *
 * ---------------------------------------- *
 */
// project namespace
window.lab || (window.lab = {});

(function ($) {
  $(document).ready(function () {
    $.extend(true, lab, {
      cache: toolkit.cache,
      config: toolkit.config,
      helpers: toolkit.helpers
    }); // custom config

    lab.config.breakpoints = {
      TABLET_WIDTH: 992,
      MOBILE_WIDTH: 576 // custom delays

    };
    lab.cache.timer = {
      veryFast: 150,
      fast: 300,
      moderated: 500
    }; // custom cache

    lab.cache.$header = $('#site-header');
    lab.cache.$footer = $('#site-footer');
    lab.cache.$main = $('#main'); // apply styling to all forms

    stylishForms.apply(); // configuration for FormValidation API

    formValidation.init(); // identify browser

    toolkit.client.domApply(); // detect if js in enable

    lab.cache.$html.toggleClass('no-js js'); // animate the elements that are in the viewport on load

    lab.helpers.animateElemInView(); // window events
    // -------------
    // avoiding the momentum scrolling on mobile and trigger animations

    if (lab.helpers.deviceWithTouch()) {
      lab.cache.$window.on({
        'scroll': function scroll() {
          lab.helpers.animateElemInView();
          lab.helpers.fixedHeader();
        }
      });
    } else {
      toolkit.scrollTimer.push(function () {
        lab.helpers.animateElemInView();
        lab.helpers.fixedHeader();
      });
    }
  });
})(jQuery);