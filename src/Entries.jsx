import React, { Component } from 'react';

const EntryBody = props => {
    const lines = props.entryData.map((line, index) => {
        return (
            <div key={index}>
                <h2>{line.title}</h2>
                <h3>Location: {line.location}</h3>
                <p>Observation: {line.body}</p>
                <p>Wondering: {line.question}</p>
                <p>I'm feeling {line.feeling}.</p>
                <p>Kilo made at: {new Date(line.datetime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                    })}
                </p>
                <button onClick={() => props.removeEntry(index)}>Delete</button>
            </div>
        )
    })

    return (
        <div>
            {lines}
        </div>
    )
}

const Entries = (props) => {
        const { entryData, removeEntry } = props

    return (
        <div>
            <h2>My Entries</h2>
            <EntryBody entryData={entryData} removeEntry={removeEntry}/>
        </div>
        )
    }

export default Entries