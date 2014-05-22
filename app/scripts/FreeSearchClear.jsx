/**
 * @jsx React.DOM
 */
var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <button type="button" onClick={this.props.clear} className="tip btn btn-default"><span className="glyphicon glyphicon-remove"></span></button>
        )
    }
});

