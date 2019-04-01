"use strict";

$(document).ready(function () {
  var footerCarouselFrames = function footerCarouselFrames() {
    var windowWidth = toolkit.cache.$window.width();

    if (windowWidth < lab.config.breakpoints.MOBILE_WIDTH) {
      return 1;
    } else if (windowWidth < lab.config.breakpoints.TABLET_WIDTH) {
      return 3;
    }

    return 6;
  }; // the carousel from the hero module


  lab.cache.$main.find('.mod-carousel').modCarousel({
    modes: {
      slide: true,
      // slide or fade mode
      infinite: true,
      // slide infinitely
      responsive: true,
      // responsively fill container dimensions
      nudge: true // hover over step controls will nudge carousel position in slide direction

    },
    controls: {
      step: true,
      // next or previous slide controls
      pager: true,
      // pagination controls will be build by the module
      playback: false // stop/play carousel controls

    },
    rotate: {
      auto: false,
      // auto rotate
      direction: 'right',
      // slide direction
      interval: 4000,
      // interval between transitions
      duration: 1000,
      // transition duration
      type: 'quad',
      // easing algorithm
      step: 6 // number of slides to step when animating (useful in conjunction with dimensions.slidesInFrame)

    },
    dimensions: {
      heightControl: true,
      // control height of slides
      fixedHeight: false,
      // height does not change
      maxHeight: 600,
      // grow in height no larger than this value
      baseWidth: 1200,
      // starting width from which to base scaling
      slidesInFrame: 1 // number of visible slides to show

    },
    options: {
      preload: false,
      stickySlides: true,
      // requires Cookie, retain slide position between page loads
      setSlide: 0,
      // initialised slide
      visibleClassAfter: true,
      // add visible class in DOM after the rotation has finished
      maskedOverflow: false,
      // add masked overflow either side of the carousel
      touchControl: true // allow touch controls

    }
  });
  lab.cache.$footer.find('.mod-carousel').modCarousel({
    modes: {
      slide: true,
      // slide or fade mode
      infinite: true,
      // slide infinitely
      responsive: true,
      // responsively fill container dimensions
      nudge: true // hover over step controls will nudge carousel position in slide direction

    },
    controls: {
      step: true,
      // next or previous slide controls
      pager: true,
      // pagination controls will be build by the module
      playback: false // stop/play carousel controls

    },
    rotate: {
      auto: false,
      // auto rotate
      direction: 'right',
      // slide direction
      interval: 4000,
      // interval between transitions
      duration: 1000,
      // transition duration
      type: 'quad',
      // easing algorithm
      step: 6 // number of slides to step when animating (useful in conjunction with dimensions.slidesInFrame)

    },
    dimensions: {
      heightControl: true,
      // control height of slides
      fixedHeight: false,
      // height does not change
      maxHeight: 600,
      // grow in height no larger than this value
      baseWidth: 1200,
      // starting width from which to base scaling
      // number of visible slides to show
      slidesInFrame: footerCarouselFrames()
    },
    options: {
      preload: false,
      stickySlides: true,
      // requires Cookie, retain slide position between page loads
      setSlide: 0,
      // initialised slide
      visibleClassAfter: true,
      // add visible class in DOM after the rotation has finished
      maskedOverflow: false,
      // add masked overflow either side of the carousel
      touchControl: true // allow touch controls

    }
  });
});