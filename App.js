import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db, collection, addDoc, onSnapshot, deleteDoc, doc } from './firebaseConfig';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notes'), snapshot => {
      const updatedNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(updatedNotes);
    });

    return () => unsubscribe();
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, 'notes'), {
          text: newNote.trim(),
          createdAt: new Date().toISOString()
        });
        console.log("Berhasil tambah note dengan ID: ", docRef.id);
        setNewNote('');
      } catch (error) {
        console.error("Error adding note: ", error);
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      console.log("Berhasil delete note dengan ID: ", noteId);
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text>{item.text}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNote(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App ODP BNI</Text>
      <TextInput
        style={styles.input}
        value={newNote}
        onChangeText={setNewNote}
        placeholder="Add a note..."
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  noteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  }
});