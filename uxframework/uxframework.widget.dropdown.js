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

	$.widget('uxFramework.uxDropdown', $.uxFramework.uxLookup, {
		version: '1.0.0',
		defaultElement: '<select>',
		widgetEventPrefix: 'uxDropdown',
		widgetCssPrefix: 'ux-dropdown',
		options: {
			isRequired: true,
			readonly: false,
			buttonOptions: {
				icons: {
					primary: 'ui-icon-triangle-1-s'
				},
				text: false
			}
		},
		_create: function() {
			this._draw();
			this._initAutocomplete();
			this._initOptions();
		    this._on(this._events);
			this._attachEvents();
		},
		_initAutocomplete: function() {
			var elemTextbox = this.element
				.parent()
				.find('.ux-textbox-input');
			this.element.attr('evo', 'ok');
			elemTextbox.autocomplete({
				    delay: 0,
				    minLength: 0,
				    source: $.proxy(this, "_source")
			    });
		},
		_source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( 
	            this.element.children( "option" ).map(function() {
                    var text = $( this ).text();
		            if (this.value && (!request.term || matcher.test(text)))
			            return {
				            label: text,
				            value: text,
				            option: this
			            };
		            else return null;
	            }) 
            );
        },
		_eventLookup: function(evt) {
		    var wasOpen = false,
			    elemAutocomplete = this.element
				    .parent()
				    .find('.ux-textbox-input');
			wasOpen = elemAutocomplete.autocomplete( "widget" ).is( ":visible" );
			//if(wasOpen){
			    elemAutocomplete.autocomplete('search', '');
			//} 
		}
	});
	
})(jQuery);