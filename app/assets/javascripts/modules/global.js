// JQuery config

$.ajaxSetup(
    {
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
    });


/**
 Longsword Global JS

 @class global
 @namespace Longsword
 @type {Object}
 **/
var Longsword = Longsword || {};


Longsword.global = (function($, document, window, undefined) {
    "use strict";

    // configuration properties
    var $navbar;


    /* Public Methods _________________________________________________________________ */

    /**
     The initialization of the page and plugins used in the page.
     @method init
     @return {Null} No return value
     **/

    function init() {
        $navbar = $('#navbar')


        $navbar.affix({
            offset: {
                top: function() {
                    return (this.top = ($('.header-wrapper').outerHeight(true) - $navbar.height()));
                }
            }
        });

        $('body').scrollspy({ target: '.scrollspy-target' , offset: 75 });


        $(document)
            .on('click', '#contact', showContact)
            .on('click', '.close-contact', closeTray)



        //  smooth scroll
        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });

    }


    /* Private Methods ________________________________________________________________ */


    function showContact(e) {
        e.preventDefault;

        if ($('#contact-tray').hasClass('open')){
            closeTray();
        } else if ($('.affix-top')){
            $('#contact-tray').addClass('open');
            $('.navbar').animate({'bottom' : $('#contact-tray').css('height')});
            $('#contact-tray').slideDown();

        } else {
            $('#contact-tray').slideDown();
        }
    }

    function closeTray() {
        $('#contact-tray').removeClass('open').slideUp();
        if ($('.affix-top')){
            $('#contact-tray').slideUp();
            $('.navbar').animate({'bottom' : 0});
        }
    }

    return {
        init: init
    };

}(jQuery, document, window, undefined));


jQuery(function() {
    "use strict";
    Longsword.global.init();
});
