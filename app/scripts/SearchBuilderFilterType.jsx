/**
 * @jsx React.DOM
 */
var React = require('react');

(function () {
    'use strict';

    var code = "er";

    module.exports = React.createClass({
        getInitialState: function () {
            var rv = {};
            return {filterType: "Everywhere"};
        },
        handleClickType: function (event) {
            this.setState({filterType: event.target.getAttribute('data-type')});
            code = event.target.getAttribute('data-code');
            this.props.setTextBox();
            this.props.focusTextBox();
        },
        handleClickValue: function (event) {
            code = event.target.getAttribute('data-code');
            this.props.setTextBox({value: event.target.getAttribute('data-text-value')});
            this.props.disablePhraseFilter();
            this.handleClickType(event);
        },
        getCode: function () {
            return code;
        },
        render: function() {
            return (
                <div className="input-group-btn">
                    <button type="button" className="typeFilter btn btn-default dropdown-toggle" data-toggle="dropdown">
                        {this.state.filterType} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        <li><a data-code="er" data-type="Everywhere" onClick={this.handleClickType} href="#">Everywhere</a></li>
                        <li><a data-code="ti" data-type="Title" onClick={this.handleClickType} href="#">Title</a></li>
                        <li><a data-code="per" data-type="Person" onClick={this.handleClickType} href="#">Person</a></li>
                        <li><a data-code="org" data-type="Organization" onClick={this.handleClickType} href="#">Organization</a></li>
                        <li className="dropdown-submenu">
                            <a data-code="dt" data-type="Type" onClick={this.handleClickType} href="#">Type</a>
                            <ul className="dropdown-menu ltdl-filter-what-phrase">
                                <li><a data-code="dt" data-type="Type" data-text-value="Letter" onClick={this.handleClickValue} href="#">Letter</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Email" onClick={this.handleClickValue} href="#">Email</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Report" onClick={this.handleClickValue} href="#">Report</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Ad" onClick={this.handleClickValue} href="#">Ad</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Video" onClick={this.handleClickValue} href="#">Video</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Memo" onClick={this.handleClickValue}href="#">Memo</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Newsletter" onClick={this.handleClickValue} href="#">Newsletter</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Journal" onClick={this.handleClickValue} href="#">Journal</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Invoice" onClick={this.handleClickValue} href="#">Invoice</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Financial" onClick={this.handleClickValue} href="#">Financial</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Agenda" onClick={this.handleClickValue} href="#">Agenda</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Form" onClick={this.handleClickValue} href="#">Form</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Article" onClick={this.handleClickValue} href="#">Article</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Audio" onClick={this.handleClickValue} href="#">Audio</a></li>
                                <li><a data-code="dt" data-type="Type" data-text-value="Graphics" onClick={this.handleClickValue} href="#">Graphics</a></li>
                                <li><a data-code="dt" data-type="Type" onClick={this.handleClickType} href="#">Other</a></li>
                            </ul>
                        </li>
                        <li className="dropdown-submenu">
                            <a data-code="brd" data-type="Brand Name" onClick={this.handleClickType} href="#">Brand Name</a>
                            <ul className="dropdown-menu ltdl-filter-what-phrase">
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="Camel" onClick={this.handleClickValue} href="#">Camel</a></li>
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="Marlboro" onClick={this.handleClickValue} href="#">Marlboro</a></li>
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="Viriginia Slims" onClick={this.handleClickValue} href="#">Virginia Slims</a></li>
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="Skoal" onClick={this.handleClickValue} href="#">Skoal</a></li>
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="Garcia Y Vega" onClick={this.handleClickValue} href="#">Garcia Y Vega</a></li>
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="More" onClick={this.handleClickValue} href="#">More</a></li>
                                <li><a data-code="brd" data-type="Brand Name" data-text-value="Winston" onClick={this.handleClickValue} href="#">Winston</a></li>
                                <li><a data-code="brd" data-type="Brand Name" onClick={this.handleClickType}  href="#">Other</a></li>
                            </ul>
                        </li>
                        <li><a data-code="bn" data-type="Bates Number" onClick={this.handleClickType} href="#">Bates Number</a></li>
                        <li><a data-code="id" data-type="ID Number" onClick={this.handleClickType} href="#">ID Number</a></li>
                        <li className="divider"></li>
                        <li className="dropdown-submenu">
                            <a href="#">More</a>
                            <ul className="dropdown-menu">
                                <li><a data-code="ot" data-type="Text" onClick={this.handleClickType} href="#">Text</a></li>
                                <li><a data-code="md" data-type="Metadata" onClick={this.handleClickType} href="#">Metadata</a></li>
                                <li><a data-code="kw" data-type="Keyword" onClick={this.handleClickType} href="#">Keyword</a></li>
                                <li><a data-code="notes" data-type="Notes" onClick={this.handleClickType} href="#">Notes</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        }
    });
}());
