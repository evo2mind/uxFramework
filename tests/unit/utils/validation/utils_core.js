/*global test, expect, ok, equal, module, ux, console, XRegExp */

(function($){
    "use strict";

    module('Format Filter Validator');

    test('Username', function(){
        expect(7);
        var usernameFormatFilter = ux.utils.regex.formatFilters.username,
            test1 = 'evo2mind',
            test2 = 'ev',
            test3 = '3vo',
            test4 = '',
            test5 = ' e v o ',
            test6 = '-evo',
            test7 = 'e-v-o';

        ok(XRegExp.test(test1, usernameFormatFilter), 'Test text "' + test1 + '" pass Regular Expression Test');
        ok(!XRegExp.test(test2, usernameFormatFilter), 'Test text "' + test2 + '" un-pass Regular Expression Test');
        ok(!XRegExp.test(test3, usernameFormatFilter), 'Test text "' + test3 + '" un-pass Regular Expression Test');
        ok(!XRegExp.test(test4, usernameFormatFilter), 'Test text "' + test4 + '" un-pass Regular Expression Test');
        ok(!XRegExp.test(test5, usernameFormatFilter), 'Test text "' + test5 + '" un-pass Regular Expression Test');
        ok(!XRegExp.test(test6, usernameFormatFilter), 'Test text "' + test6 + '" un-pass Regular Expression Test');
        ok(!XRegExp.test(test7, usernameFormatFilter), 'Test text "' + test7 + '" un-pass Regular Expression Test');

    });

    test('Date', function(){
        expect(7);
        var dateFormatFilter = ux.utils.regex.formatFilters.date,
            test1 = '28-Apr-1986',
            test2 = '28 Apr 1986',
            test3 = '28/04/1986',
            test4 = '38-Apr-1986',
            test5 = '00-Apr-1986',
            test6 = '234567890',
            test7 = 'abcdefghij';

        ok(XRegExp.test(test1, dateFormatFilter), 'Test text "' + test1 + '" pass Regular Expression Test');
        ok(!XRegExp.test(test2,dateFormatFilter), 'Test text "' + test2 + '" un-pass Regular Expression Test');
        ok(!XRegExp.test(test3, dateFormatFilter), 'Test text "' + test3 + '"  un-pass Regular Expression Test');
        ok(!XRegExp.test(test4, dateFormatFilter), 'Test text "' + test4 + '"  un-pass Regular Expression Test');
        ok(!XRegExp.test(test5, dateFormatFilter), 'Test text "' + test5 + '"  un-pass Regular Expression Test');
        ok(!XRegExp.test(test6, dateFormatFilter), 'Test text "' + test6 + '"  un-pass Regular Expression Test');
        ok(!XRegExp.test(test7, dateFormatFilter), 'Test text "' + test7 + '"  un-pass Regular Expression Test');

    });

})(jQuery);