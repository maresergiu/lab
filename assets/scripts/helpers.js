lab.helpers = {
    // check to see if element is above the window
    elemAboveTheWindow: function ($checkElement) {
        if (($checkElement.offset().top + $checkElement.height()) > lab.cache.$window.scrollTop()) {
            return true;
        }
    },
    // check if element is visible on the screen
    elemIsInView: function ($checkElement) {
        if (lab.cache.$window.scrollTop() + lab.cache.$window.height() > $checkElement.offset().top) {
            return true;
        }
    },
    // check if the device has touch screen
    deviceWithTouch: function () {
        var isTouchable;

        try {
            document.createEvent('TouchEvent');
            isTouchable = true;
        } catch (e) {
            isTouchable = false;
        }

        return isTouchable;
    },
    // changes state of header on window scroll
    fixedHeader: function () {
        if (lab.cache.$window.scrollTop() > lab.cache.$header.outerHeight() * 2) {
            if (!lab.cache.$header.hasClass('fixed')) {
                lab.cache.$header.removeClass('slide').addClass('fixed');
                setTimeout(function () {
                    lab.cache.$header.addClass('slide');
                }, lab.cache.timer.fast);
            }
        } else if (lab.cache.$window.scrollTop() < lab.cache.$header.outerHeight() * 2) {
            if (lab.cache.$header.hasClass('fixed')) {
                lab.cache.$header.removeClass('slide fixed');
                setTimeout(function () {
                    lab.cache.$header.addClass('slide');
                }, lab.cache.timer.fast);
            }
        }
    },
    // animate de elements when entering the viewport
    animateElemInView: function () {
        var $animElem = lab.cache.$body.find('.anim-mod');

        $animElem.each(function () {
            var $thisAnimElem = $(this),
                elemIsInView = lab.helpers.elemIsInView($thisAnimElem),
                dataDelay = $thisAnimElem.data('delay'),
                parentDelay;

            function animSubElem($thisAnimElem) {
                // trigger sub-anim animation
                $thisAnimElem.find('.sub-anim-mod').not('.anim').each(function () {
                    var $thisSubAnim = $(this);

                    setTimeout(function () {
                        $thisSubAnim.addClass('anim');
                    }, $thisSubAnim.data('sub-delay'));
                })
            }

            // when there are synchronous animations on the same line
            if (elemIsInView && $thisAnimElem.data('sync')) {
                parentDelay = dataDelay && ($thisAnimElem.data('mobile-reset') && toolkit.cache.$window.width() < lab.config.breakpoints.MOBILE_WIDTH) ? 300 : dataDelay;

                // trigger parent animation
                setTimeout(function () {
                    $thisAnimElem.addClass('anim');
                }, parentDelay);

                // when there is only one animation on a line
            } else if (elemIsInView) {
                $thisAnimElem.addClass('anim');
            }

            // if there are sub animations
            if ($thisAnimElem.data('sub-anim')) {
                animSubElem($thisAnimElem);
            }
        });
    }
}