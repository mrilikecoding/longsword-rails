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
    var $navbar, $header_wrapper,
        $header_height, contactTrayOpen,
        $window = $(window);


    /* Public Methods _________________________________________________________________ */

    /**
     The initialization of the page and plugins used in the page.
     @method init
     @return {Null} No return value
     **/

    function init() {

        contactTrayOpen = false;

        window.scrollTo(0, 1);
        $navbar = $('#navbar');
        $header_wrapper = $('.header-wrapper');


        initSliders();

        $header_wrapper
            .animate({opacity: 0}, 0)
            .animate({opacity: 1}, 1000);


        $navbar.affix({
            offset: {
                top: function () {
                    return (this.top = ($header_wrapper.outerHeight(true) - $navbar.height()));
                }
            }
        });




//        $('body')
//            .scrollspy({ target: '.scrollspy-target' })
//            .on('activate.bs.scrollspy', function(){
//            if ($('.navbar-collapse').hasClass('in')) {
//                resetNav();
//            }
//        });

        $header_height = $header_wrapper.height()

        //home brewed parallax
        $window.scroll(function(e) {
            if ($window.scrollTop() < $header_height){
                var scrolled = $(window).scrollTop();
                $header_wrapper.css({
                    'top':  -(scrolled * 0.2) + 'px',
                    'position': 'fixed'
            });
            } else {
                $header_wrapper.css('position', 'static');
            }
        });

        $(document)
            .on('click', '#contact', showContact)
            .on('click', '.close-contact', closeTray)
            .on('click', '.global-arrow-left', prevCarousel)
            .on('click', '.global-arrow-right', nextCarousel )
            .on('click', '#nav-toggle', function(){
                this.classList.toggle( "active" );
                orientNav();
                closeTray();

            });

        //  smooth scroll
        $(function() {
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 150
                        }, 1000);
                        return false;
                    }
                }
            });
        });

        //load google map
        $('#mapModal').on('shown.bs.modal', init_map);

    }


    /* Private Methods ________________________________________________________________ */


    function init_map(){
        var map, marker, infowindow;

        var myOptions= {
            zoom:11,
            center: new google.maps.LatLng (42.313868, -122.968878),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map (document.getElementById ("gmap_canvas"),myOptions);

        marker = new google.maps.Marker ({map: map, position: new google.maps.LatLng (42.233042, -123.05580900000001)});

        infowindow = new google.maps.InfoWindow ({
            content:"LongSword Vineyard"
        });

        google.maps.event.addListener (marker, "click", function(){
            infowindow.open(map,marker);
        });

    }


    function resetNav(){
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggle').removeClass('active');
        if (contactTrayOpen){
            closeTray();
        }
    }

    function orientNav(){
       var $navbar = $('#navbar'),
           $collapse = $('.navbar-collapse');

       if (!$navbar.hasClass('affix') && $('body').scrollTop() <= 100){
           $('html,body').animate({
               scrollTop: 145
           }, 500);
       }
    }

    function showContact(e) {
        e.preventDefault;

        resetNav();

        if (contactTrayOpen){
            closeTray();
        } else if ($('.affix-top')){
            $('#contact-tray').addClass('open');
            $('.contact-link', '#navbar').addClass('active');
            $('.navbar').animate({'bottom' : $('#contact-tray').css('height')});
            $('#contact-tray').slideDown();
            contactTrayOpen = true;

        } else {
            $('#contact-tray').slideDown();
            contactTrayOpen = false;
        }
    }

    function closeTray() {
        $('#contact-tray').removeClass('open').slideUp();
        $('.contact-link', '#navbar').removeClass('active');
        contactTrayOpen = false;
        if ($('.affix-top')){
            $('#contact-tray').slideUp();
            $('.navbar').animate({'bottom' : 0});
        }
    }

    function initSliders(){

        var $patio = $('#patio'),
            $vineyard = $('#vineyard'),
            $parasailing = $('#parasailing'),
            $about = $('#about'),
            config = {};


        config.global = {
            auto: {
                play: true
            },
            height: 'variable',
            width: '100%',
            infinite: true,
            circular: true,
            swipe: {
                onTouch: true
            },
            scroll: {
                duration: 900,
                fx: 'fade',
                easing: 'linear',
                pauseOnHover: true
            }


        };


        config.patio = $.extend(true, clone(config.global), {
            items: {
                width: 'variable',
                height: 'variable',
                visible: '1'
            }

        });

        config.vineyard = $.extend(true, clone(config.global), {
            align: "left",
            items: {
                width: 'variable',
                height: 'variable',
                visible: 'odd+2'
            },
            auto: {
                play: false
            }
        });

        config.parasailing = $.extend(true, clone(config.global), {

        });

        config.about = $.extend(true, clone(config.global), {

        });

        $(window).load(function(){

            $('.slider', $patio).carouFredSel(config.patio);
            $('.slider', $vineyard).carouFredSel(config.vineyard);
            $('.slider', $parasailing).carouFredSel(config.parasailing);
            $('.slider', $about).carouFredSel(config.about);

        });

    }


    // helper function to copy objects rather than pass reference
    function clone(obj){
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = obj.constructor();

        for(var key in obj)
            temp[key] = clone(obj[key]);
        return temp;
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
