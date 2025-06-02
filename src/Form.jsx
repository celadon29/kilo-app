import React, { useState, useEffect } from 'react';

const Form = ({ handleSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        body: '',
        datetime: '',
        contextNote: '',
        feeling: '',
        question: '',
        reflectsContext: false,
    });

//this is to populate the form if editing an existing entry
    useEffect(() => {
        if (initialData) {
            setFormData({ 
            ...initialData,
            datetime: initialData.datetime || new Date.toLocaleString()
        });
        } else {
            setFormData(prev => ({ ...prev, datetime: new Date().toLocaleString() }));
        }
    }, [initialData]);

    //convert empty strings to null on submit

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const cleanedData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
                key,
                typeof value === 'string' && value.trim() === '' ? null: value
            ])
        );
        handleSubmit(cleanedData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked: value;
        setFormData({
            ...formData,
            [name]: finalValue
        });
    };

    return (
            <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input
                    placeholder="Enter Title"
                    type="text"
                    name="title"
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
                <label>Questions</label>
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
                <button
                    type="submit"
                    style={{ 
                        marginTop: '12px',
                        width: 'fit-content',
                        padding: '8px 16px',
                     }}
                >
                    Save Entry
                </button>
            </form>
    );
};

export default Form;