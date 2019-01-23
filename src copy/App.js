import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/NavBar/Navbar";


class App extends Component {
  render() {
    return (
        <React.Fragment>
            <div className="container">
                <Navbar />
                {this.props.children}
            </div>
        </React.Fragment>
    )
  }
}

export default App;
