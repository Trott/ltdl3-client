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
                <div className="form-group">
                    <label htmlFor="ltdl3-freesearch" className="col-sm-3 control-label">
                        {label}
                    </label>
                    <div className="col-sm-7">
                        <SearchTextBox ref="textBox" htmlId="ltdl3-freesearch"/>
                    </div>
                    <FreeSearchClear/>
                </div>
            </form>
        );
    }
});

