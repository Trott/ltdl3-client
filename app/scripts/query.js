(function () {
    'use strict';
    var queryExpressions = [];

    var regexTerm = /([\w:!\*]+)/g;
    var regexNonTerm = /[^\w:!\*]+/g;

    var glue = function (term, type, field) {
        var rv = '';

        switch (type) {
        case enumGlueTypes.or:
            rv += term.replace(regexTerm, field + ':$1');
            rv = rv.replace(regexNonTerm, ' OR ');
            break;
        case enumGlueTypes.and:
            rv += term.replace(regexTerm, field + ':$1');
            rv = rv.replace(regexNonTerm, ' AND ');
            break;
        case enumGlueTypes.phrase:
            rv += field + ':"' + term + '"';
            break;
        case enumGlueTypes.not:
            rv += term.replace(regexTerm, '!' + field + ':$1');
            rv = rv.replace(regexNonTerm, ' AND ');
            break;
        case enumGlueTypes.notPhrase:
            rv += '!' + field + ':"' + term + '"';
            break;
        }

        return rv;
    };

    var enumGlueTypes = {
        or: 1,
        and: 2,
        phrase: 3,
        not: 4,
        notPhrase: 5
    };

    module.exports.enumGlueTypes = enumGlueTypes;

    module.exports.setQueryExpression = function (index, settings) {
        var defaults = { term: '*', field: 'er', glueType: enumGlueTypes.or, glueTypeNextTerm: enumGlueTypes.or };
        settings = settings || defaults;
        var me = queryExpressions[index] || defaults;

        me.term = settings.term || me.term;
        me.field = settings.field || me.field;
        me.glueType = settings.glueType || me.glueType;
        me.glueTypeNextTerm = settings.glueTypeNextTerm || me.glueTypeNextTerm;

        queryExpressions[index] = me;
    };

    module.exports.getQueryString = function () {
        var prevJoiner;
        return queryExpressions.reduce(function(prev, cur) {
            var rv = prev;
            if (cur) {
                var gluedTerm = glue(cur.term, cur.glueType, cur.field);

                switch (prevJoiner) {
                case enumGlueTypes.or:
                    rv += ' OR ';
                    break;
                case enumGlueTypes.and:
                    rv += ' AND ';
                    break;
                case enumGlueTypes.not:
                    rv += ' AND NOT ';
                    break;
                }
                prevJoiner = cur.glueTypeNextTerm;

                rv += '(' + gluedTerm + ')';
            }
            return rv;
        }, '');
    };

    module.exports.resetQuery = function () {
        queryExpressions = [];
    };
}());
