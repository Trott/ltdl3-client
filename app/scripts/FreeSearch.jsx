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
                <label className="col-sm-3 control-label" htmlFor="ltdl3-freesearch">
                    {label}
                </label>
                <div className="input-group col-sm-9">
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

