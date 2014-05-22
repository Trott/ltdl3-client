/**
 * @jsx React.DOM
 */
var React = require('react');

(function () {
    'use strict';

    module.exports = React.createClass({
        focus: function () {
            this.refs.textInputElement.getDOMNode().focus();
        },
        handleChange: function (event) {
            if (this.props.enablePhraseFilter) {
                this.props.enablePhraseFilter();
                this.props.setTextBoxValue({
                    code: event.target.getAttribute('data-code'),
                    value: event.target.value
                });
            }
        },
        getInitialState: function () {
            return { value: '' };
        },
        render: function () {
            var rv = <input id="ltdl-freesearch" type="text" value={this.state.value} ref="textInputElement" onChange={this.handleChange} className="form-control" placeholder="Tip: use (*) or (?) to find word variants like legislat* and wom?n"></input>;
            if (this.props.label) {
                rv = <div className="form-group"><label htmlFor="ltdl-freesearch" className="col-sm-3 control-label">{this.props.label}</label><div className="col-sm-9">{rv}</div></div>;
            }

            return rv;
        }
    });
}());
