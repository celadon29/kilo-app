import React, { useState, Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            title: '',
            location: '',
            body: '',
            question: '',
            feeling: '',
        }

        this.state = this.initialState
    }

    handleChange = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    submitForm = () => {
        const timestamp = new Date().toLocaleString();
        const entryWithTimestamp = {
            ...this.state,
            datetime: timestamp
        };
        this.props.handleSubmit(entryWithTimestamp);
        this.setState(this.initialState);
    }

    render() {
        const { title, location, body, question, feeling } = this.state;

        return (
            <div>
                <form>
                    <label>Title</label>
                    <input
                        placeholder="Enter Title"
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={this.handleChange} />
                    <label>Location</label>
                    <input
                        placeholder="Location"
                        type="textarea"
                        name="location"
                        id="location"
                        value={location}
                        onChange={this.handleChange} />
                    <label>Entry</label>
                    <input
                        placeholder="What do you notice?"
                        type="textarea"
                        name="body"
                        id="body"
                        value={body}
                        onChange={this.handleChange} />
                    <label>Questions</label>
                    <input
                        placeholder="What questions do you have about it?"
                        type="textarea"
                        name="question"
                        id="question"
                        value={question}
                        onChange={this.handleChange} />
                    <label>Feeling</label>
                    <input
                        placeholder="How does it make you feel?"
                        type="textarea"
                        name="feeling"
                        id="feeling"
                        value={feeling}
                        onChange={this.handleChange} />
                </form>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        )
    }
}

export default Form;