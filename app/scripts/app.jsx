/**
 * @jsx React.DOM
 */
var React = require('react');
var GithubRibbon = require('./GithubRibbon.jsx');
var SearchBuilder = require('./SearchBuilder.jsx');
var SearchResults = require('./SearchResults.jsx');
var Footer = require('./Footer.jsx');

(function () {
    'use strict';

/* TODO: Subcomponents use data- attributes. Use props instead. */

    var LtdlApp = React.createClass({
        showResults: function (results) {
            this.refs.results.show(results);
        },
        render: function () {
            return (
                <div className="container">
                    <GithubRibbon/>
                    <h1>Search the Legacy Tobacco Documents</h1>
                    <SearchBuilder showResults={this.showResults}/>
                    <SearchResults ref="results"/>
                    <Footer/>
                </div>
            );
        }
    });

    React.renderComponent(
        <LtdlApp/>,
        document.getElementById('content')
    );
}());
