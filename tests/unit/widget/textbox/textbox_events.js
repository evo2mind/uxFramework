/*global module, ok, equal, expect, test */

(function($){
    "use strict";

    module('uxTextbox: events');


    test('focus without inline label', function(){
        expect(3);

        var uxTextbox = $('#uxTextbox').uxTextbox(),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.focus();
        equal('default', uxTextbox.uxTextbox('widgetState'), 'widget has default state ');
        ok(wrapper.hasClass('ui-state-default'), 'widget wrapper has ui-state-default class');

        ok(!wrapper.find('.ux-widget-inline-label').html(), 'widget don\'t has inline label text');

    });

    test('focus with inline label', function(){
        expect(3);

        var inlineLabel = 'Steve Jobs',
            uxTextbox = $('#uxTextbox').uxTextbox({
                inlineLabel: inlineLabel
            }),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.focus();
        equal('default', uxTextbox.uxTextbox('widgetState'), 'widget has default state ');
        ok(wrapper.hasClass('ui-state-default'), 'widget wrapper has ui-state-default class');

        ok(wrapper.find('.ux-widget-inline-label').html(), 'widget has inline label text');
    });

    test('focus without input message', function(){
        expect(7);

        var uxTextbox = $('#uxTextbox').uxTextbox({
                isRequired: true
            }),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.focus();
        equal('default', uxTextbox.uxTextbox('widgetState'), 'widget has default state ');
        ok(wrapper.hasClass('ui-state-default'), 'widget wrapper has ui-state-default class');

        ok(!wrapper.find('.ux-widget-wrapper-info').is(':visible'), 'widget input message doesn\'t visible');

        uxTextbox.blur();
       //setTimeout(function() {
            equal('error', uxTextbox.uxTextbox('widgetState'), 'widget will show error cause it\'s required field');
            ok(!wrapper.find('.ux-widget-wrapper-info').is(':visible'), 'widget input message doesn\'t visible in widget error state');
        //    start();
        //}, 100);


        uxTextbox.focus()
            .uxTextbox('value', 'eVo')
            .blur();
        //setTimeout(function() {
            equal('validated', uxTextbox.uxTextbox('widgetState'), 'widget will show validated state when inputed text');
            ok(!wrapper.find('.ux-widget-wrapper-info').is(':visible'), 'widget input message doesn\'t visible in widget validated state');
            //start();
        //}, 100);
    });

    test('focus with input message', function(){
        expect(7);

        var uxTextbox = $('#uxTextbox').uxTextbox({
                isRequired: true,
                inputMessage: 'you did great job'
            }),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.focus();
        equal('default', uxTextbox.uxTextbox('widgetState'), 'widget has default state ');
        ok(wrapper.hasClass('ui-state-default'), 'widget wrapper has ui-state-default class');

        ok(wrapper.find('.ux-widget-wrapper-info').is(':visible'), 'widget input message visible');

        uxTextbox.blur();
        equal('error', uxTextbox.uxTextbox('widgetState'), 'widget will show error cause it\'s required field');
        ok(!wrapper.find('.ux-widget-wrapper-info').is(':visible'), 'widget input message doesn\'t visible in widget error state');

        uxTextbox.focus()
            .uxTextbox('value', 'eVo')
            .blur();
        equal('validated', uxTextbox.uxTextbox('widgetState'), 'widget will show validated state when text inputed');
        ok(!wrapper.find('.ux-widget-wrapper-info').is(':visible'), 'widget input message doesn\'t visible in widget validated state');

    });

    test('keypress', function(){
        expect(4);

        var inlineLabel = 'Steve Jobs',
            uxTextbox = $('#uxTextbox').uxTextbox({
                inlineLabel: inlineLabel
            }),
            wrapper = uxTextbox.uxTextbox('widget');

        ok(wrapper.find('.ux-widget-inline-label').is(':visible'), 'inline label visible before widget focused');

        uxTextbox.focus();
        ok(wrapper.find('.ux-widget-inline-label').is(':visible'), 'inline label visible when widget focused');

        uxTextbox.val('eVo')
            .keydown()
            .keyup();
        ok(!wrapper.find('.ux-widget-inline-label').is(':visible'), 'inline label not visible when keypressed');

        uxTextbox.val('')
            .keydown()
            .keyup();
        ok(wrapper.find('.ux-widget-inline-label').is(':visible'), 'inline label visible when keypressed and input value empty');
    });

    test('blur', function(){
        expect(5);
        var uxTextbox = $('#uxTextbox').uxTextbox({
                inlineLabel: 'eVo',
                inputMessage: 'please input text here',
                isRequired: true
            }),
            wrapper = uxTextbox.uxTextbox('widget');

        uxTextbox.focus();
        equal('default', uxTextbox.uxTextbox('widgetState'), 'widget has default state ');

        uxTextbox.blur();
        equal('error', uxTextbox.uxTextbox('widgetState'), 'widget will show error cause it\'s required field');
        ok(wrapper.hasClass('ui-state-error'), 'widget has ui-state-error class');

        uxTextbox.focus()
            .val('eVo')
            .blur();
        equal('validated', uxTextbox.uxTextbox('widgetState'), 'widget will show validated state when text inputed');
        ok(wrapper.hasClass('ui-state-highlight'), 'widget has ui-state-validated class');

    });

})(jQuery);
