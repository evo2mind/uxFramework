/*
**  script for uxFramework Utilities
**  updated 2013.05.21 
**  develop by evo2mind
**
**  Depends:
**      xregexp.js
**      
**      
*/

var ux = {} || ux;

ux.utils = {
    regex:{
        inputFilters: {
            alphanumeric: /\w/,
                number: /\d/,
                notIlegalChar: ''
        },
        formatFilters: {
            username: /([a-zA-Z]+[a-zA-Z0-9]{3,25})/,
            fullName: '',
            email: '',
            date: /^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{4})$/i
        }
    }
};

