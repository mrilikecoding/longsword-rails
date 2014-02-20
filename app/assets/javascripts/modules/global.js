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


    /* Public Methods _________________________________________________________________ */

    /**
     The initialization of the page and plugins used in the page.
     @method init
     @return {Null} No return value
     **/

    function init() {

    }


    /* Private Methods ________________________________________________________________ */

    return {
        init: init
    };

}(jQuery, document, window, undefined));


jQuery(function() {
    "use strict";
    Longsword.global.init();
});
