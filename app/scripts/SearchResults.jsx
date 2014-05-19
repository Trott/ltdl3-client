/**
 * @jsx React.DOM
 */
var React = require('react');

(function () {
    'use strict';

    module.exports = React.createClass({
        getInitialState: function () {
            return {};
        },
        componentDidMount: function () {
            if (this.props.searchResultsData) {
                this.show(this.props.searchResultData);
            }
        },
        show: function (value) {
            this.setState(value);
        },
        render: function () {
            var data = this.state.data,
                response,
                numFound,
                docs,
                start,
                renderedRange,
                renderedResults;

            if (this.state.loading) {
                return (
                    <div className="progress progress-striped active">
                        <div className="progress-bar progress-bar-indeterminate" role="progressbar">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                );
            }

            if (data) {
                response = data.response;
            }

            if (response && response.docs instanceof Array) {
                docs = response.docs;
                numFound = response.numFound;
                start = response.start;
                if (numFound > 0) {
                    renderedRange = <div>{start+1}-{start+docs.length} of {numFound}</div>;
                } else {
                    renderedRange = <div>No results found.</div>;
                }
                renderedResults = <ol className="list-unstyled">
                                    {docs.map(function (doc) {
                                        return <li key={doc.id}>
                                            <div className="pull-right checkbox">
                                                <label>
                                                    <input type="checkbox"> Bookmark</input>
                                                </label>
                                            </div>
                                            <a href="#">{doc.ti}</a>
                                            <dl className="dl-horizontal">
                                                <dt>Document date</dt><dd>{doc.dd || 'Unknown'}</dd>
                                                <dt>Document type</dt><dd>{doc.dt || 'Unknown'}</dd>
                                                <dt>Bates number</dt><dd>{doc.bn || 'Unknown'}</dd>
                                                <dt>Source</dt><dd>{doc.source || 'Unknown'}</dd>
                                                <dt>Pages</dt><dd>{doc.pg || 'Unknown'}</dd>

                                            </dl>
                                        </li>;
                                    }.bind(this))}
                                </ol>;
            }


            return (
                <div>
                    {renderedRange}
                    {renderedResults}
                </div>
            );
        }
    });
}());
