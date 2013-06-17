/* global jQuery, JSHINT */
/* global QUnit, asyncTest, expect, ok, start, test, deepEqual, strictEqual, module */

(function($){

    "use strict";
    var reset,
        jshintLoaded;


    window.TestHelpers = {};

    /*jslint evil: true */
    function includeStyle(url){
        document.write('<link rel="stylesheet" href="../../../../' + url + '" />');
    }

    function includeScript(url){
        document.write('<script type="text/javascript" src="../../../../' + url + '" ></script>');
    }

    function url(value){
        return value + (/\?/.test(value) ? "&" : "?") + new Date().getTime() + "" + parseInt(Math.random() * 100000, 10);
    }

    reset = QUnit.reset;
    QUnit.reset = function(){
        jQuery('#qunit-fixture').empty();
        reset.apply(this, arguments);
    };

    QUnit.config.requireExpects = true;

    window.TestHelpers.loadResources = function(resource){
        $.each(resource.css || [], function(i, resource){
            includeStyle('themes/base/uxframework.' + resource + '.css');
        });
        $.each(resource.js || [], function(i, resource){
            includeScript(resource);
        });
    };

    jshintLoaded = false;
    window.TestHelpers.testJshint = function(module){

        if(!jshintLoaded){
            includeScript('external/jshint/dist/jshint-2.1.3.js');
            jshintLoaded = true;
        }

        asyncTest('JSHint', function(){
            expect(1);

            $.when(
                $.ajax({
                    url: url('../../../../uxframework/jshint.json'),
                    //surl: url('jshint.json'),
                    dataType: 'json'
                }),
                $.ajax({
                    url: url('../../../../uxframework/uxframework.widget.' + module + '.js'),
                    dataType: 'text'
                })
            ).done(function( hintArgs, srcArgs ) {
                    var globals, passed, errors,
                        jshintrc = hintArgs[0],
                        source = srcArgs[0];

                    globals = jshintrc.globals || {};
                    delete jshintrc.globals;
                    passed = JSHINT( source, jshintrc, globals ),
                        errors = $.map( JSHINT.errors, function( error ) {
                            // JSHINT may report null if there are too many errors
                            if ( !error ) {
                                return;
                            }

                            return "[L" + error.line + ":C" + error.character + "] " +
                                error.reason + "\n" + error.evidence + "\n";
                        }).join( "\n" );
                    ok( passed, errors );
                    start();
            }).fail(function() {
                    ok( false, "error loading source" );
                start();
            });
        });
    };

    function testWidgetDefaults(widget, defaults) {
        var pluginDefaults = $.uxFramework[widget].prototype.options;

        test("defined defaults", function() {
            var count = 0;
            $.each(defaults, function(key, val) {
                expect(++count);
                if ($.isFunction(val) ) {
                    ok($.isFunction( pluginDefaults[key]), key);
                    return;
                }
                deepEqual(pluginDefaults[key], val, key);
            });
        });

        test("tested defaults", function(){
            var count = 0;
            $.each(pluginDefaults, function(key) {
                expect(++count);
                ok(key in defaults, key);
            });
        });
    }

    function testWidgetOverrides(widget) {
        if ($.uiBackCompat === false) {
            test("$.widget overrides", function(){
                expect(4);
                $.each([
                    "_createWidget",
                    "destroy",
                    "option",
                    "_trigger"
                ], function(i, method) {
                    strictEqual($.uxFramework[widget].prototype[method],
                        $.Widget.prototype[method], "should not override " + method);
                });
            });
        }
    }

    function testBasicUsage(widget) {
        test("basic usage", function(){
            expect(3);

            var defaultElement = $.uxFramework[widget].prototype.defaultElement;
            $(defaultElement).appendTo("body")[widget]().remove();
            ok(true, "initialized on element");

            $(defaultElement)[widget]().remove();
            ok(true, "initialized on disconnected DOMElement - never connected");

            $(defaultElement).appendTo("body").remove()[widget]().remove();
            ok(true, "initialized on disconnected DOMElement - removed");
        });
    }

    window.TestHelpers.commonWidgetTests = function(widget, settings) {
        module(widget + ": common widget");

        if(!navigator.userAgent.match(/MSIE 8.0/i) &&
           !navigator.userAgent.match(/MSIE 7.0/i) &&
           !navigator.userAgent.match(/MSIE 6.0/i)){
            window.TestHelpers.testJshint(widget);
        }

        testWidgetDefaults(widget, settings.defaults);
        testWidgetOverrides(widget);
        testBasicUsage(widget);
        test("version", function(){
            expect(1);
            ok("version" in $.uxFramework[widget].prototype, "version property exists");
        });
    };

    window.closeEnough = function(actual, expected, maxDifference, message) {
        var passes = (actual === expected) || Math.abs(actual - expected) <= maxDifference;
        QUnit.push(passes, actual, expected, message);
    };

    window.domEqual = function(selector, modifier, message) {
        var expected, actual,
            properties = [
                "disabled",
                "readOnly"
            ],
            attributes = [
                "autocomplete",
                "class",
                "href",
                "id",
                "nodeName",
                "role",
                "tabIndex",
                "title"
            ];

        function getElementStyles(elem) {
            var key, len,
                style = elem.ownerDocument.defaultView ?
                    elem.ownerDocument.defaultView.getComputedStyle(elem,null ) :
                    elem.currentStyle,
                styles = {};

            if (style && style.length && style[0] && style[style[0]]){
                len = style.length;
                while (len--) {
                    key = style[len];
                    if (typeof style[key] === "string") {
                        styles[$.camelCase(key)] = style[key];
                    }
                }
                // support: Opera, IE <9
            } else {
                for (key in style) {
                    if(typeof style[key] === "string"){
                        styles[key] = style[key];
                    }
                }
            }
            return styles;
        }

        function extract(elem) {
            if (!elem || !elem.length) {
                QUnit.push(false, actual, expected,
                    "domEqual failed, can't extract " + selector + ", message was: " + message);
                return;
            }

            var children,
                result = {};
            $.each(properties, function(index, attr) {
                var value = elem.prop(attr);
                result[attr] = value !== undefined ? value : "";
            });
            $.each(attributes, function(index, attr) {
                var value = elem.attr(attr);
                result[attr] = value !== undefined ? value : "";
            });
            result.style = getElementStyles(elem[0]);
            result.events = $._data(elem[0], "events");
            result.data = $.extend({}, elem.data());
            delete result.data[ $.expando ];
            children = elem.children();
            if(children.length){
                result.children = elem.children().map(function(){
                    return extract($(this));
                }).get();
            }else{
                result.text = elem.text();
            }
            return result;
        }

        function done() {
            actual = extract( $(selector) );
            QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
        }

        // Get current state prior to modifier
        expected = extract($(selector));

        // Run modifier (async or sync), then compare state via done()
        if( modifier.length) {
            modifier(done);
        } else {
            modifier();
            done();
        }
    };

})(jQuery);