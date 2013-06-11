/*
**  script for Widget uxFramework
**  updated 2013.05.21 
**  develop by evo2mind
**
**  Depends:
**      jquery.ui.core.js
**      jquery.ui.widget.js
**      jquery.ui.button.js
*/

(function($) {
	
	$.widget('uxFramework.uxTextbox', {
		version: '1.0.0',
		defaultElement: '<input>',
		widgetEventPrefix: 'uxTextbox',
		widgetCssPrefix: 'ux-textbox',
		options: {
		    culture: null,
		    inlineLabel: '',
		    errorMessage: '',
		    inputMessage: '',
		    validatedMessage: 'validated',
		    maxChars: 80,
		    isRequired: false,
		    inputFilter: null,
		    inputFormat: null
		},
		_create: function() {
		    this._draw();
			this._initOptions();
		    this._on(this._events);
		},
		_draw: function() {
			var elementClasses = this.element.attr('class'),
			    uxTextbox = this.uxTextbox = this.element
				                .removeAttr('class')
				                .addClass('ux-textbox-input')
			                    .addClass('ui-helper-reset')
				                .wrap(this._uiTextboxHtml())
			                        .before(this._uiInputMessageHtml())
			                        .before(this._uiValidatedHtml())
				                    .before(this._uiErrorValidateHtml())
				                        .wrap(this._uiInputWrapper())
				                .after(this._uiInputInlineLabel())
		                        .parents('.ux-widget')
		                            .addClass(elementClasses);
		},
		_initOptions: function() {
			this._setInlineLabel(this.options.inlineLabel);
			if (this.options.inputMessage !== undefined && this.options.inputMessage !== '') {
				this._showInputMessage(this.options.inputMessage);
			} else {
				this._hideInputMessage();
			}
			this._setErrorMessage(this.options.errorMessage);
			this._setValidatedMessage(this.options.validatedMessage);
			this._setMaxChars(this.options.maxChars);
		},
		_events: {
			focus: function() {
				this._hideError();
			},
		    keydown: function(event) {
			    this._hideInlineLabel();
			    this._hideError();
		    },
		    paste: function(event) {
			    this._hideInlineLabel();
			    this._hideError();
		    },
		    blur: function(event) {
			    if(this.element.val() === ''){
			        this._showInlineLabel();
			    }
			    this._validation();
		    }
		},
		_uiTextboxHtml: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-widget')
				.addClass('ux-textbox')
				.addClass('ux-state-default')
				.addClass('ui-widget-content')
				.addClass('ui-helper-reset');
			return elem;
		},
		_uiInputWrapper: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-textbox-wrapper-input');
			return elem;
		},
		_uiInputInlineLabel: function() {
			var elem = $('<span><span>');
			elem.addClass('ux-textbox-inline-label')
				.click(function() {
				$(elem)
					.parent().children('input')
					.focus();
			});
		    return elem;
		},
		_uiInputMessageHtml: function() {
			var elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-info');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-textbox-wrapper-info')
				.append(elemIcon);
			return elemWrapper;
		},
		_uiErrorValidateHtml: function() {
			var elemIcon = $('<span></span');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-notice');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-textbox-wrapper-error')
				.addClass('ui-state-error')
				.append(elemIcon);
			return elemWrapper;
		},
		_uiValidatedHtml: function() {
			var elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-check');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-textbox-wrapper-validated')
			    .append(elemIcon)
			    .attr('title', 'validated');
			return elemWrapper;
		},
		_showInlineLabel: function() {
			this.element
				.next('.ux-textbox-inline-label')
				.show();
		},
		_hideInlineLabel: function() {
			this.element
				.next('.ux-textbox-inline-label')
				.hide();
		},
		_showError: function(errorMessage) {
		    this.element
		        .parents('.ux-widget')
			    .addClass('ui-state-error');
			this._setErrorMessage(errorMessage);
			this._hideValidated();
		},
		_hideError: function() {
			this.element
				.parents('.ux-widget')
				.removeClass('ui-state-error');
		},
		_showValidated:function(validatedMessage) {
			this.element
		        .parents('.ux-widget')
		        .addClass('ui-state-validated');
			this._setValidatedMessage(validatedMessage);
			this._hideError();
		},
		_hideValidated:function() {
			this.element
			        .parents('.ux-widget')
			        .removeClass('ui-state-validated');
		},
		_showInputMessage: function(inputMessage) {
			this.element
				.parents('.ux-widget')
				.find('.ux-textbox-wrapper-info')
				.show();
			this._setInputMessage(inputMessage);
		},
		_hideInputMessage: function() {
		    this.element
				.parents('.ux-widget')
				.find('.ux-textbox-wrapper-info')
				.hide();
		},
		_setInlineLabel: function(inlineLabel) {
			this.element
			    .parents('.ux-widget')
				.find('.ux-textbox-inline-label')
				.html(inlineLabel);
		},
		_setErrorMessage: function(errorMessage) {
		    this.element
				.parents('.ux-widget')
				.find('.ux-textbox-wrapper-error')
				.attr('title', errorMessage);
		},
		_setInputMessage: function(inputMessage) {
		    this.element
				.parents('.ux-widget')
				.find('.ux-textbox-wrapper-info')
				.attr('title', inputMessage);
		},
		_setValidatedMessage: function(validatedMessage) {
			this.element
				.parents('.ux-widget')
				.find('.' + + '-wrapper-validated')
				.attr('title', validatedMessage);
		},
		_setMaxChars: function(maxChars) {
			this.element
				.attr('maxlength', maxChars);
		},
		_setOption: function(key, value) {
			switch(key) {
			    case 'inlineLabel':
				    this._setInlineLabel(value);
				    break;
				case 'errorMessage':
					this._setErrorMessage(value);
					break;
				case 'inputMessage':
					this._setInputMessage(value);
					break;
				case 'validatedMessage':
					this._setValidatedMessage(value);
					break;
				case 'maxChars':
					this._setMaxChars(value);
					break;
			}
		},
		_validation: function() {
		    if (this.options.isRequired && this.element.val() == '') {
			    this._showError('Required field cannot be left blank');
		    } else {
			    this._showValidated();
		    }	
		},
		_isValidate: function() {
			var validate = this.element
			                    .parents('.ux-widget')
			                    .hasClass('ui-state-validated');
			return validate;
		},
		_destroy: function() {
			this.element
				.removeClass('ux-textbox-wrapper-input')
				.removeClass('ui-helper-reset');
		    this.uxTextbox.replaceWith(this.element);
		},
		widget: function() {
		    return this.uxTextbox;
	    }
	});

}( jQuery ) );


