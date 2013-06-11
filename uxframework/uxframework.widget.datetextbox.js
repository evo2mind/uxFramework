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
	$.widget('uxFramework.uxDateTextbox', $.uxFramework.uxLookup, {
		version: '1.0.0',
		defaultElement: '<input>',
		widgetEventPrefix: 'uxDateTexbox',
		widgetCssPrefix: 'ux-datetexbox',
		options: {
			buttonOptions: {
				icons: {
					primary: 'ui-icon-calendar'
				},
				text: false
			}
		},
		_create: function() {
		    this._draw();
			this._initDatePicker();
			this._initOptions();
		    this._on(this._events);
			this._attachEvents();
		},
		_initDatePicker: function() {
			var that = this;
			var elemDatepicker = this.element
				.parent()
			    .find('.ux-textbox-input');
			
			elemDatepicker.datepicker({
				    dateFormat: 'd MM yy',
					altField: this.element.ID,
					altFormat: 'd-M-yy',
					onSelect: function(dateText, inst) {
						that._showValidated();
						that._hideError();
						that._moveFocusToNextInput();
						elemDatepicker.datepicker('hide');
					}
				});
		},
		_eventLookup: function(evt) {
			this.element
				.parent()
				.find('.ux-textbox-input')
				.datepicker('show');
			this._setLookupValue(this._getPresentationValue());
		}
	});

})(jQuery);