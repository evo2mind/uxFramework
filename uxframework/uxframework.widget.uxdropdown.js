/*
**  script for uxFramework Dropdown Widget
**  updated 2013.06.23
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

	$.widget('uxFramework.uxDropdown', $.uxFramework.uxTextbox, {
		version: '1.1.0',
		defaultElement: '<select>',
		widgetEventPrefix: 'uxDropdown',
		widgetCssPrefix: 'ux-dropdown',
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
                    primary: 'ui-icon-triangle-1-s'
                },
                text: false
            }
		},

		_create: function() {
            this._draw();
            this._drawDropdown();
            this._drawAutocomplete();
            this._initOptions();
            this._on(this.uxDropdown.find('.ux-widget-input'), this._events);
            this._attachButtonDropdownEvents();
            this.showDefault();
		},

        _drawDropdown: function(){
            this.element
                .removeAttr('class')
                .removeAttr('maxlength')
                .hide();
            this.uxTextbox
                .addClass('ux-textbox')
                .prepend(this._uxWidgetWrapperButtonSelectHtml().append(this._uxWidgetButtonSelectHtml()))
                .find('.ux-widget-wrapper-input')
                .append(this._uxWidgetInputElementHtml());
            this.uxDropdown = this.uxTextbox;
        },
        _drawAutocomplete: function(){
            this.uxDropdown
                .find('.ux-widget-input')
                .autocomplete({
                    position: {my: "left-9 top+3", at: "left bottom"},
                    delay: 0,
                    minLength: 0,
                    autoFocus: true,
                    source: $.proxy(this, '_dataSource'),
                    change: $.proxy(this, '_validateAutocomplete'),
                    select: $.proxy(this, '_dropdownSelect'),
                    focus: $.proxy(this, '_dropdownFocus'),
                    open: $.proxy(this, '_dropdownOpen')
                });
            this.uxDropdown
                .find('.ux-widget-input')
                .autocomplete('widget')
                .css('width', this.uxDropdown.width())
                .addClass('ux-widget-dropdown-menu');
            if(this.element[0].options.length > 0){
                this.uxDropdown
                    .find('.ux-widget-input')
                    .val(this.element[0].options[0].text);
            }
            this.showDefault();
        },

        _uxWidgetInputElementHtml: function(){
            var elemInput = $('<input/>');
            elemInput.attr('type', 'text')
                .addClass('ux-widget-input')
                .addClass('ui-helper-reset');
            return elemInput;
        },
        _uxWidgetWrapperButtonSelectHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-dropdown-button');
            return elemWrapper;
        },
        _uxWidgetButtonSelectHtml: function(){
            var elemButtonSelect = $('<a></a>');
            elemButtonSelect.button(this.options.buttonOptions);
            return elemButtonSelect;
        },

        _dataSource: function(request, response) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( 
                this.element.children( "option" ).map(function() {
                    var text = $(this).text();
                    if (this.value && (!request.term || matcher.test(text))){
                        return {
                            label: text,
                            value: $(this).val(),
                            option: this
                        };
                    }
                    else{
                        return null;
                    }
                })
            );
        },

        _attachButtonDropdownEvents: function() {
            this.uxDropdown
                .find('.ux-widget-dropdown-button')
                .click(this, function(evt){
                    var elemAutocomplete = evt.data
                            .uxDropdown
                            .find('.ux-widget-input'),
                        wasOpen = elemAutocomplete.autocomplete( "widget" ).is( ":visible" );
                    if(!wasOpen){
                        elemAutocomplete.autocomplete('search', '');
                    }else{
                        elemAutocomplete.autocomplete('close');
                    }
	                elemAutocomplete.focus();
                });
		},

        _validateAutocomplete: function() {
            var val = this.uxDropdown
                    .find('.ux-widget-input')
                    .val(),
                valLowerCase = val.toLowerCase(),
                matchedOptions = 0;
            this.element.children( "option" ).each(function() {
                if ($(this).text().toLowerCase() === valLowerCase) {
                    matchedOptions++;
                }
            });
            if (matchedOptions) {
                this.hideInlineLabel();
            }else{
                this.value('');
                this.uxDropdown
                    .find('.ux-widget-input')
                    .val('');
                this.showError('cannot empty');
            }
        },

        _dropdownSelect: function(evt, ui){
            evt.preventDefault();
            this.uxDropdown
                .find('.ux-widget-input')
                .val(ui.item.label);
            this.value(ui.item.value);
        },

        _dropdownFocus: function(evt){
            evt.preventDefault();
        },
		
		_dropdownOpen: function() {
			$('.ux-widget-dropdown-menu').css('width', this.uxDropdown.width() - 23);
		},
		
        _hideDropdown: function(){
            this.uxDropdown
                .find('.ux-widget-input')
                .autocomplete('close');
        },

        value: function(val){
            if(val === undefined){
                return this.element.val();
            }else{
               this.element.val(val.toString());
                if(this.validation()){
                    this.element.val(val);
                }
                this.element.change();
                return this;
            }
        },

        validation: function() {
            if (this.options.isRequired && this.uxDropdown.find('.ux-widget-input').val() === '') {
                this.showError('Required field cannot be left blank');
                return false;
            } else {
                this.showValidated();
                return true;
            }
        }

	});
	
})(jQuery);