/*
**  script for Widget uxFramework
**  updated 2013.05.21 
**  develop by evo2mind
**
**  Depends:
**	    jquery.ui.core.js
**	    jquery.ui.widget.js
*/

(function($) {
	$.widget('uxFramework.uxLabel', {
		version: '1.0.0',
		defaultElement: '<label>',
		widgetEventPrefix: 'uxLabel',
		widgetCssPrefix: 'ux-label',
		options: {
			inputMessage: ''
		},
		_create: function() {
		    this._draw();
			this._initOptions();
		    //this._on(this._events);
		},
		_draw: function() {
			var elementClasses = this.element.attr('class'),
			    uxLabel = this.uxLabel = this.element
				                .removeAttr('class')
				                .addClass('ux-label-input')
			                    .addClass('ui-helper-reset')
				                .wrap(this._uiInputHtml())
			                        .before(this._uiInputMessageHtml())
				                        .wrap(this._uiInputWrapper())
		                        .parents('.ux-widget')
		                            .addClass(elementClasses);
		},
		_initOptions: function() {
			if (this.options.inputMessage !== undefined && this.options.inputMessage !== '') {
				this._showInputMessage(this.options.inputMessage);
			} else {
				this._hideInputMessage();
			}
		},
		_uiInputHtml: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-widget')
				.addClass('ux-label')
				.addClass('ux-state-default')
				.addClass('ui-widget-content')
				.addClass('ui-helper-reset');
			return elem;
		},
		_uiInputWrapper: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-label-wrapper-input');
			return elem;
		},
		_uiInputMessageHtml: function() {
			var elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-info');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-label-wrapper-info')
				.append(elemIcon);
			return elemWrapper;
		},
		_showInputMessage: function(inputMessage) {
			this.element
				.parents('.ux-widget')
				.find('.ux-label-wrapper-info')
				.show();
			this._setInputMessage(inputMessage);
		},
		_hideInputMessage: function() {
		    this.element
				.parents('.ux-widget')
				.find('.ux-label-wrapper-info')
				.hide();
		},
		_setInputMessage: function(inputMessage) {
		    this.element
				.parents('.ux-widget')
				.find('.ux-label-wrapper-info')
				.attr('title', inputMessage);
		},
		_setOption: function(key, value) {
			switch(key) {
				case 'inputMessage':
					this._setInputMessage(value);
					break;
			}
		},
		_destroy: function() {
			this.element
				.removeClass('ux-label-wrapper-input')
				.removeClass('ui-helper-reset');
		    this.uxTextbox.replaceWith(this.element);
		},
		widget: function() {
		    return this.uxLabel;
	    }
	});

})(jQuery);