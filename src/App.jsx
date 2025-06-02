import React, { useState, useEffect } from 'react';
import Entries from './Entries';
import Form from './Form';
import './Styles.css';
import db from './firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { addEntry, updateEntry, getAllEntries } from './firebaseUtils';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [entryBeingEdited, setEntryBeingEdited] = useState(null);

  const loadEntriesFromFirestore = async () => {
    try {
      const entriesFromFirestore = await getAllEntries();
      setEntries(entriesFromFirestore);
    } catch (error) {
      console.error("Error loading entries: ", error);
    }
  };

  useEffect(() => {
    loadEntriesFromFirestore();
  }, []);

  // useEffect(() => {
  //   const testEntry = {
  //     title: "Test",
  //     location: "Test location",
  //     body: "Test body",
  //     datetime: new Date().toLocaleString()
  //   };

  //   const testAdd = async () => {
  //     const id = await addEntry(testEntry);
  //     console.log("Test entry added with ID:", id);
  //   };

  //   testAdd(); // uncomment to run once
  // }, []);


  const toggleForm = () => {
    setShowForm(!showForm);
    setEntryBeingEdited(null);
  };

  const removeEntry = async (id) => {
    try {
      await deleteDoc(doc(db, "entries", id));
      setEntries(entries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleEdit = (entry, index) => {
    setEntryBeingEdited(entry);
    setShowForm(true);
  };

  const handleSubmit = async (entry) => {
    console.log('Submitting entry', entry);
    try {
      if (entryBeingEdited) {
        await updateEntry(entryBeingEdited.id, entry);
        setEntries(entries.map(e =>
          e.id === entryBeingEdited.id ? { ...entry, id: entryBeingEdited.id } : e
        ));
        setEntryBeingEdited(null);
      } else { //this is to remove any empty or undefined values before sending to Firestore
        const sanitizedEntry = Object.fromEntries(
          Object.entries(entry).filter(([_, value]) =>
            value !== "" && value !== null && value !== undefined
          )
        );

        const newId = await addEntry(sanitizedEntry);
        setEntries([...entries, { ...sanitizedEntry, id: newId }]);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting entry', error.code, error.message, error);
    }
  };

return (
  <div className='App'>
    <h1>Practicing Kilo</h1>
    <p className="italic-text">
      Kilo means to watch, observe, examine, or forecast.
      Kilo can be used to describe the action of watching or a person who is an expert in kilo practice.
      Kilo also refers to a Hawaiian observation approach during which practitioners focus on the less obvious, more subtle things in their environment.
    </p>
    <button onClick={toggleForm}>
      {showForm ? 'Close Form' : 'New Entry'}
    </button>

    {showForm && (
      <div
        className="modal"
        onClick={toggleForm}
      >
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
        >
          <Form
            handleSubmit={handleSubmit}
            initialData={entryBeingEdited}
          />

          <button onClick={toggleForm}>Close</button>
        </div>
      </div>
    )}

    {entries.length > 0 && (
      <Entries
        entryData={entries}
        removeEntry={removeEntry}
        editEntry={handleEdit}
      />
    )}
  </div>
);
};

export default App;
