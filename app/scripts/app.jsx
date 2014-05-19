/**
 * @jsx React.DOM
 */
var React = require('react');
var Backbone = require('backbone');
Backbone.$ = $;

var GithubRibbon = require('./GithubRibbon.jsx');
var SearchBuilder = require('./SearchBuilder.jsx');
var SearchResults = require('./SearchResults.jsx');
var Footer = require('./Footer.jsx');

/* TODO: Subcomponents use data- attributes. Use props instead. */

var appDomElement = document.getElementById('content');

var searchResultsData;

var LtdlApp = React.createClass({
    showResults: function (results) {
        if (this.refs.results) {
            this.refs.results.show(results);
        } else {
            searchResutsData = results;
        }
    },
    render: function () {
        return (
            <div className="container">
                <GithubRibbon/>
                <h1>Search the Legacy Tobacco Documents</h1>
                <SearchBuilder router={this.props.router} queryString={this.props.queryString} showResults={this.showResults} url="http://apis.ucsf.edu/solr/ltdl3test/select"/>
                <SearchResults ref="results" searchResultsData={searchResultsData} />
                <Footer/>
            </div>
        );
    }
});

var App = Backbone.Router.extend({
    routes: {
        "search/:queryString": "search",
        "*path": "default"
    }
});

var app = new App();

app.on('route:search', function(queryString) {
    var page = React.renderComponent(<LtdlApp router={app} queryString={queryString}/>, appDomElement);
})

app.on('route:default', function() {
    React.renderComponent(<LtdlApp router={app}/>, appDomElement);
});

Backbone.history.start();
