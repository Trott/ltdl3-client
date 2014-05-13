/**
 * @jsx React.DOM
 */
var React = require('react');
var query = require('./query.js');

(function () {
    'use strict';

    var choices = [
        {key: 'choice0', glue: 'or', label: 'for any of the words'},
        {key: 'choice1', glue: 'and', label: 'for all of the words'},
        {key: 'choice2', glue: 'phrase', label: 'for the exact phrase'}
    ];

    module.exports = React.createClass({
        enable: function () {
            this.refs.button.getDOMNode().removeAttribute('disabled');
        },
        disable: function () {
            this.refs.button.getDOMNode().setAttribute('disabled', 'disabled');
        },
        getInitialState: function () {
            return {filterPhrase: choices[0].label};
        },
        handleClick: function (event) {
            this.setState({filterPhrase: event.target.getAttribute('data-value')});
            this.props.setQueryExpression(this.props.index, {glueType: query.enumGlueTypes[event.target.getAttribute('data-glue')]});
            this.props.focusTextBox();
        },
        render: function() {
            var renderedChoices = choices.map(function (choice) {
                return <li key={choice.key}><a data-value={choice.label} data-glue={choice.glue} onClick={this.handleClick} href="#">{choice.label}</a></li>;
            }.bind(this));
            return (
                <div className="input-group-btn">
                    <button ref="button" type="button" className="phraseFilter tip btn btn-default dropdown-toggle" data-toggle="dropdown" title="Search for any words, all words, or an exact phrase.">
                        {this.state.filterPhrase} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        {renderedChoices}
                    </ul>
                </div>
            );
        }
    });
}());
