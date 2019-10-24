import React, { Component } from 'react'
import io from 'socket.io-client';
import {Route, Link} from "react-router-dom";

import Host from "./components/Host";
import Player from "./components/Player";

export default class App extends Component {


  render() {
    return (
      <div>
        <Link to="host"> Host </Link>
        <Link to="player"> Player </Link>

        <Route path="/host"  component={Host} />
        <Route path="/player"  component={Player} />
      </div>
    )
  }
}


