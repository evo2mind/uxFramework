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

ux.utils = {
    inputFilters: {
	    alphanumeric: /\w/,
	    number: /\d/,
	    notIlegalChar: ''
    },	
    formatFilters: {
	    username: /([a-zA-Z]+[a-zA-Z0-9]{3,})/,
	    fullName: '',
	    email: '',
	    date: '',
    }
    
};

