/**
 * @jsx React.DOM
 */
var React = require('react');
var SearchTextBox = require('./SearchTextBox.jsx');

module.exports = React.createClass({
    componentDidMount: function () {
        if (this.props.initialValue) {
            this.refs.textBox.setState({value: this.props.initialValue});
        }
        this.refs.textBox.focus();
    },
    render: function () {
        var label = this.props.initialValue ? 'You searched for:' : '';

        return (
            <SearchTextBox ref="textBox" label={label}/>
        );
    }
});

