/*
**  script for uxFramework Textbox Widget
**  updated 2013.06.17
**  develop by evo2mind
**
**  Depends:
**      jquery.ui.core.js
**      jquery.ui.widget.js
*/

(function ($) {
    'use strict';

    $.widget('uxFramework.uxTextbox', {
		version: '1.1.0',
		defaultElement: '<input>',
		widgetEventPrefix: 'uxTextbox',
        widgetCssPrefix: 'ux-textbox',
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
            inputFormat: null
		},
		_create: function() {
            this._draw();
            this._initOptions();
            this._on(this._events);
		},

		_initOptions: function() {
            if(this.options.value !== ''){
                this.value(this.options.value);
            }

			this.setInlineLabel(this.options.inlineLabel);
			this.setErrorMessage(this.options.errorMessage);
			this.setValidatedMessage(this.options.validatedMessage);
			this.setMaxChars(this.options.maxChars);

            if(this.options.inputMessage !== ''){
                this.showInputMessage(this.options.inputMessage);
            }else{
                this.hideInputMessage();
            }

            if(this.element.val() !== ''){
                this.hideInlineLabel();
                this.validation();
            }
		},
		_events: {
			focus: function() {
                this.showDefault();
			},
            keydown: function() {
                this.hideInlineLabel();
                this.hideError();
            },
            keyup: function(){
                if(this.element.val().length === 0){
                    this.showInlineLabel();
                }
            },
            paste: function() {
                this.hideInlineLabel();
            },
            blur: function() {
                if(this.element.val() === ''){
                    this.showInlineLabel();
                }
                this.validation();
            }
		},

        _draw: function(){
            var elemClasses = this.element.attr('class');
            this.uxTextbox = this.element
                .removeAttr('class')
                .addClass('ux-widget-input')
                .addClass('ui-helper-reset')
                .wrap(this._uxWidgetInputWrapperHtml())
                .after(this._uxWidgetInlineLabelHtml())
                .parent()
                .wrap(this._uxWidgetWrapperHtml())
                .parent()
                .prepend(this._uxWidgetInfoWrapperHtml().append(this._uxWidgetInfoHtml()))
                .prepend(this._uxWidgetErrorWrapperHtml().append(this._uxWidgetErrorHtml()))
                .prepend(this._uxWidgetValidatedWrapperHtml().append(this._uxWidgetValidatedHtml()));
            this.uxTextbox.addClass(elemClasses);
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
        _uxWidgetInputWrapperHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-wrapper-input');
            return elemWrapper;
        },
        _uxWidgetInfoWrapperHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-wrapper-info');
            return elemWrapper;
        },
        _uxWidgetErrorWrapperHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-wrapper-error');
            return elemWrapper;
        },
        _uxWidgetValidatedWrapperHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-wrapper-validated');
            return elemWrapper;
        },

        _uxWidgetInfoHtml: function(){
            var elemInfo = $('<span></span>');
            elemInfo.addClass('ui-icon')
                .addClass('ui-icon-info');
            return elemInfo;
        },
        _uxWidgetErrorHtml: function(){
            var elemError = $('<span></span>');
            elemError.addClass('ui-icon')
                .addClass('ui-icon-notice');
            return elemError;
        },
        _uxWidgetValidatedHtml: function(){
            var elemValidated = $('<span></span>');
            elemValidated.addClass('ui-icon')
                .addClass('ui-icon-check');
            return elemValidated;
        },

        _uxWidgetInlineLabelHtml: function(){
            var elemInlineLabel = $('<span></span>');
            elemInlineLabel.addClass('ux-widget-inline-label')
                .click(function() {
                    $(elemInlineLabel)
                        .parent().children('input')
                        .focus();
                })
                .mousedown(function(evt){
                    evt.preventDefault();
                });
            return elemInlineLabel;
        },

        showDefault: function(){
            this.uxTextbox
                .removeClass('ui-state-error')
                .removeClass('ui-state-highlight')
                .addClass('ui-state-default');
        },

        showError: function(errorMessage) {
            this.hideValidated();
            this.uxTextbox
                .removeClass('ui-state-default')
                .addClass('ui-state-error');
            this.setErrorMessage(errorMessage);
            this.widgetStateValue = 'error';
        },
        hideError: function() {
            this.uxTextbox
                .removeClass('ui-state-error')
                .addClass('ui-state-default');
            this.setErrorMessage(null);
            this.widgetStateValue = 'default';
        },

        showValidated:function(validatedMessage) {
            this.hideError();
            this.uxTextbox
                .removeClass('ui-state-default')
                .addClass('ui-state-highlight');
            this.setValidatedMessage(validatedMessage);
            this.widgetStateValue = 'validated';
        },
        hideValidated:function() {
            this.uxTextbox
                .removeClass('ui-state-highlight')
                .addClass('ui-state-default');
            this.widgetStateValue = 'default';
        },

		showInlineLabel: function() {
			this.uxTextbox
				.find('.ux-widget-inline-label')
				.show();
		},
		hideInlineLabel: function() {
			this.uxTextbox
				.find('.ux-widget-inline-label')
				.hide();
		},

		showInputMessage: function(inputMessage) {
            this.uxTextbox
                .find('.ux-widget-wrapper-info')
                .show();
			this.setInputMessage(inputMessage);
		},
		hideInputMessage: function() {
            this.uxTextbox
				.find('.ux-widget-wrapper-info')
				.hide();
		},

        setErrorMessage: function(errorMessage) {
            this.uxTextbox
                .find('.ux-widget-wrapper-error')
                .attr('title', errorMessage);
        },
        setInputMessage: function(inputMessage) {
            this.uxTextbox
                .find('.ux-widget-wrapper-info')
                .attr('title', inputMessage);
        },
        setValidatedMessage: function(validatedMessage) {
            this.uxTextbox
                .find('.ux-widget-wrapper-validated')
                .attr('title', validatedMessage);
        },
        setInlineLabel: function(inlineLabel) {
            this.uxTextbox
                .find('.ux-widget-inline-label')
                .html(inlineLabel);
        },

		setMaxChars: function(maxChars) {
			this.element
				.attr('maxlength', maxChars);
		},

		_setOption: function(key, value) {
			switch(key) {
                case 'value':
                    this.value(value);
                    break;
                case 'inlineLabel':
                    this.setInlineLabel(value);
                    break;
				case 'errorMessage':
					this.setErrorMessage(value);
					break;
				case 'inputMessage':
					this.setInputMessage(value);
					break;
				case 'validatedMessage':
					this.setValidatedMessage(value);
					break;
				case 'maxChars':
					this.setMaxChars(value);
					break;
			}
		},

        value: function(val){
            if(val === undefined){
                return this.element.val();
            }else{
                this.element.val(val);
                if(this.validation()){
                    this.element.val(val.substring(0, this.options.maxChars));
                }
                return this;
            }
        },

        validation: function() {
            if (this.options.isRequired && this.element.val() === '') {
                this.showError('Required field cannot be left blank');
                return false;
            } else {
                this.showValidated();
                return true;
            }
		},

        isValidated: function() {
			return this.widgetStateValue === 'validated';
		},

        widgetState: function(){
            return this.widgetStateValue;
        },

        _destroy: function() {
            var elemClasses = this.uxTextbox.attr('class');
            elemClasses.removeClass('ux-widget')
                .removeClass(this.widgetCssPrefix)
                .removeClass('ui-helper-reset')
                .removeClass('ui-state-default')
                .removeClass('ui-widget-content');
			this.element
                .removeAttr('title')
                .removeAttr('maxlength')
                .attr('class', elemClasses);
            this.uxTextbox.replaceWith(this.element);
		},

		widget: function() {
            return this.uxTextbox;
        }
	});

}( jQuery ) );

