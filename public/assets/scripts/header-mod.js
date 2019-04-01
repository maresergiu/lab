"use strict";

(function ($) {
  function headerMod() {
    var headerObj = {
      cache: {
        $siteHeader: $(this),
        burgerTimer: {}
      },
      events: function events() {
        headerObj.cache.$siteHeader.find('.burger').on('click', function () {
          var $thisBurger = $(this);
          clearTimeout(headerObj.cache.burgerTimer);
          headerObj.cache.burgerTimer = setTimeout(function () {
            if (!$thisBurger.hasClass('active')) {
              $thisBurger.parent().find('.nav-element').removeClass('anim');
            }

            $thisBurger.toggleClass('active');

            if ($thisBurger.hasClass('active')) {
              lab.helpers.animateElemInView();
            }
          }, lab.cache.timer.fast);
        });
      },
      init: function init() {
        return headerObj.events();
      }
    };
    headerObj.init();
  }

  $(document).ready(function () {
    lab.cache.$header.each(headerMod);
  });
})(jQuery);