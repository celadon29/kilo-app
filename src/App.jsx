import React, { Component } from 'react';
import Entries from './Entries';
import Form from './Form';
import { useState } from 'react'
//import './App.css'

class App extends Component {
  state = {
    entries: [

    ]
  }

  removeEntry = index => {
    const { entries } = this.state

    this.setState({
      entries: entries.filter((entry, i) => {
        return i != index
      })
    })
  }

  handleSubmit = entry => {
    this.setState({ entries: [...this.state.entries, entry]})
  } 

  render() {
    const { entries } = this.state;

    return (
      <div className='App'>
        <h1>Kilo App</h1>
        <Entries entryData={entries} removeEntry={this.removeEntry} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }

}

export default App;
