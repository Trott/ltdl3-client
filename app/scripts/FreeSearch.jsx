/**
 * @jsx React.DOM
 */
var React = require('react');
var SearchTextBox = require('./SearchTextBox.jsx');

module.exports = React.createClass({
    render: function () {
        var label = this.props.initialQueryString ? 'You searched for:' : '';

        return (
            <SearchTextBox label={label}/>
        );
    }
});

