/**
 * @jsx React.DOM
 */
var React = require('react');
var searchBuilderFilterType = require('./searchBuilderFilterType.jsx');
var searchBuilderFilterPhrase = require('./searchBuilderFilterPhrase.jsx');
var searchBuilderTextBox = require('./searchBuilderTextBox.jsx');
var searchBuilderAdd = require('./searchBuilderAdd.jsx');

(function () {
    'use strict';
    var queryExpression = '';

    module.exports = React.createClass({
        focusTextBox: function () {
            this.refs.textBox.focus();
        },
        setTextBoxValue: function (value) {
            this.refs.textBox.setState({value: value});
            this.props.setQueryExpression(value, this.props.index);
        },
        disablePhraseFilter: function () {
            this.refs.phraseFilter.disable();
        },
        enablePhraseFilter: function () {
            this.refs.phraseFilter.enable();
        },
        componentDidMount: function () {
            this.focusTextBox();
        },
        render: function() {
            return (
                <div className="form-group">
                    <div className="input-group">
                        <searchBuilderFilterType
                            focusTextBox={this.focusTextBox}
                            setTextBox={this.setTextBoxValue}
                            disablePhraseFilter={this.disablePhraseFilter}
                        />
                        <searchBuilderFilterPhrase
                            index={this.props.index}
                            ref="phraseFilter"
                            focusTextBox={this.focusTextBox}
                        />
                        <searchBuilderTextBox setTextBoxValue={this.setTextBoxValue} enablePhraseFilter={this.enablePhraseFilter} ref="textBox"/>
                        <searchBuilderAdd index={this.props.index} add={this.props.add} remove={this.props.remove}/>
                    </div>
                </div>
            );
        }
    });
}());

