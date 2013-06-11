/*
**  script for Widget uxFramework
**  updated 2013.05.21 
**  develop by evo2mind
**
**  Depends:
**	    jquery.ui.core.js
**	    jquery.ui.widget.js
**	    jquery.ui.position.js
**	    jquery.ui.menu.js
**      jquery.ui.autocomplete.js
*/

(function($) {

    $.widget('uxFramework.uxLookup', $.uxFramework.uxTextbox, {
		version: '1.0.0',
		defaultElement: '<input>',
		widgetEventPrefix: 'uxLookup',
		widgetCssPrefix: 'ux-lookup',
		options: {
		    culture: null,
		    isRequired: false,
		    readonly: true,
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
			this._initOptions();
		    this._on(this._events);
			this._attachEvents();
		},
		_draw: function() {
			var elementClasses = this.element.attr('class'),
			    uxTextbox = this.uxTextbox = this.element
				                .removeAttr('class')
			                    .addClass('ux-lookup-input')
				                .wrap(this._uiTextboxHtml())
			                        .before(this._uiSelectHtml())
			                        .before(this._uiInputMessageHtml())
			                        .before(this._uiValidatedHtml())
				                    .before(this._uiErrorValidateHtml())
				                        .wrap(this._uiInputWrapper())
			                    .before(this._uiInputPresentationLabel())
				                .after(this._uiInputInlineLabel())
		                        .parents('.ux-widget')
			                        .addClass(this.widgetCssPrefix)
		                            .addClass(elementClasses);
		},
		_uiInputPresentationLabel: function() {
			var elem = $('<input type="text" />');
			elem.addClass('ux-textbox-input')
				.addClass('ui-helper-reset');
			if (this.options.readonly) {
				elem.attr('readonly', 'readonly');
			}
			return elem;
		},
		_uiSelectHtml: function() {
			var elemIcon = $('<a></a>')
				    .button(this.options.buttonOptions);
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ui-state-default')
				.addClass('ux-lookup-select')
				.append(elemIcon);
			    
			return elemWrapper;
		},
		_attachEvents: function() {
			var that = this;
			this.element.
				parent()
				.find('.ux-textbox-input')
				.focus(function(evt) {
					evt.preventDefault();
					that._hideError();
					that._eventLookup(evt);
				})
				.change(function(evt) {
					that._hideInlineLabel();
			        that._hideError();
				})
				.blur(function() {
					if(that._getValue() === ''){
			            that._showInlineLabel();
			        }
			        that._validation();
				});
			this.element
			    .parents('.ux-widget')
			    .find('.ux-lookup-select a')
				.click(function(evt) {
					that._eventLookup(evt);
				});
		},
		_eventLookup: function(evt) {
			if (typeof this.options.action === 'function') {
				var result = this.options.action();
				this._moveFocusToNextInput();
				this._setValue(result);
			}
			this._moveFocusToNextInput();
		},
		_setPresentationValue: function(value) {
		    var inputTextbox = this.element
				.parent()
				.find('.ux-textbox-input');
			inputTextbox.val(value);
		},
		_getPresentationValue: function() {
		    var inputTextbox = this.element
				.parent()
				.find('.ux-textbox-input');
			return inputTextbox.val();
		},
		_setLookupValue: function(value) {
		    var inputLookup = this.element
				.parent()
				.find('.ux-lookup-input');
			inputLookup.val(value);
		},
		_getLookupValue: function() {
			var inputLookup = this.element
				.parent()
				.find('.ux-lookup-input');
			return inputLookup.val();
		},
		_setValue: function(objValue) {
			if (objValue != undefined && (typeof objValue === 'string' || typeof objValue === 'number')) {
				this._setPresentationValue(objValue);
				this._setLookupValue(objValue);
				this._showValidated();
			}else if (objValue != undefined && typeof objValue === 'object') {
				this._setPresentationValue(objValue.label !== undefined && (typeof objValue.label === 'string' || typeof objValue.label === 'number') ? objValue.label : null);
				this._setLookupValue(objValue.value !== undefined && (typeof objValue.label === 'string' || typeof objValue.label === 'number') ? objValue.value : null);
			    this._showValidated();
			}
		},
		_getValue: function() {
			return this._getLookupValue();
		},
		_moveFocusToNextInput: function() {
			var inputTextbox = this.element
				.parent()
				.find('.ux-textbox-input');
		    var focusables = $("div.form :input ");
			var current = focusables.index(inputTextbox),
                next = focusables.eq(current+2).length ? focusables.eq(current+2) : focusables.eq(0);
                next.focus();	
		},
		_destroy: function() {
			this.element
				.removeClass(this.widgetCssPrefix + '-wrapper-input')
				.removeClass('ui-helper-reset');
		    this.uxLookup.replaceWith(this.element);
		},
		widget: function() {
		    return this.uxLookup;
	    }
	});

})(jQuery);