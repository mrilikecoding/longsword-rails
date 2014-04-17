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
    var $navbar,
        $carousels;


    /* Public Methods _________________________________________________________________ */

    /**
     The initialization of the page and plugins used in the page.
     @method init
     @return {Null} No return value
     **/

    function init() {
        $navbar = $('#navbar');

        setTimeout(initSliders, 0);

        $navbar.affix({
            offset: {
                top: function() {
                    return (this.top = ($('.header-wrapper').outerHeight(true) - $navbar.height()));
                }
            }
        });

        $('body').scrollspy({ target: '.scrollspy-target' , offset: 200 });


        $(document)
            .on('click', '#contact', showContact)
            .on('click', '.close-contact', closeTray)
            .on('click', '.global-arrow-left', prevCarousel)
            .on('click', '.global-arrow-right', nextCarousel );

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
            $('.contact-link', '#navbar').addClass('active');
            $('.navbar').animate({'bottom' : $('#contact-tray').css('height')});
            $('#contact-tray').slideDown();

        } else {
            $('#contact-tray').slideDown();
        }
    }

    function closeTray() {
        $('#contact-tray').removeClass('open').slideUp();
        $('.contact-link', '#navbar').removeClass('active');
        if ($('.affix-top')){
            $('#contact-tray').slideUp();
            $('.navbar').animate({'bottom' : 0});
        }
    }

    function initSliders(){
        var $patio = $('#patio'),
            $vineyard = $('#vineyard'),
            $parasailing = $('#parasailing'),
            $about = $('#about');

        var sliderConfig = {
            auto: {
                play: false
            },
            height: 'variable',
            width: '100%',
            circular: true,
            infinite: true,
            items: {
                width: 'variable',
                height: 'variable',
                visible: 'odd+2'
            }
        }

        $(window).load(function(){
            $('.slider', $patio).carouFredSel(sliderConfig);
            $('.slider', $vineyard).carouFredSel(sliderConfig);
            $('.slider', $parasailing).carouFredSel(sliderConfig);
            $('.slider', $about).carouFredSel(sliderConfig);

        });

    }


    function nextCarousel(){
        console.log('next');
        console.log($(this).closest('.slider'));
        $(this).closest('.slider-wrapper').find('.slider').trigger('next');
    }

    function prevCarousel(){
        $(this).closest('.slider-wrapper').find('.slider').trigger('prev');
    }



    return {
        init: init
    };

}(jQuery, document, window, undefined));


jQuery(function() {
    "use strict";
    Longsword.global.init();
});
