/*
**  script for Widget uxFramework
**  updated 2013.06.24
**  develop by evo2mind
**
**  Depends:
**      jquery.ui.core.js
**      jquery.ui.widget.js
**      jquery.ui.position.js
**      jquery.ui.datepicker.js
**      XRegExp.js
**      uxFramework.utils.js
*/

(function($) {
    "use strict";

	$.widget('uxFramework.uxDateTextbox', $.uxFramework.uxTextbox, {
		version: '1.1.0',
		defaultElement: '<input>',
		widgetEventPrefix: 'uxDateTexbox',
		widgetCssPrefix: 'ux-datetextbox',
        widgetStateValue: 'default',
		options: {
            value: '',
            inlineLabel: '',
            errorMessage: '',
            inputMessage: '',
            validatedMessage: 'validated',
            maxChars: 15,
            changeMonth: true,
            changeYear: true,
            dateFormat: 'd-M-yy',
            minDate: null,
            maxDate: null,
            isRequired: false,
            isReadonly: false,
            isDisabled: false,
            inputFilter: null,
            inputFormat: ux.utils.regex.formatFilters.date,
            buttonOptions: {
				icons: {
					primary: 'ui-icon-calendar'
				},
				text: false
			}
		},

        _create: function() {
            this._draw();
            this._drawDateTextbox();
            this._initOptions();
            this._on(this._events);
            this._attachButtonSelectEvents();
        },

        _drawDateTextbox: function(){
            var elemPos = this.element.offset(),
                widget = this,
                widgetVisibility = this.element.datepicker('widget').is(':visible');
            this.uxTextbox
                .addClass('ux-textbox')
                .prepend(this._uxWidgetWrapperButtonSelectHtml().append(this._uxWidgetButtonSelectHtml()))
                .find('.ux-widget-wrapper-input');

            this.element.datepicker({
                changeMonth: widget.options.changeMonth,
                changeYear: widget.options.changeYear,
                dateFormat: widget.options.dateFormat,
                minDate: widget.options.minDate,
                maxDate: widget.options.maxDate,
                beforeShow: function (input, inst) {
                    setTimeout(function () {
                        inst.dpDiv.css({
                            top: elemPos.top - 25,
                            left: elemPos.left - 1
                        });
                    }, 0);
                },
                onSelect: function() {
                    widget.showValidated();
                    widget.hideInlineLabel();
                    widget.hideError();
                    widget.element.datepicker('hide');
                }
            });

            this.element.datepicker('widget')
                .addClass('ux-widget-datetextbox-calendar')
                .mousedown(function(evt){
                    if($(evt.target).hasClass('ui-datepicker-month') || $(evt.target).hasClass('ui-datepicker-year')){
                        widget.showDefault();
                    }else{
                        evt.preventDefault();
                    }
                })
                .click(function(){
                    widget.hideError();
                });

            this._events.blur = function(){
                if(this.value() === ''){
                    this.showInlineLabel();
                }
                if(this.options.inputFormat !== undefined){
                    if(XRegExp.test(this.value(), this.options.inputFormat)){
                        this.validation();
                    }else{
                        //this.value('');
                        if(!widgetVisibility){
                            this.showError();
                        }
                    }
                }
            };

            this.uxDateTextbox = this.uxTextbox;
        },
        _uxWidgetWrapperButtonSelectHtml: function(){
            var elemWrapper = $('<div></div>');
            elemWrapper.addClass('ux-widget-button-select');
            return elemWrapper;
        },
        _uxWidgetButtonSelectHtml: function(){
            var elemButtonSelect = $('<a></a>');
            elemButtonSelect.button(this.options.buttonOptions);
            return elemButtonSelect;
        },

        _attachButtonSelectEvents: function(){
            var widget = this;
            this.uxDateTextbox
                .find('.ux-widget-button-select')
                .mousedown(function(evt){
                    evt.preventDefault();
                })
                .click(function(){
                    var wasOpen = widget.element.datepicker('widget').is(':visible');
                    if(!wasOpen){
                        widget.element.datepicker('show');
                    }else{
                        widget.element.datepicker('hide');
                    }
                });
        },

        validation: function() {
            if (this.options.isRequired && this.value() === '') {
                if(!this.element.datepicker('widget').is(':visible')){
                    this.showError('Required field cannot be left blank');
                }
                return false;
            } else {
                this.showValidated();
                return true;
            }
        },

        _destroy: function() {
            var elemClasses = this.uxDateTextbox.attr('class');
            elemClasses.removeClass('ux-widget')
                .removeClass(this.widgetCssPrefix)
                .removeClass('ui-helper-reset')
                .removeClass('ui-state-default')
                .removeClass('ui-widget-content');
            this.element
                .removeAttr('title')
                .removeAttr('maxlength')
                .attr('class', elemClasses);
            this.uxDateTextbox.replaceWith(this.element);
        },

        widget: function() {
            return this.uxDateTextbox;
        }
	});

})(jQuery);