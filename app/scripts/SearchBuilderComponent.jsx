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
        setTextBoxValue: function (term) {
            var code = this.refs.typeFilter.getCode();
            if (term) {
                this.refs.textBox.setState({value: term.value});
                this.props.queryBuilder.setQueryExpression(this.props.index, {
                    term: term.value,
                    field: code
                });
            } else {
                this.props.queryBuilder.setQueryExpression(this.props.index, {field: code});
            }
        },
        disablePhraseFilter: function () {
            this.refs.phraseFilter.disable();
        },
        enablePhraseFilter: function () {
            this.refs.phraseFilter.enable();
        },
        componentDidMount: function () {
            if (this.props.initialValue) {
                this.setTextBoxValue({value: this.props.initialValue});
            }
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
                            index={this.props.index}
                            queryBuilder={this.props.queryBuilder}
                        />
                        <searchBuilderTextBox
                            setTextBoxValue={this.setTextBoxValue}
                            enablePhraseFilter={this.enablePhraseFilter}
                            ref="textBox"/>
                        <searchBuilderAdd
                            index={this.props.index}
                            add={this.props.add}
                            remove={this.props.remove}
                            queryBuilder={this.props.queryBuilder}/>
                    </div>
                </div>
            );
        }
    });
}());

