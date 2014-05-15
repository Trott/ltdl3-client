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

var LtdlApp = React.createClass({
    showResults: function (results) {
        this.refs.results.show(results);
    },
    render: function () {
        return (
            <div className="container">
                <GithubRibbon/>
                <h1>Search the Legacy Tobacco Documents</h1>
                <SearchBuilder showResults={this.showResults} url="http://apis.ucsf.edu/solr/ltdl3test/select"/>
                <SearchResults ref="results"/>
                <Footer/>
            </div>
        );
    }
});

var App = Backbone.Router.extend({
    routes: {
        "": "default"
    }
});

var app = new App();
app.on('route', function(page) {
    React.renderComponent(<LtdlApp/>, appDomElement);
});

Backbone.history.start();