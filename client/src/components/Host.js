import React, { Component } from 'react'
import io from "socket.io-client";
export default class Host extends Component {
    constructor(props) {
        super(props)
        this.startGame = this.startGame.bind(this)
    }
    state = {  
        pin: "",
        players: []
    }

    componentDidMount() {
        const socket = io(`10.10.20.225:3000`)
        socket.on("pin", data => {

            const {pin} = data;
            this.setState({pin})
        })

        socket.on("player-joined", data => {
            this.setState({
                players: [...this.state.players, data.username]
            })
        })        

        this.socket = socket

    }



    startGame() {
        
        this.socket.emit("start-game", {
            pin: this.state.pin
        })
    }

    render() {
        return (
            <div>
                <h1>Pin: {this.state.pin}</h1>
                <button onClick={this.startGame}>Start Game</button>

                {
                    this.state.players.length > 0 ?
                        <>
                        {this.state.players.map((player)=> (
                            <h1>{player}</h1>
                        ))
                        }
                        </>
                    :
                    <h1>Waiting for players</h1>
                }
            </div>
        )
    }
}
