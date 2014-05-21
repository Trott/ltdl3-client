/**
 * @jsx React.DOM
 */
var React = require('react');

(function () {
    'use strict';

    module.exports = React.createClass({
        getInitialState: function () {
            return {
                isAdd: true,
                label: ""
            }
        },
        add: function (event) {
            this.setState({label: event.target.getAttribute('data-label')});

            if (this.state.isAdd) {
                this.setState({isAdd: false});
                this.props.add(this.props.index);
            }
            this.props.queryBuilder.setQueryExpression(this.props.index, {glueTypeNextTerm: this.props.queryBuilder.enumGlueTypes[event.target.getAttribute('data-value')]});
            return false;
        },
        remove: function () {
            if (! this.state.isAdd) {
                this.props.queryBuilder.deleteQueryExpression(this.props.index);
                this.props.remove(this.props.index);
            }
        },
        render: function () {
            var revisePulldownStyle = {display: "inherit"};
            var toggleClass = "";
            if (this.state.isAdd) {
                revisePulldownStyle = {display: "none"}
                toggleClass = "dropdown-toggle"
            }
            return (
                <div className="input-group-btn">
                    <button style={revisePulldownStyle} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">{this.state.label} <span className="caret"></span></button>
                    <button type="button" onClick={this.remove} className="tip btn btn-default {toggleClass}" data-toggle="dropdown" title="Click and choose a selector to add a new row"><span className={"glyphicon glyphicon-" + (this.state.isAdd ? "plus" : "minus")}></span></button>
                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                        <li><a data-label="AND" data-value="and" onClick={this.add} href="#">AND</a></li>
                        <li><a data-label="OR" data-value="or" onClick={this.add} href="#">OR</a></li>
                        <li><a data-label="NOT" data-value="not" onClick={this.add} href="#">NOT</a></li>
                    </ul>
                </div>
            )
        }
    });
}());
