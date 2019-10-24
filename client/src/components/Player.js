import React, { Component } from 'react'
import io from "socket.io-client";

export default class Player extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state = {
        username: "",
        pin: ""
    }

    handleSubmit() {
        
        const socket = io("10.10.20.225:3000") // probably not your ip :p
        socket.emit("signup", {
            username: this.state.username,
            pin: this.state.pin
        })

        socket.on("game-started", (data)=> {
            debugger
            // re route to next stage here
        })
    }

    handleChange = (e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <h1>Player</h1>
                <input onChange={this.handleChange} type="text" placeholder="username" name="username"/>
                <input onChange={this.handleChange} type="text" name="pin"/>
                <button onClick={this.handleSubmit}>Join</button>
            </div>
        )
    }
}
