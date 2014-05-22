/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var ReactTestUtils = React.addons.TestUtils;

var Query = require('../../app/scripts/query.js');

var GithubRibbon = require('../../app/scripts/GithubRibbon.jsx');
var SearchBuilder = require('../../app/scripts/SearchBuilder.jsx');
var SearchBuilderComponent = require('../../app/scripts/SearchBuilderComponent.jsx');
var SearchBuilderFilterType = require('../../app/scripts/SearchBuilderFilterType.jsx');
var SearchBuilderFilterPhrase = require('../../app/scripts/SearchBuilderFilterPhrase.jsx');
var SearchTextBox = require('../../app/scripts/SearchTextBox.jsx');
var SearchBuilderAdd = require('../../app/scripts/SearchBuilderAdd.jsx');
var FreeSearch = require('../../app/scripts/FreeSearch.jsx');
var FreeSearchClear = require('../../app/scripts/FreeSearchClear.jsx');

(function () {
    var query;

    describe('Query', function () {
        beforeEach(function() {
            query = new Query();
        });

        it('should expose getQueryString', function () {
            expect(query.getQueryString).toEqual(jasmine.any(Function));
        });
        it('should expose setQueryExpression', function () {
            expect(query.setQueryExpression).toEqual(jasmine.any(Function));
        });
        it('should expose enumGlueTypes', function () {
            expect(query.enumGlueTypes).toEqual(jasmine.any(Object));
        });
        it('should expose deleteQueryExpression', function () {
            expect(query.deleteQueryExpression).toEqual(jasmine.any(Function));
        });
        it('should instantiate with or without new operator', function () {
            var otherQuery = Query();
            expect(query instanceof Query).toBe(true);
            expect(otherQuery instanceof Query).toBe(true);
        });

        describe('getQueryString()', function () {
            it('should return an empty string initially', function () {
                expect(query.getQueryString()).toBe('');
            });

            it('should handle settings that are not defaults', function () {
                var settings = {term: 'foo bar', field: 'ti', glueType: query.enumGlueTypes.phrase};
                query.setQueryExpression(4, settings);
                expect(query.getQueryString()).toBe('(ti:"foo bar")');
            });

            it('should allow special chars allowed in Solr queries', function () {
                query.setQueryExpression(1, {term: '+foo -bar'});
                expect(query.getQueryString()).toBe('(er:+foo OR er:-bar)');

                query.setQueryExpression(1, {term: 'a&&b||c'});
                expect(query.getQueryString()).toBe('(er:a&&b||c)');

                query.setQueryExpression(1, {term: '!({[^"foo"]})'});
                expect(query.getQueryString()).toBe('(er:!({[^"foo"]}))');

                query.setQueryExpression(1, {term: '~a*b?'});
                expect(query.getQueryString()).toBe('(er:~a*b?)');

                query.setQueryExpression(1, {term: 'ti:\\(literal parentheses\\)', glueType: query.enumGlueTypes.phrase});
                expect(query.getQueryString()).toBe('(er:"ti:\\(literal parentheses\\)")');
            });

            it('should ignore special chars that are invalid in Solr queries', function () {
                query.setQueryExpression(1, {term: 'yo%plait'});
                expect(query.getQueryString()).toBe('(er:yo OR er:plait)');
            });

            it('should remove leading and trailing special chars that are invalid in Solr queries', function () {
                query.setQueryExpression(0, {term: '@foo@', glueType: query.enumGlueTypes.or});
                expect(query.getQueryString()).toBe('(er:foo)');

                query.setQueryExpression(0, {term: '@foo@', glueType: query.enumGlueTypes.and});
                expect(query.getQueryString()).toBe('(er:foo)');

                query.setQueryExpression(0, {term: '@foo@', glueType: query.enumGlueTypes.not});
                expect(query.getQueryString()).toBe('(-er:foo)');
            });
        });

        describe('setQueryExpression()', function () {
            it('should insert a query expression', function () {
                query.setQueryExpression(1, {term: 'foo', field: 'er'});
                expect(query.getQueryString()).toBe('(er:foo)');
            });

            it('should use OR by default', function () {
                query.setQueryExpression(1, {term: 'foo bar', field: 'er'});
                expect(query.getQueryString()).toBe('(er:foo OR er:bar)');
            });

            it('should use OR if specified', function () {
                query.setQueryExpression(1, {term: 'foo bar', field: 'er', glueType: query.enumGlueTypes.or});
                expect(query.getQueryString()).toBe('(er:foo OR er:bar)');
            });

            it('should use AND if specified', function () {
                query.setQueryExpression(1, {term: 'foo bar', field: 'er', glueType: query.enumGlueTypes.and});
                expect(query.getQueryString()).toBe('(er:foo AND er:bar)');
            });

            it('should use phrase if specified', function () {
                query.setQueryExpression(1, {term: 'foo bar', field: 'er', glueType: query.enumGlueTypes.phrase});
                expect(query.getQueryString()).toBe('(er:"foo bar")');
            });

            it('should use NOT if specified', function () {
                query.setQueryExpression(1, {term: 'foo bar', field: 'er', glueType: query.enumGlueTypes.not});
                expect(query.getQueryString()).toBe('(-er:foo AND -er:bar)');
            });

            it('should be able to change the code without changing the term', function () {
                query.setQueryExpression(1, {term: 'foo', field: 'er'});
                query.setQueryExpression(1, {field: 'ti'});
                expect(query.getQueryString()).toBe('(ti:foo)');
            });

            it('should create a query expression with wildcard term if term not provided', function () {
                query = new Query();
                query.setQueryExpression(1, {field: 'ti'});
                expect(query.getQueryString()).toBe('(ti:*)');
            });

            it('should modify glueType only if that is all that is sent', function () {
                query = new Query();
                query.setQueryExpression(1, {field: 'ti'});
                query.setQueryExpression(1, {glueType: query.enumGlueTypes.phrase});
                expect(query.getQueryString()).toBe('(ti:"*")')
            });

            it('should join multiple expressions with OR by default', function () {
                query = new Query();
                query.setQueryExpression(1, {term: 'foo'});
                query.setQueryExpression(2, {term: 'bar'});
                expect(query.getQueryString()).toBe('(er:foo) OR (er:bar)');
            });

            it('should join multiple expressions with OR if specified', function () {
                query = new Query();
                query.setQueryExpression(1, {term: 'foo', glueTypeNextTerm: query.enumGlueTypes.or});
                query.setQueryExpression(2, {term: 'bar'});
                expect(query.getQueryString()).toBe('(er:foo) OR (er:bar)');
            });

            it('should join multiple expressions with AND if specified', function () {
                query = new Query();
                query.setQueryExpression(1, {term: 'foo', glueTypeNextTerm: query.enumGlueTypes.and});
                query.setQueryExpression(2, {term: 'bar'});
                expect(query.getQueryString()).toBe('(er:foo) AND (er:bar)');
            });

            it('should join multiple expressions with NOT if specified', function () {
                query = new Query();
                query.setQueryExpression(1, {term: 'foo', glueTypeNextTerm: query.enumGlueTypes.not});
                query.setQueryExpression(2, {term: 'bar'});
                expect(query.getQueryString()).toBe('(er:foo) AND NOT (er:bar)');
            });
        });

        describe('deleteQueryExpression()', function () {
            it('should remove a previously added query expression', function () {
                query = new Query();
                query.setQueryExpression(1, {term: 'foo'});
                query.setQueryExpression(2, {term: 'bar'});
                query.deleteQueryExpression(1);
                expect(query.getQueryString()).toBe('(er:bar)');
            });
        });
    });

    describe('React.addons', function () {
        it('should include TestUtils', function () {
            expect(ReactTestUtils).toEqual(jasmine.any(Object));
        });
    });

    describe('LTDL3', function () {
        describe('GithubRibbon', function () {

            it('should render a link to the GitHub repo', function () {
                var ribbon = ReactTestUtils.renderIntoDocument(
                    <GithubRibbon/>
                );
                expect(ribbon.getDOMNode().getAttribute('href')).toBe('https://github.com/Trott/ltdl3-client');
            });
        });

        describe('SearchBuilder', function () {

            beforeEach(function () {
                // jQuery test double
                window.$ = {ajax: function () {}};
            });

            afterEach(function () {
                delete window.$;
            });

            it('should contain a SearchBuilderFilterType', function () {

                var builder = ReactTestUtils.renderIntoDocument(
                    <SearchBuilder/>
                );
                expect(ReactTestUtils.findRenderedComponentWithType(builder, SearchBuilderFilterType)).toBeTruthy();
            });

            it('should not call showResults() if no queryString passed', function () {
                var td = {showResults: function () {}};
                spyOn(td, 'showResults');
                var builder = ReactTestUtils.renderIntoDocument(
                    <SearchBuilder showResults={td.showResults}/>
                );
                expect(td.showResults).not.toHaveBeenCalled();
            });

            it('should call showResults() if queryString passed', function () {
                var td = {showResults: function () {}};
                spyOn(td, 'showResults');
                var builder = ReactTestUtils.renderIntoDocument(
                    <SearchBuilder showResults={td.showResults} queryString="(er:foo)"/>
                );
                expect(td.showResults).toHaveBeenCalled();
            });

            it('should show FreeSearch element if queryString passed', function () {
                var td = {showResults: function () {}};
                var builder = ReactTestUtils.renderIntoDocument(
                    <SearchBuilder showResults={td.showResults} queryString="tobacco"/>
                );
                expect(function () {
                    ReactTestUtils.findRenderedComponentWithType(builder, FreeSearch);
                }).not.toThrow();
            });

            xit('should put passed queryString into search box', function () {

            });
        });

        describe('SearchBuilderComponent', function () {

            it('should render expected subcomponents', function () {
                var component = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderComponent
                        queryBuilder={query}
                    />
                );
                expect(ReactTestUtils.findRenderedComponentWithType(component, SearchBuilderFilterType)).toBeTruthy();
                expect(ReactTestUtils.findRenderedComponentWithType(component, SearchBuilderFilterPhrase)).toBeTruthy();
                expect(ReactTestUtils.findRenderedComponentWithType(component, SearchTextBox)).toBeTruthy();
                expect(ReactTestUtils.findRenderedComponentWithType(component, SearchBuilderAdd)).toBeTruthy();
            });

            it('should have a setTextBoxValue() function that works with no passed parameters', function () {
                var component = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderComponent
                        InitialValue=""
                        key="comp0"
                        index={0}
                        add={this.add}
                        remove={this.remove}
                        queryBuilder={query}
                    />

                );
                expect(function(){component.setTextBoxValue();}).not.toThrow();
            });

            it('should initialize text box value to empty string if none provided', function () {
                var component = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderComponent
                        key="comp0"
                        index={0}
                        add={this.add}
                        remove={this.remove}
                        queryBuilder={query}
                    />
                );
                var textBox = ReactTestUtils.findRenderedComponentWithType(component, SearchTextBox);
                expect(textBox.state.value).toBe('');
            })

            it('should pass initialValue to setTextBoxValue()', function () {
                var component = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderComponent
                        initialValue="foo"
                        key="comp0"
                        index={0}
                        add={this.add}
                        remove={this.remove}
                        queryBuilder={query}
                    />
                );
                var textBox = ReactTestUtils.findRenderedComponentWithType(component, SearchTextBox);
                expect(textBox.state.value).toBe('foo');
            });
        });

        describe('SearchBuilderFilterPhrase', function () {

            it('should render 3 choices', function () {
                var restrictor = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderFilterPhrase/>
                );
                expect(restrictor.getDOMNode().querySelectorAll('.dropdown-menu li').length).toBe(3);
            });
        });

        describe('SearchBuilderAdd', function () {
            it('should not delete query expression if isAdd (as it is upon initial creation)', function () {
                spyOn(query, 'deleteQueryExpression');
                var addButton = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderAdd queryBuilder={query}/>
                );
                addButton.remove();
                expect(query.deleteQueryExpression).not.toHaveBeenCalled();
            });

            it('should have handler for add that returns false to avoid navigation on clicks', function () {
                var tdEvent = {target: document.createElement('div'), preventDefault: function () {}};
                var addButton = ReactTestUtils.renderIntoDocument(
                    <SearchBuilderAdd add={function () {}} index={0} queryBuilder={query}/>
                );
                spyOn(tdEvent, 'preventDefault');
                expect(addButton.add(tdEvent));
                expect(tdEvent.preventDefault).toHaveBeenCalled();
            });
        });

        describe('SearchTextBox', function () {
            it('should render id if passed', function () {
                var box = ReactTestUtils.renderIntoDocument(
                    <SearchTextBox htmlId="ltdl3-freesearch"/>
                );
                expect(box.getDOMNode().id).toBe('ltdl3-freesearch');
            });
        });

        describe('FreeSearch', function () {
            it('should render a text box', function () {
                var search = ReactTestUtils.renderIntoDocument(
                    <FreeSearch/>
                );
                expect(function () {
                    ReactTestUtils.findRenderedComponentWithType(search, SearchTextBox);
                }).not.toThrow();
            });

            it('should print "You searched for:" if non-empty initial query string is provided', function () {
                var search = ReactTestUtils.renderIntoDocument(
                    <FreeSearch initialValue="tobacco"/>
                );
                expect(search.getDOMNode().textContent).toMatch(/You searched for:/);
            });

            it('should set the search box value to initial query string value', function () {
                var search = ReactTestUtils.renderIntoDocument(
                    <FreeSearch initialValue="cancer merchants"/>
                );
                expect(search.getDOMNode().querySelector('input').value).toBe('cancer merchants');
            });

            it('should render a free search clear button', function () {
                var search = ReactTestUtils.renderIntoDocument(
                    <FreeSearch/>
                );
                expect(function () {
                    ReactTestUtils.findRenderedComponentWithType(search, FreeSearchClear);
                }).not.toThrow();
            })
        });
    });
})();
