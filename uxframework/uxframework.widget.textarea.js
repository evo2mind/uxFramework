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

	$.widget('uxFramework.uxTextarea', {
		version: '1.0.0',
		defaultElement: '<textarea>',
		widgetEventPrefix: 'uxTextarea',
		widgetCssPrefix: 'ux-textarea',
		options: {
			culture: null,
			isRequired: false,
			inputFilter: null,
			inputFormat: null
		},
		_create: function() {
			this._draw();
			this._initScrollbar();
			//this._initOptions();

			//this._on(this._events);
		},
		_draw: function() {
			var elementClasses = this.element.attr('class'),
				uxTextarea = this.uxTextarea = this.element
					.removeAttr('class')
					.addClass('ux-textarea-input')
					.addClass('ui-helper-reset')
					.wrap(this._uiTextareaHtml())
					.before(this._uiSidebarWrapper())
					.wrap(this._uiInputWrapper())
					.parents('.ux-widget')
					.addClass(elementClasses);
		},
		_uiTextareaHtml: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-widget')
				.addClass('ux-textarea')
				.addClass('ux-state-default')
				.addClass('ui-widget-content')
				.addClass('ui-helper-reset');
			return elem;
		},
		_uiInputWrapper: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-textarea-wrapper-input');
			return elem;
		},
		_uiSidebarWrapper: function() {
			var elem = $('<div></div>');
			elem.addClass('ux-textarea-wrapper-sidebar')
			    .addClass('ui-widget-content')
				.append(this._uiErrorValidateHtml())
				.append(this._uiInputMessageHtml())
				.append(this._uiValidatedHtml())
			    .append(this._uiScrollbarHtml());
			return elem;
		},
		_uiInputMessageHtml: function() {
			var elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-info');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-textarea-wrapper-info')
				.append(elemIcon);
			return elemWrapper;
		},
		_uiErrorValidateHtml: function() {
			var elemIcon = $('<span></span');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-notice');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-textarea-wrapper-error')
				.addClass('ui-state-error')
				.append(elemIcon);
			return elemWrapper;
		},
		_uiScrollbarHtml: function() {
			var elem = $('<div></div>');
			var scrollBar = $('<div></div');
			scrollBar.addClass('ux-textarea-vertical-scrollbar');
			elem.addClass('ux-textarea-wrapper-vertical-scrollbar')
				.append(scrollBar);
			return elem;
		},
		_uiValidatedHtml: function() {
			var elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-check');
			var elemWrapper = $('<div></div>');
			elemWrapper
				.addClass('ux-textarea-wrapper-validated')
			    .append(elemIcon)
			    .attr('title', 'validated');
			return elemWrapper;
		},
		_initScrollbar: function() {
			var elemScrollbar = this.element
				.parents('.ux-widget')
				.find('.ux-textarea-vertical-scrollbar'),
				elemWrapperScrollbar = this.element
					.parents('.ux-widget')
					.find('.ux-textarea-wrapper-vertical-scrollbar'),
				that = this.element,
				elemIcon = $('<span></span>');
			elemIcon.addClass('ui-icon')
				.addClass('ui-icon-grip-dotted-horizontal');
			var scrollbar = elemScrollbar.slider({
				orientation: 'vertical',
				value: 100,
				slide: function(event, ui) {
					if (that[0].scrollHeight > elemWrapperScrollbar.height()) {
						var y = Math.round((100 - ui.value) / 100 * (that[0].scrollHeight - that.height()));
						that.scrollTop(y);
					} else {
						that.scrollTop(0);
					}
				}
			});
			this.element.scroll(function() {
				var textareaHeight = that[0].scrollHeight - that.height();
				var y = Math.round((textareaHeight - that.scrollTop()) / textareaHeight * 100);
				scrollbar.slider('value', y);
			});
			scrollbar.find( ".ui-slider-handle" )
				.append(elemIcon);
			this._refreshScrollPaneHeight();
		},
		_refreshScrollPaneHeight: function(){
			var elemWrapperScrollbar = this.element
				.parents('.ux-widget')
				.find('.ux-textarea-wrapper-vertical-scrollbar');
			var scrollPaneHeight = this.element.parents('.ux-widget').height() - elemWrapperScrollbar.css('padding-top').replace("px", "") - elemWrapperScrollbar.css('padding-bottom').replace("px", "") - elemWrapperScrollbar.position().top;
			elemWrapperScrollbar.css('height', scrollPaneHeight);
		},
		_destroy: function() {
			this.element
				.removeClass('ux-area-wrapper-input')
				.removeClass('ui-helper-reset');
		    this.uxTextbox.replaceWith(this.element);
		},
		widget: function() {
		    return this.uxTextarea;
	    }
	});
	
	
})(jQuery);