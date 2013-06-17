/* global module, test, expect, ok, domEqual, equal */

(function($){
    "use strict";

    module('uxTextbox: methods');

    test( "destroy", function() {
        expect( 1 );
        domEqual( "#uxTextbox", function() {
            $( "#uxTextbox" ).spinner().spinner( "destroy" );
        });
    });

    test('widget error state without error message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.uxTextbox('showError');
        ok(wrapper.hasClass('ui-state-error'), 'widget has error state');
        ok(!wrapper.hasClass('ui-state-default'), 'widget doesn\'t has default state');
        ok(!wrapper.hasClass('ui-state-highlight'), 'widget doesn\'t has validated state');
        ok(!wrapper.find('.ux-widget-wrapper-error').attr('title'), 'widget doesn\'t has error message');

    });

    test('widget error state with error message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget'),
            errorMessage = 'test error message';

        uxTextbox.uxTextbox('showError', errorMessage);
        ok(wrapper.hasClass('ui-state-error'), 'widget with error message has error state');
        ok(!wrapper.hasClass('ui-state-default'), 'widget with error message doesn\'t has default state');
        ok(!wrapper.hasClass('ui-state-highlight'), 'widget with error message doesn\'t has validated state');
        equal(errorMessage, wrapper.find('.ux-widget-wrapper-error').attr('title'), 'widget with error message defined');

    });

    test('widget change from error state to default state without error message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.uxTextbox('showError');

        uxTextbox.uxTextbox('hideError');
        ok(!wrapper.hasClass('ui-state-error'), 'widget doesn\'t has error state');
        ok(wrapper.hasClass('ui-state-default'), 'widget back to default state');
        ok(!wrapper.hasClass('ui-state-highlight'), 'widget doesn\'t has validated state');
        ok(!wrapper.find('.ux-widget-wrapper-error').attr('title'), 'widget doesn\'t has error message');

    });

    test('widget change from error state to default state with error message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.uxTextbox('showError', 'test error message');

        uxTextbox.uxTextbox('hideError');
        ok(!wrapper.hasClass('ui-state-error'), 'widget doesn\'t has error state');
        ok(wrapper.hasClass('ui-state-default'), 'widget back to default state');
        ok(!wrapper.hasClass('ui-state-highlight'), 'widget doesn\'t has validated state');
        ok(!wrapper.find('.ux-widget-wrapper-error').attr('title'), 'widget doesn\'t has error message');

    });

    test('widget validated state without validation message', function(){
        expect(3);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.uxTextbox('showValidated');
        ok(!wrapper.hasClass('ui-state-error'), 'widget doesn\'t has error state');
        ok(!wrapper.hasClass('ui-state-default'), 'widget doesn\'t has default state');
        ok(wrapper.hasClass('ui-state-highlight'), 'widget has validated state');

    });

    test('widget validated state with validation message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget'),
            validationMessage = 'test validation message';

        uxTextbox.uxTextbox('showValidated', validationMessage);
        ok(!wrapper.hasClass('ui-state-error'), 'widget with error message has error state');
        ok(!wrapper.hasClass('ui-state-default'), 'widget with error message doesn\'t has default state');
        ok(wrapper.hasClass('ui-state-highlight'), 'widget with error message doesn\'t has validated state');
        equal(validationMessage, wrapper.find('.ux-widget-wrapper-validated').attr('title'), 'widget with validation message defined');

    });

    test('widget change from validated state to default state without validation message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.uxTextbox('showValidated');

        uxTextbox.uxTextbox('hideValidated');
        ok(!wrapper.hasClass('ui-state-error'), 'widget doesn\'t has error state');
        ok(wrapper.hasClass('ui-state-default'), 'widget back to default state');
        ok(!wrapper.hasClass('ui-state-highlight'), 'widget doesn\'t has validated state');
        ok(wrapper.find('.ux-widget-wrapper-validated').attr('title'), 'widget has validation message');

    });

    test('widget change from validated state to default state with validation message', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget'),
            validationMessage = 'test validation message';

        uxTextbox.uxTextbox('showValidated', validationMessage);

        uxTextbox.uxTextbox('hideValidated');
        ok(!wrapper.hasClass('ui-state-error'), 'widget doesn\'t has error state');
        ok(wrapper.hasClass('ui-state-default'), 'widget back to default state');
        ok(!wrapper.hasClass('ui-state-highlight'), 'widget doesn\'t has validated state');
        equal(validationMessage, wrapper.find('.ux-widget-wrapper-validated').attr('title'), 'widget doesn\'t has validation message');

    });

    test('widget validation', function(){
        expect(2);
        var uxTextbox = $('#uxTextbox').uxTextbox();

        ok(uxTextbox.uxTextbox('validation'), 'widget with empty value will return true value');
        uxTextbox.val('validation testing');
        ok(uxTextbox.uxTextbox('validation'), 'widget with string value will return true value');

    });

    test('widget validation mandatory / isRequired', function(){
        expect(2);
        var uxTextbox = $('#uxTextbox').uxTextbox({
                                            isRequired: true
                                        });

        ok(!uxTextbox.uxTextbox('validation'), 'widget with empty value will return false value');
        uxTextbox.val('validation testing');
        ok(uxTextbox.uxTextbox('validation'), 'widget with string value will return true value');

    });

    test('widget max char input', function(){
        expect(3);
        var maxLength = 10,
            uxTextbox = $('#uxTextbox').uxTextbox({
            maxChars: maxLength
        });

        equal(maxLength, uxTextbox.attr('maxlength'), 'test maximum inputed char');

        uxTextbox.uxTextbox('value', 'testing inputed chars more than 10 chars');
        equal(maxLength, uxTextbox.val().length, 'test input element inputed string length');
        equal(maxLength, uxTextbox.uxTextbox('value').length, 'test widget inputed string length');

    });

    test('widget set value function', function(){
        expect(4);
        var uxTextbox = $('#uxTextbox').uxTextbox({
                                            isRequired: true
                                        });

        uxTextbox.uxTextbox('value', '');
        equal(false, uxTextbox.uxTextbox('isValidated'), 'inputed empty string value will return widget isValidated false value');
        equal('error', uxTextbox.uxTextbox('widgetState'), 'inputed empty string value will set widget to error state');

        uxTextbox.uxTextbox('value', 'testing inputed value');
        equal(true, uxTextbox.uxTextbox('isValidated'), 'inputed right string value will return widget isValidated true value');
        equal('validated', uxTextbox.uxTextbox('widgetState'), 'inputed right string value will set widget to validated state');
    });



})(jQuery);
