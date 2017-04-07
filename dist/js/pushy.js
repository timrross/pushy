/*! Pushy - v1.1.1 - 2016-3-1
 * Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/christophery/pushy/
 * by Christopher Yee
 *
 * Converted to UMD by Tim Ross
 * https://github.com/timrross/pushy/
 * Removed submenu functionality
 * Added class name options.
 *
 **/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function($) {

    var pushy = $('.pushy'), //menu css class
        body = $('body'),
        container = $('#container'), //container css class
        push = $('.push'), //css class to add pushy capability
        pushyLeft = 'pushy-left', //css class for left menu position
        pushyOpenLeft = 'pushy-open-left', //css class when menu is open (left position)
        pushyOpenRight = 'pushy-open-right', //css class when menu is open (right position)
        siteOverlay = $('.site-overlay'), //site overlay
        menuBtn = $('.menu-btn, .pushy-link'), //css classes to toggle the menu
        menuBtnFocus = $('.menu-btn'), //css class to focus when menu is closed w/ esc key
        menuLinkFocus = $(pushy.data('focus')), //focus on link when menu is open
        menuSpeed = 200, //jQuery fallback menu speed
        menuWidth = pushy.width() + 'px'; //jQuery fallback menu width

        //close menu w/ esc key
        $(document).keyup(function(e) {
            //check if esc key is pressed
            if (e.keyCode == 27) {

                //check if menu is open
                if (body.hasClass(pushyOpenLeft) || body.hasClass(pushyOpenRight)) {
                    if (cssTransforms3d) {
                        closePushy(); //close pushy
                    } else {
                        closePushyFallback();
                        opened = false; //set menu state
                    }

                    //focus on menu button after menu is closed
                    if (menuBtnFocus) {
                        menuBtnFocus.focus();
                    }
                }
            }
        });


    function togglePushy() {
        //add class to body based on menu position
        if (pushy.hasClass(pushyLeft)) {
            body.toggleClass(pushyOpenLeft);
        } else {
            body.toggleClass(pushyOpenRight);
        }

        //focus on link in menu after css transition ends
        if (menuLinkFocus) {
            pushy.one('transitionend', function() {
                menuLinkFocus.focus();
            });
        }

    }

    function closePushy() {
        if (pushy.hasClass(pushyLeft)) {
            body.removeClass(pushyOpenLeft);
        } else {
            body.removeClass(pushyOpenRight);
        }
    }

    function openPushyFallback() {
        //animate menu position based on CSS class
        if (pushy.hasClass(pushyLeft)) {
            body.addClass(pushyOpenLeft);
            pushy.animate({
                left: "0px"
            }, menuSpeed);
            container.animate({
                left: menuWidth
            }, menuSpeed);
            //css class to add pushy capability
            push.animate({
                left: menuWidth
            }, menuSpeed);
        } else {
            body.addClass(pushyOpenRight);
            pushy.animate({
                right: '0px'
            }, menuSpeed);
            container.animate({
                right: menuWidth
            }, menuSpeed);
            push.animate({
                right: menuWidth
            }, menuSpeed);
        }

        //focus on link in menu
        if (menuLinkFocus) {
            menuLinkFocus.focus();
        }
    }


    function closePushyFallback() {
        //animate menu position based on CSS class
        if (pushy.hasClass(pushyLeft)) {
            body.removeClass(pushyOpenLeft);
            pushy.animate({
                left: "-" + menuWidth
            }, menuSpeed);
            container.animate({
                left: "0px"
            }, menuSpeed);
            //css class to add pushy capability
            push.animate({
                left: "0px"
            }, menuSpeed);
        } else {
            body.removeClass(pushyOpenRight);
            pushy.animate({
                right: "-" + menuWidth
            }, menuSpeed);
            container.animate({
                right: "0px"
            }, menuSpeed);
            push.animate({
                right: "0px"
            }, menuSpeed);
        }
    }



    //checks if 3d transforms are supported removing the modernizr dependency
    var cssTransforms3d = (function csstransforms3d() {
        var el = document.createElement('p'),
            supported = false,
            transforms = {
                'webkitTransform': '-webkit-transform',
                'OTransform': '-o-transform',
                'msTransform': '-ms-transform',
                'MozTransform': '-moz-transform',
                'transform': 'transform'
            };

        if (document.body !== null) {
            // Add it to the body to get the computed style
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (supported !== undefined && supported.length > 0 && supported !== "none");
        } else {
            return false;
        }
    })();

    if (cssTransforms3d) {

        //toggle menu
        menuBtn.on('click', function() {
            togglePushy();
        });
        //close menu when clicking site overlay
        siteOverlay.on('click', function() {
            togglePushy();
        });
    } else {
        //add css class to body
        body.addClass('no-csstransforms3d');

        //hide menu by default
        if (pushy.hasClass(pushyLeft)) {
            pushy.css({
                left: "-" + menuWidth
            });
        } else {
            pushy.css({
                right: "-" + menuWidth
            });
        }

        //fixes IE scrollbar issue
        container.css({
            "overflow-x": "hidden"
        });

        //keep track of menu state (open/close)
        var opened = false;

        //toggle menu
        menuBtn.on('click', function() {
            if (opened) {
                closePushyFallback();
                opened = false;
            } else {
                openPushyFallback();
                opened = true;
            }
        });

        //close menu when clicking site overlay
        siteOverlay.on('click', function() {
            if (opened) {
                closePushyFallback();
                opened = false;
            } else {
                openPushyFallback();
                opened = true;
            }
        });
    }
}));
