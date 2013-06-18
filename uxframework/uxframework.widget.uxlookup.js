/*
**  script for uxFramework uxLookup Widget
**  updated 2013.06.18
**  develop by evo2mind
**
**  Depends:
**      jquery.ui.core.js
**      jquery.ui.widget.js
**      jquery.ui.position.js
**      jquery.ui.menu.js
**      jquery.ui.autocomplete.js
*/

(function($) {
    "use strict";

    $.widget('uxFramework.uxLookup', $.uxFramework.uxTextbox, {
		version: '1.1.0',
		defaultElement: '<input>',
		widgetEventPrefix: 'uxLookup',
        widgetCssPrefix: 'ux-lookup',
        widgetStateValue: 'default',
		options: {
            value: '',
            inlineLabel: '',
            errorMessage: '',
            inputMessage: '',
            validatedMessage: 'validated',
            maxChars: 80,
            isRequired: false,
            isReadonly: false,
            isDisabled: false,
            inputFilter: null,
            inputFormat: null,
            buttonOptions: {
                icons: {
                  primary: 'ui-icon-search'
                },
                text: false
            },
            action: null
		},

		_create: function() {
            this._draw();
            this._drawLookup();
            this._initOptions();
            this._on(this._events);
            this._attachButtonSelectEvents();
		},

        _events: {
            focus: function(evt) {
                if(this.actionTriggered === undefined){
                    this.showDefault();
                    //this.options.action();
                    this.actionTriggered = true;
                }
            },
            click: function(){
                this.showDefault();
            },
            blur: function() {
                if(this.element.val() === ''){
                    this.showInlineLabel();
                }
                this.validation();
                delete this.actionTriggered;
            }
        },

        _drawLookup: function(){
            var elemId = this.element.attr('id'),
                elemName = this.element.attr('name');
            this.uxTextbox
                .addClass('ux-textbox')
                .prepend(this._uxWidgetWrapperButtonSelectHtml().append(this._uxWidgetButtonSelectHtml()))
                .find('.ux-widget-wrapper-input')
                .prepend(this._uxWidgetHiddenInputHtml());
            this.uxTextbox
                .find('.ux-widget-hidden-input')
                //.attr('id', elemId)
                .attr('name', elemName);
            this.element
                //.removeAttr('id')
                .removeAttr('name')
                .attr('readonly', 'readonly');
            this.uxLookup = this.uxTextbox;
        },
        _uxWidgetWrapperButtonSelectHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-button-select');
            return elemWrapper;
        },
        _uxWidgetHiddenInputHtml: function(){
            var elemHiddenInput = $('<input type="text" /> ');
            elemHiddenInput.addClass('ux-widget-hidden-input')
                .addClass('ui-helper-reset');
            return elemHiddenInput;
        },
        _uxWidgetButtonSelectHtml: function(){
            var elemButtonSelect = $('<a></a>');
            elemButtonSelect.button(this.options.buttonOptions);
            return elemButtonSelect;
        },

        _setInputValue: function(val){
            this.uxLookup
                .find('.ux-widget-input')
                .val(val);
        },
        _getInputValue: function(){
            return this.uxLookup
                .find('.ux-widget-input')
                .val();
        },

        _setHiddenInputValue: function(val){
            this.uxLookup
                .find('.ux-widget-hidden-input')
                .val(val);
        },
        _getHiddenInputValue: function(){
            return this.uxLookup
                .find('.ux-widget-hidden-input')
                .val();
        },

        value: function(objVal){
            if(objVal === undefined){
                var displayedValue = this._getInputValue(),
                    value = this._getHiddenInputValue();
                if(displayedValue === value){
                    return value;
                }else{
                    return {
                        displayedValue: displayedValue,
                        value: value
                    };
                }
            }else{
                if(objVal !== undefined && (typeof objVal === 'string' || typeof objVal === 'number')){
                    this._setInputValue(objVal);
                    this._setHiddenInputValue(objVal);
                    this.validation();
                }else if(objVal !== undefined && typeof objVal === 'object'){
                    if(objVal.displayedValue !== undefined && objVal.value !== undefined &&
                        (typeof objVal.displayedValue === 'string' || typeof objVal.displayedValue === 'number') &&
                        (typeof objVal.value === 'string' || typeof objVal.value === 'number')){
                        this._setInputValue(objVal.DisplayValue);
                        this._setHiddenInputValue(objVal.value);
                        this.validation();
                    }
                }
            }
        },

        validation: function() {
            if (this.options.isRequired && (this._getHiddenInputValue() === '' || this._getInputValue() === '')) {
                this.showError('Required field cannot be left blank');
                return false;
            } else {
                this.showValidated();
                this.hideInlineLabel();
                return true;
            }
        },

        _attachButtonSelectEvents: function(){
            var widget = this;
            this.uxLookup
                .find('.ux-widget-button-select')
                .click(function(evt){
                    widget.options.action();
                });
        },

        _destroy: function() {
            var elemClasses = this.uxLookup.attr('class');
            elemClasses.removeClass('ux-widget')
                .removeClass(this.widgetCssPrefix)
                .removeClass('ui-helper-reset')
                .removeClass('ui-state-default')
                .removeClass('ui-widget-content');
            this.element
                .removeAttr('title')
                .removeAttr('maxlength')
                .attr('class', elemClasses);
            this.uxLookup.replaceWith(this.element);
        },

		widget: function() {
            return this.uxTextbox;
        }
	});

})(jQuery);