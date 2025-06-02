import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from './firebase';

export const addEntry = async (entry) => {
    try {
        const docRef = await addDoc(collection(db, "entries"), entry);
        return docRef.id;
    } catch (error) {
        console.error("Error adding entry:", error);
        throw error;
    }
};

export const getAllEntries = async () => {
    const snapshot = await getDocs(collection(db, "entries"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteEntry = async (id) => {
    await deleteDoc(doc(db, "entries", id));
};

export const updateEntry = async (id, updatedEntry) => {
    await updateDoc(doc(db, "entries", id), updatedEntry);
};
