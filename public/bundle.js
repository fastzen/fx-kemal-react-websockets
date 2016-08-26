(function (React,reactDom) {
'use strict';

var React__default = 'default' in React ? React['default'] : React;

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Direction = function (_a) {
    var _b = _a.val, val = _b === void 0 ? 0 : _b;
    return val === -1 ?
        React__default.createElement("td", {style: { color: "red" }}, "\u25bc") :
        React__default.createElement("td", {style: { color: "green" }}, (val !== 0) && "\u25b2");
};
var Row = (function (_super) {
    __extends(Row, _super);
    function Row(props) {
        _super.call(this, props);
        this.state = { direction: 0, changed: false };
    }
    Row.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props.data, prevBidBig = _a.bidBig, prevBidPips = _a.bidPips;
        var _b = nextProps.data, bidBig = _b.bidBig, bidPips = _b.bidPips;
        var diff = (bidBig + bidPips) - (prevBidBig + prevBidPips);
        this.setState({ changed: !!diff });
        if (diff)
            this.setState({ direction: diff < 0 ? -1 : 1 });
    };
    Row.prototype.render = function () {
        return (React__default.createElement("tr", null, React__default.createElement("td", null, this.props.data.currencyPair), React__default.createElement("td", {className: "changed-" + this.state.changed}, this.props.data.bidBig, React__default.createElement("sup", null, this.props.data.bidPips)), React__default.createElement(Direction, {val: this.state.direction})));
    };
    return Row;
}(React.Component));

var FXComponent = (function (_super) {
    __extends(FXComponent, _super);
    function FXComponent(props) {
        _super.call(this, props);
        this.state = { fxRates: [] };
    }
    FXComponent.prototype.componentDidMount = function () {
        var _this = this;
        var hostname = location.hostname, port = location.port, protocol = location.protocol;
        var websocketProtocol = (location.protocol === 'http:') ? 'ws' : 'wss';
        var server = new WebSocket(websocketProtocol + "://" + hostname + ":" + port);
        server.onmessage = function (event) {
            _this.setState({ fxRates: JSON.parse(event.data) });
        };
        this.server = server;
    };
    FXComponent.prototype.render = function () {
        return (React__default.createElement("table", null, React__default.createElement("tbody", null, this.state.fxRates.map(function (rate) { return (React__default.createElement(Row, {key: rate.currencyPair, data: rate})); }))));
    };
    return FXComponent;
}(React.Component));
reactDom.render(React__default.createElement(FXComponent, null), document.getElementById("root"));

}(React,ReactDOM));