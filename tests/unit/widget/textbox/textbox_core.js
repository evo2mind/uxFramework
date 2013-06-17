/*global test, expect, ok */

(function($){
    "use strict";

    test('structural', function(){
        expect(8);

        var uxTextbox = $('#uxTextbox').uxTextbox().uxTextbox('widget');

        ok(uxTextbox.find('.ux-widget-wrapper-input').is('*'), 'wrapper for input element exist');

        ok(uxTextbox.find('.ux-widget-wrapper-info').is('*'), 'wrapper for information element exist');
        ok(uxTextbox.find('.ux-widget-wrapper-info > .ui-icon-info').is('*'), 'icon for information element exist');

        ok(uxTextbox.find('.ux-widget-wrapper-error').is('*'), 'wrapper for error element exist');
        ok(uxTextbox.find('.ux-widget-wrapper-error > .ui-icon-notice').is('*'), 'icon for error element exist');


        ok(uxTextbox.find('.ux-widget-wrapper-validated').is('*'), 'wrapper for validated element exist');
        ok(uxTextbox.find('.ux-widget-wrapper-validated > .ui-icon-check').is('*'), 'icon for validated element exist');

        ok(uxTextbox.find('.ux-widget-inline-label').is('*'), 'inline label element exist');

    });

    test('default state', function(){
        expect(3);

        var uxTextbox = $('#uxTextbox').uxTextbox().uxTextbox('widget');

        ok(uxTextbox.hasClass('ui-state-default'), 'widget default state defined');
        ok(!uxTextbox.hasClass('ui-state-error'), 'widget is not at error state');
        ok(!uxTextbox.hasClass('ui-state-highlight'), 'widget is not at validated state');

    });

})(jQuery);
