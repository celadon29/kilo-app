import React, { useState, useEffect, use } from 'react';

const Form = ({ handleSubmit, initialData }) => {
    const initialState = {
        title: '',
        location: '',
        body: '',
        question: '',
        feeling: '',
        reflectsContext: false,
        contextNote: ''
    };

    const [formData, setFormData] = useState(initialData ? { ...initialData } : initialState);

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData });
        } else {
            setFormData(initialState);
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submitForm = () => {
        const timestamp = new Date().toLocaleString();
        const entryWithTimestamp = {
            ...formData,
            datetime: timestamp
        };
        handleSubmit(entryWithTimestamp);
        setFormData(initialState);
    };

    const { title, location, body, question, feeling, reflectsContext, contextNote } = formData;

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); submitForm(); }}>
                <label>Title</label>
                <input
                    placeholder="Enter Title"
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <label>Location</label>
                <input
                    placeholder="Location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <label>Entry</label>
                <textarea
                    placeholder="What do you notice?"
                    type="text"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                ></textarea>
                <label>
                    <input
                        type="checkbox"
                        name="reflectsContext"
                        checked={formData.reflectsContext}
                        onChange={handleChange}
                    />
                    This observation reflects something about this place, season, or era.
                </label>
                {formData.reflectsContext && (
                    <div>
                        <label>What does it say?</label>
                        <textarea
                            type="text"
                            name="contextNote"
                            placeholder="Optional context reflection"
                            value={formData.contextNote}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                )}
                <label> Questions</label>
                <textarea
                    placeholder="What questions do you have about it?"
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                ></textarea>
                <label>Feeling</label>
                <input
                    placeholder="How does it make you feel?"
                    type="text"
                    name="feeling"
                    value={formData.feeling}
                    onChange={handleChange}
                />
            </form>
            <button 
                onClick={submitForm}
                style={{marginTop: '12px' }}
            >
                Submit
            </button>
        </div>
    );
};

export default Form;