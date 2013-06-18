/*
**  script for uxFramework Label widget
**  updated 2013.06.18
**  develop by evo2mind
**
**  Depends:
**      jquery.ui.core.js
**      jquery.ui.widget.js
*/

(function($) {
    "use strict";

	$.widget('uxFramework.uxLabel', {
		version: '1.1.0',
		defaultElement: '<label>',
		widgetEventPrefix: 'uxLabel',
		widgetCssPrefix: 'ux-label',
        widgetStateValue: 'default',
		options: {
            value: '',
            inlineLabel: '',
            inputMessage: '',
            maxChars: 80
		},

		_create: function() {
            this._draw();
            this._initOptions();
		},

        _initOptions: function() {
            if(this.options.value !== ''){
                this.value(this.options.value);
            }

            if(this.options.inputMessage !== ''){
                this.showInputMessage(this.options.inputMessage);
            }else{
                this.hideInputMessage();
            }
        },

		_draw: function() {
			var elemClasses = this.element.attr('class');
            this.uxLabel = this.element
                .removeAttr('class')
                .addClass('ux-widget-label')
                .addClass('ui-helper-reset')
                .wrap(this._uxWidgetLabelWrapperHtml())
                .parent()
                .wrap(this._uxWidgetWrapperHtml())
                .parent()
                .prepend(this._uxWidgetInfoWrapperHtml().append(this._uxWidgetInfoHtml()));
            this.uxLabel.addClass(elemClasses);

            if(this.element.is('input')){
                this.element
                    .attr('readonly', 'readonly');
            }
		},
        _uxWidgetWrapperHtml: function(){
            var elemWidget = $('<div></div>');
            elemWidget.addClass('ux-widget')
                .addClass(this.widgetCssPrefix)
                .addClass('ui-helper-reset')
                .addClass('ui-state-default')
                .addClass('ui-widget-content');
            return elemWidget;
        },
        _uxWidgetLabelWrapperHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-wrapper-label');
            return elemWrapper;
        },
        _uxWidgetInfoWrapperHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-wrapper-info');
            return elemWrapper;
        },

        _uxWidgetInfoHtml: function(){
            var elemInfo = $('<span></span>');
            elemInfo.addClass('ui-icon')
                .addClass('ui-icon-info');
            return elemInfo;
        },

        showInputMessage: function(inputMessage) {
            this.uxLabel
                .find('.ux-widget-wrapper-info')
                .show();
            this.setInputMessage(inputMessage);
        },
        hideInputMessage: function() {
            this.uxLabel
                .find('.ux-widget-wrapper-info')
                .hide();
        },

        setInputMessage: function(inputMessage) {
            this.uxLabel
                .find('.ux-widget-wrapper-info')
                .attr('title', inputMessage);
        },

        _setOption: function(key, value) {
            switch(key) {
                case 'value':
                    this.value(value);
                    break;
                case 'inputMessage':
                    this.setInputMessage(value);
                    break;

            }
        },

        value: function(val){
            if(val === undefined){
                return this.element.val();
            }else{
                this.element.val(val.substring(0, this.options.maxChars));
                return this;
            }
        },

        widgetState: function(){
            return this.widgetStateValue;
        },

        _destroy: function() {
            var elemClasses = this.uxLabel.attr('class');
            elemClasses.removeClass('ux-widget')
                .removeClass(this.widgetCssPrefix)
                .removeClass('ui-helper-reset')
                .removeClass('ui-state-default')
                .removeClass('ui-widget-content');
            this.element
                .removeAttr('title')
                .removeAttr('maxlength')
                .attr('class', elemClasses);
            this.uxLabel.replaceWith(this.element);
        },

		widget: function() {
            return this.uxLabel;
        }

	});

})(jQuery);