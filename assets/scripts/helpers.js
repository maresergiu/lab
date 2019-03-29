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
    // calling the scroll plugin
    scrollBarPlug: function ($starPoint, plugInObj) {
        if (lab.cache.$window.width() > lab.config.breakpoints.X_MEDIUM_WIDTH) {
            var settings = typeof plugInObj === 'undefined' ? {} : plugInObj;

            $starPoint.mCustomScrollbar(settings);
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
    // populate dropdown for auto complete
    dropDownAutocomplete: function ($path, results, []) {
        var currentPlugins = '';

        // storing all needed plugins in a string
        arguments[arguments.length - 1].forEach(function (thisPlugIn) {
            currentPlugins += (' ' + thisPlugIn);
        });

        // int the plug-in
        $path.textext({
            plugins: currentPlugins
        }).bind('getSuggestions', function (e, data) {
            var list = results,
                textext = $(e.target).textext()[0],
                query = (data ? data.query : '') || '';

            $(this).trigger(
                'setSuggestions',
                { result: textext.itemManager().filter(list, query) }
            );
        });
    },
    // create an objectthat will be a blue print of a form selection 
    stringifyFilters: function ($starPoint) {
        var $filterRows = $starPoint.find('.field'),
            filtersObj = {},
            key = '',
            subKey = '',
            $subFields;

        $filterRows.each(function () {
            var $thisFilterRow = $(this),
                $fieldInputs = $thisFilterRow.find('input'),
                elementHasSubFields = $thisFilterRow.data('sub-fields');

            key = $thisFilterRow.data('name');

            if (elementHasSubFields) {
                $subFields = $filterRows.find('.sub-field');

                $subFields.each(function () {
                    var $thisSubField = $(this);

                    subKey = key + '-' + $thisSubField.data('name');
                    filtersObj[subKey] = [];
                    filtersObj[subKey].push(Number($thisSubField.find('input').val()));
                });

            } else {
                filtersObj[key] = [];

                if ($thisFilterRow.data('input') === 'text' && $fieldInputs.val().length) {
                    filtersObj[key].push($fieldInputs.val());
                } else if ($thisFilterRow.data('input') === 'checkbox') {
                    $fieldInputs.each(function (index) {
                        var $thisCheckbox = $(this),
                            filterDefaultValue = 'All ';

                        if ($thisCheckbox.prev().hasClass('checked')) {
                            filtersObj[key].push($thisCheckbox.prop('name'));
                        }

                        // if filter related properties and regions is empty on click over the CTA the default value is selected
                        if (index === ($fieldInputs.length - 1) && filtersObj[key].length === 0) {
                            filterDefaultValue += key;
                            filtersObj[key].push(filterDefaultValue);
                        }
                    });
                }
            }
        });

        // this stringfy obj will be passed as a parameter in the request
        filtersObj = JSON.stringify(filtersObj);
        return filtersObj;
    },
    // standard ajax call
    ajaxCall: function (typeOfRequest, url, data, doneMethod, failMethod) {
        $.ajax({
            method: typeOfRequest,
            url: url,
            data: data
        }).done(function (response) {
            doneMethod(response);
        }).fail(function (response) {
            failMethod(response);
        });
    },
    // change the url 
    pageNewUrl: function (path) {
        var newPath = window.location.origin + path;

        // load the map page 
        document.location.replace(newPath);
    },
    // toggle the loader visibility
    toggleLoader: function () {
        var $loader = lab.cache.$main.find('.loader-mod');

        // reset the view
        lab.helpers.isContentScrolable();

        if ($loader.hasClass('anim')) {
            $loader.removeClass('anim');
        } else {
            $loader.addClass('anim');
        }
    },
    // generate markup with handlebars
    generateTemplate: function (id, data) {
        var $source = $(id).html(),
            template = Handlebars.compile($source),
            markup = template(data);

        return markup;
    },
    // check if the page content is bigger that window's height
    isContentScrolable: function () {
        lab.cache.$html.removeClass('sp');

        // if map page is present and the page is loaded on desktop or the height of the body is smaller then the height of window  
        if ((lab.cache.$body.hasClass('map-page') && lab.cache.$window.width() > lab.config.breakpoints.X_MEDIUM_WIDTH) || (lab.cache.$body.height() < lab.cache.$window.height())) {
            lab.cache.$html.addClass('sp');
        }
    },
    // animate de elements when entering the viewport
    animateElemInView: function () {
        var $animElem = lab.cache.$main.find('.anim-mod');

        $animElem.each(function () {
            var $thisAnimElem = $(this),
                elemIsInView = lab.helpers.elemIsInView($thisAnimElem),
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
                parentDelay = elemIsInView && (lab.cache.$window.width() > lab.config.breakpoints.SMALL_WIDTH) ? $thisAnimElem.data('delay') : 300;

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