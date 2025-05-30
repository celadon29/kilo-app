import React, { Component } from 'react';
import Entries from './Entries';
import Form from './Form';
import { useState } from 'react'
import './Styles.css';

class App extends Component {
  state = {
    entries: [],
    showForm: false,
    entryBeingEdited: null,
    editIndex: null
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
      entryBeingEdited: null,
      editIndex: null
    });
  };

  removeEntry = index => {
    const { entries } = this.state;
    this.setState({
      entries: entries.filter((entry, i) => i !== index)
    });
  };

  handleEdit = (entry, index) => {
    this.setState({
      showForm: true,
      entryBeingEdited: entry,
      editIndex: index
    });
  };

  handleSubmit = entry => {
    const { entries, editIndex } = this.state;

    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = entry;
      this.setState({
        entries: updatedEntries,
        showForm: false,
        entryBeingEdited: null,
        editIndex: null
      });
    } else {
      this.setState({
        entries: [...this.state.entries, entry],
        showForm: false
      });
    }
  };

  render() {
    const { entries, showForm } = this.state;

    return (
      <div className='App'>
        <h1>Practicing Kilo</h1>
        <p className="italic-text">Kilo means to watch, observe, examine, or forecast. 
          Kilo can be used to describe the action of watching or a person who is an expert in kilo practice. 
          Kilo also refers to a Hawaiian observation approach during which practitioners focus on the less obvious, more subtle things in their environment.</p>
        <button onClick={this.toggleForm}>
          {showForm ? 'Close Form' : 'New Entry'}
        </button>

        {showForm && (
          <div
            className="modal"
            onClick={this.toggleForm}
          >
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <Form
                handleSubmit={this.handleSubmit}
                initialData={this.state.entryBeingEdited}
              />

              <button onClick={this.toggleForm}>Close</button>
            </div>
          </div>
        )}
        {entries.length > 0 && (
          <Entries
            entryData={entries}
            removeEntry={this.removeEntry}
            editEntry={this.handleEdit}
          />
        )}
      </div>
    );
  }
}

export default App;
