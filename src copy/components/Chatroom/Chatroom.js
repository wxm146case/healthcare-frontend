import React, {Component} from 'react';
import './Chatroom.css'

import axios from 'axios';
import {connect} from "react-redux";
import {getDoctors} from "../../actions/doctors.action";

const API_URL_WS = process.env.REACT_APP_API_URL_WS;
const API_URL = process.env.REACT_APP_API_URL;

const ws = new WebSocket(`${API_URL_WS}/websocket`);

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputContent: ''
        }
    }

    componentDidMount() {
        ws.onopen = function (e) {
            const msg =JSON.parse(localStorage.getItem('user')).userDetail.name;
            ws.send(JSON.stringify({ data: "Welcome! "+ msg, from: 'System' }));
        };
        ws.onmessage = (msg)=> {
            console.log('received message: %o', JSON.parse(msg.data));
            this.setState(
                {
                    messages: [...this.state.messages, {content: JSON.parse(msg.data).data, from: JSON.parse(msg.data).from} ]
                }
            );
        };
        ws.onclose = function (e) {
            console.log('lost connection');
        };

        if (localStorage.getItem('user')) {
            axios.put(`${API_URL}/doctor-on/${JSON.parse(localStorage.getItem('user')).id}`)
                .then((res) => {
                    console.log(res);
                });
        }


    }

    componentWillUnmount(){
        axios.put(`${API_URL}/doctor-off/${JSON.parse(localStorage.getItem('user')).id}`)
            .then((res) => {
                console.log(res);
                this.props.getDoctors();
            });

    };

    handleChange = (event) => {
        this.setState(
            {
                inputContent: event.target.value
            }
        )
    };

    handleClear = (event) => {
        this.setState(
            {
                messages:[]
            }
        )
    };

    sendMessage = () => {

        ws.send(JSON.stringify({ data: this.state.inputContent, from: JSON.parse(localStorage.getItem('user')).userDetail.name }));
    }


    render() {
        return (
            <div>
                <div className="chat-container">
                    <div className="card" id="main-card">
                        <ul className="list-group" id="chat-list">
                            {this.state.messages.map((message) => {
                                if (message.from === JSON.parse(localStorage.getItem('user')).userDetail.name ) {
                                    return (
                                        <li className="list-group-item" id="chat-list-item-self">
                                            <h5>
                                                <b>{message.from}</b>
                                            </h5>
                                            <p>
                                                <span> {message.content} </span>
                                            </p>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="list-group-item" id="chat-list-item">
                                            <h5>
                                                <b>{message.from}</b>
                                            </h5>
                                            <p>
                                                <span> {message.content} </span>
                                            </p>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div className="chat-footer-container">
                    <div className="chat-input">
                        <textarea className="chat-input" aria-label="With textarea" onChange={this.handleChange} />
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-primary" onClick={this.sendMessage}>Send</button>
                        <button type="button" className="btn btn-outline-info" onClick={this.handleClear}>Clear</button>
                    </div>
                </div>

            </div>
        )
    }
}



export default connect(null, {getDoctors})(Chatroom);