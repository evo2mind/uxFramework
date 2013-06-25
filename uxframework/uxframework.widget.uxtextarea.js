/*
**  script for Widget uxFramework
**  updated 2013.06.25
**  develop by evo2mind
**
**  Depends:
**      jquery.ui.core.js
**      jquery.ui.widget.js
*/


(function($) {
    "use strict";

	$.widget('uxFramework.uxTextarea', {
		version: '1.1.0',
		defaultElement: '<textarea>',
		widgetEventPrefix: 'uxTextarea',
		widgetCssPrefix: 'ux-textarea',
        widgetStateValue: 'default',
		options: {
            value: '',
            inlineLabel: '',
            errorMessage: '',
            inputMessage: '',
            validatedMessage: 'validated',
            maxChars: 250,
            isRequired: false,
            isReadonly: false,
            isDisabled: false,
            inputFilter: null,
            inputFormat: null
		},
		_create: function() {
			this._draw();
			this._drawScrollbar();
			this._initOptions();
			this._on(this._events);
            this._refreshInputCounter();
            this.showDefault();
		},

        _initOptions: function() {
            if(this.options.value !== ''){
                this.value(this.options.value);
            }

            this.setErrorMessage(this.options.errorMessage);
            this.setValidatedMessage(this.options.validatedMessage);
            this.setMaxChars(this.options.maxChars);

            if(this.options.inputMessage !== ''){
                this.showInputMessage(this.options.inputMessage);
            }else{
                this.hideInputMessage();
            }

            if(this.value() !== ''){
                this.hideInlineLabel();
                this.validation();
            }

            this.value(this.element.val());
        },

        _events: {
            focus: function() {
                this.showDefault();
            },
            keyup: function(){
                this._refreshInputCounter();
                this._refreshScrollBarPosition();
            },
            paste: function(){
                this._refreshInputCounter();
                this._refreshScrollBarPosition();
            },
            blur: function() {
                this.validation();
            }
        },

		_draw: function() {
			var elementClasses = this.element.attr('class');
            this.uxTextarea = this.element
                .removeAttr('class')
                .addClass('ux-widget-input')
                .addClass('ui-helper-reset')
                .wrap(this._uxWidgetWrapperHtml())
                .before(this._uxWidgetSidebarWrapperHtml())
                .wrap(this._uxWidgetInputWrapperHtml())
                .after(this._uxWidgetInputCounter())
                .parents('.ux-widget');
			this.uxTextarea.addClass(elementClasses);
		},

		_uxWidgetWrapperHtml: function() {
			var elemWidget = $('<div></div>');
            elemWidget.addClass('ux-widget')
				.addClass(this.widgetCssPrefix)
				.addClass('ux-state-default')
				.addClass('ui-widget-content')
				.addClass('ui-helper-reset');
			return elemWidget;
		},
		_uxWidgetInputWrapperHtml: function() {
			var elemWrapper = $('<div></div>');
			elemWrapper.addClass('ux-widget-wrapper-input');
			return elemWrapper;
		},
		_uxWidgetSidebarWrapperHtml: function() {
			var elemWrapper = $('<div></div>');
			elemWrapper.addClass('ux-widget-wrapper-sidebar')
                .addClass('ui-widget-content')
                .append(this._uxWidgetErrorWrapperHtml().append(this._uxWidgetErrorHtml()))
                .append(this._uxWidgetInfoWrapperHtml().append(this._uxWidgetInfoHtml()))
                .append(this._uxWidgetValidatedWrapperHtml().append(this._uxWidgetValidatedHtml()))
                .append(this._uxWidgetScrollbarHtml());
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

		_uxWidgetInfoHtml: function() {
            var elemInfo = $('<span></span>');
            elemInfo.addClass('ui-icon')
                .addClass('ui-icon-info')
                .mousedown(function(evt){
                    evt.preventDefault();
                });
            return elemInfo;
		},
		_uxWidgetErrorHtml: function() {
            var elemError = $('<span></span>');
            elemError.addClass('ui-icon')
                .addClass('ui-icon-notice');
            return elemError;
		},
		_uxWidgetScrollbarHtml: function() {
			var elemScrollBar = $('<div></div>');
			var scrollBar = $('<div></div>');
			scrollBar.addClass('ux-widget-vertical-scrollbar');
			elemScrollBar.addClass('ux-widget-wrapper-vertical-scrollbar')
				.append(scrollBar);
			return elemScrollBar;
		},
		_uxWidgetValidatedHtml: function() {
            var elemValidated = $('<span></span>');
            elemValidated.addClass('ui-icon')
                .addClass('ui-icon-check');
            return elemValidated;
		},
        _uxWidgetInputCounter: function(){
            var elemInputCounter = $('<div></div>');
            elemInputCounter.addClass('ux-widget-input-counter')
                .html(this.options.maxChars === 1 ? ' 1 char' : this.options.maxChars + ' chars');
            return elemInputCounter;
        },

		_drawScrollbar: function() {
			var elemScrollbar = this.uxTextarea
				.find('.ux-widget-vertical-scrollbar'),
				elemWrapperScrollbar = this.uxTextarea
					.find('.ux-widget-wrapper-vertical-scrollbar'),
				textarea = this.element,
				elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-grip-dotted-horizontal');
			var scrollbar = elemScrollbar.slider({
				orientation: 'vertical',
				value: 100,
				slide: function(event, ui) {
                    if (textarea[0].scrollHeight > elemWrapperScrollbar.height()) {
						var y = Math.round((100 - ui.value) / 100 * (textarea[0].scrollHeight - textarea.height()));
						textarea.scrollTop(y);
					} else {
						textarea.scrollTop(0);
					}
				}
			});
			textarea.scroll(function() {
				var textareaHeight = textarea[0].scrollHeight - textarea.height();
				var y = Math.round((textareaHeight - textarea.scrollTop()) / textareaHeight * 100);
				scrollbar.slider('value', y);
			});
			scrollbar.find( ".ui-slider-handle" )
				.append(elemIcon);
			this._refreshScrollPaneHeight();
		},

		_refreshScrollPaneHeight: function(){
			var elemWrapperScrollbar = this.uxTextarea
				.find('.ux-widget-wrapper-vertical-scrollbar');
            var scrollPaneHeight = this.uxTextarea.height() - elemWrapperScrollbar.css('padding-top').replace("px", "") - elemWrapperScrollbar.css('padding-bottom').replace("px", "") - elemWrapperScrollbar.position().top; // - (this.widgetState() === 'default' && this.options.inputMessage === '' ? 0 : 20);
            elemWrapperScrollbar.css('height', scrollPaneHeight);
		},

        showDefault: function(){
            this.uxTextarea
                .removeClass('ui-state-error')
                .removeClass('ui-state-highlight')
                .addClass('ui-state-default');
        },

        showError: function(errorMessage) {
            this.hideValidated();
            this.uxTextarea
                .removeClass('ui-state-default')
                .addClass('ui-state-error');
            this.setErrorMessage(errorMessage);
            this.widgetStateValue = 'error';
        },
        hideError: function() {
            this.uxTextarea
                .removeClass('ui-state-error')
                .addClass('ui-state-default');
            this.setErrorMessage(null);
            this.widgetStateValue = 'default';
        },

        showValidated:function(validatedMessage) {
            this.hideError();
            this.uxTextarea
                .removeClass('ui-state-default')
                .addClass('ui-state-highlight');
            this.setValidatedMessage(validatedMessage);
            this.widgetStateValue = 'validated';
        },
        hideValidated:function() {
            this.uxTextarea
                .removeClass('ui-state-highlight')
                .addClass('ui-state-default');
            this.widgetStateValue = 'default';
        },

        showInlineLabel: function() {
            this.uxTextarea
                .find('.ux-widget-inline-label')
                .show();
        },
        hideInlineLabel: function() {
            this.uxTextarea
                .find('.ux-widget-inline-label')
                .hide();
        },

        showInputMessage: function(inputMessage) {
            this.uxTextarea
                .find('.ux-widget-wrapper-info')
                .show();
            this.setInputMessage(inputMessage);
        },
        hideInputMessage: function() {
            this.uxTextarea
                .find('.ux-widget-wrapper-info')
                .hide();
        },

        setErrorMessage: function(errorMessage) {
            this.uxTextarea
                .find('.ux-widget-wrapper-error')
                .attr('title', errorMessage);
        },
        setInputMessage: function(inputMessage) {
            this.uxTextarea
                .find('.ux-widget-wrapper-info')
                .attr('title', inputMessage);
        },
        setValidatedMessage: function(validatedMessage) {
            this.uxTextarea
                .find('.ux-widget-wrapper-validated')
                .attr('title', validatedMessage);
        },
        setInlineLabel: function(inlineLabel) {
            this.uxTextarea
                .find('.ux-widget-inline-label')
                .html(inlineLabel);
        },

        setMaxChars: function(maxChars) {
            this.uxTextarea
                .find('.ux-widget-input')
                .attr('maxlength', maxChars);
        },

        _setOption: function(key, value) {
            switch(key) {
                case 'value':
                    this.value(value);
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
            if (this.options.isRequired && this.value() === '') {
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

        _refreshInputCounter: function(){
            var inputCharsLength = this.value().length,
                remainingChars = this.options.maxChars - inputCharsLength;
            this.uxTextarea
                .find('.ux-widget-input-counter')
                .html(remainingChars === 1 ? '1 char' : remainingChars + ' chars');
        },

        _refreshScrollBarPosition: function(){
            if(this.value() === ''){
                this.uxTextarea
                    .find('.ux-widget-vertical-scrollbar')
                    .slider('value', 100);
            }
        },
        widgetState: function(){
            return this.widgetStateValue;
        },

		_destroy: function() {
            var elemClasses = this.uxTextarea.attr('class');
            elemClasses.removeClass('ux-widget')
                .removeClass(this.widgetCssPrefix)
                .removeClass('ui-helper-reset')
                .removeClass('ui-state-default')
                .removeClass('ui-widget-content');
            this.element
                .removeAttr('title')
                .removeAttr('maxlength')
                .attr('class', elemClasses);
            this.uxTextarea.replaceWith(this.element);
		},

		widget: function() {
            return this.uxTextarea;
        }
	});
	
	
})(jQuery);