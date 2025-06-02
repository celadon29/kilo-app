import React, { Component } from 'react';

const EntryBody = props => {
    const entries = props.entryData.map((entry, index) => {
        return (
            <div key={entry.id}>
                <h2>{entry.title}</h2>
                <h3>Location: {entry.location}</h3>
                <p>Observation: {entry.body}</p>
                {entry.contextNote && (
                    <p><strong>Context reflection:</strong> {entry.contextNote}</p>
                )}
                <p>Wondering: {entry.question}</p>
                <p>I'm feeling {entry.feeling}.</p>
                <p>Kilo made at: {new Date(entry.datetime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </p>
                <button onClick={() => props.editEntry(entry, index)}>Edit</button>
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this entry?")) {
                            props.removeEntry(entry.id);
                        }
                    }}>
                    Delete
                </button>
            </div>
        );
    });

    return (
        <div>
            {entries}
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