/**
 * @jsx React.DOM
 */
var React = require('react');
var SearchTextBox = require('./SearchTextBox.jsx');
var FreeSearchClear = require('./FreeSearchClear.jsx');

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
            <form className="form-horizontal" role="form">
            <div className="form-row">
                <button type="button" className="btn btn-link pull-right">Start Over</button>

                <label className="pull-left control-label" htmlFor="ltdl3-freesearch">
                    {label}
                </label>
                <div className="input-group">
                    <SearchTextBox ref="textBox" htmlId="ltdl3-freesearch"/>
                    <div className="input-group-btn">
                        <FreeSearchClear/>
                    </div>
                </div>
            </div>
            </form>
        );
    }
});

