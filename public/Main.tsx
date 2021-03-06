import React, {Component} from 'react';
import {render} from 'react-dom';
import Row from './Row';

class FXComponent extends Component<{}, FXComponentState> {
  constructor(props:any) {
    super(props);
    this.state = { fxRates: [] };
  }

  componentDidMount() {
    const { hostname, port, protocol } = location
    const websocketProtocol = (location.protocol === 'http:') ? 'ws' : 'wss';
    const server = new WebSocket(`${websocketProtocol}://${hostname}:${port}`);

      server.onmessage = (event:Array<FXRow>) => {
        this.setState({ fxRates: JSON.parse(event.data) })
      }

      this.server = server;

  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.fxRates.map((rate: FXRow) => (
            <Row key={rate.currencyPair} data={rate}></Row>)
          )}
        </tbody>
      </table>);
  }
}

render(
  <FXComponent></FXComponent>,
  document.getElementById("root")
);