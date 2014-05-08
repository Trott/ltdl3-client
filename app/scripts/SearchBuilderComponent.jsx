/**
 * @jsx React.DOM
 */
var React = require('react');
var searchBuilderFilterType = require('./SearchBuilderFilterType.jsx');
var searchBuilderFilterPhrase = require('./SearchBuilderFilterPhrase.jsx');
var searchBuilderTextBox = require('./SearchBuilderTextBox.jsx');
var searchBuilderAdd = require('./SearchBuilderAdd.jsx');

(function () {
    'use strict';

    module.exports = React.createClass({
        focusTextBox: function () {
            this.refs.textBox.focus();
        },
        setTextBoxValue: function (query) {
            var code = this.refs.typeFilter.getCode();
            if (query) {
                this.refs.textBox.setState({value: query.value});
                this.props.setQueryExpression(
                    query.value,
                    code,
                    this.props.index,
                    {glue: this.refs.phraseFilter.getGlue()}
                );
            } else {
                this.props.setQueryCode(code, this.props.index);
            }
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
                            ref="typeFilter"
                            focusTextBox={this.focusTextBox}
                            setTextBox={this.setTextBoxValue}
                            disablePhraseFilter={this.disablePhraseFilter}
                        />
                        <searchBuilderFilterPhrase
                            ref="phraseFilter"
                            focusTextBox={this.focusTextBox}
                            showExcludes={this.props.showExcludes}
                        />
                        <searchBuilderTextBox setTextBoxValue={this.setTextBoxValue} enablePhraseFilter={this.enablePhraseFilter} ref="textBox"/>
                        <searchBuilderAdd index={this.props.index} add={this.props.add} remove={this.props.remove}/>
                    </div>
                </div>
            );
        }
    });
}());

