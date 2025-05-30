import React, { Component } from 'react';

const EntryBody = props => {
    const lines = props.entryData.map((line, index) => {
        return (
            <div key={index}>
                <h2>{line.title}</h2>
                <h3>Location: {line.location}</h3>
                <p>Observation: {line.body}</p>
                {line.contextNote && (
                    <p><strong>Context reflection:</strong> {line.contextNote}</p>
                )}
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
                <button onClick={() => props.editEntry(line, index)}>Edit</button>
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this entry?")) {
                            props.removeEntry(index);
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        );
    });

    return (
        <div>
            {lines}
        </div>
    );
};

const Entries = (props) => {
    const { entryData, removeEntry, editEntry } = props;

    return (
        <div>
            <h2>My Observations</h2>
            <EntryBody 
                entryData={entryData} 
                removeEntry={removeEntry} 
                editEntry={editEntry}
            />
        </div>
    );
};

export default Entries;