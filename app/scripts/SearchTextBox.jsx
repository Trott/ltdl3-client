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
            // TODO: Refactor: conditional logic to not run anything if this is in freesearch mode.
            // Maybe just send an event to subscribed components?
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
            var rv = <input id={this.props.htmlId} type="text" value={this.state.value} ref="textInputElement" onChange={this.handleChange} className="form-control" placeholder="Tip: use (*) or (?) to find word variants like legislat* and wom?n"></input>;
            return rv;
        }
    });
}());
