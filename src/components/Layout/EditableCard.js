import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';



export const EditableCard = ({ id, title, text, image, link }) => {
    const [editTitle, setEditTitle] = useState(title);
    const [editText, setEditText] = useState(text);
    const [editImage, setEditImage] = useState(image);
    const [editLink, setEditLink] = useState(link);
  
    const handleSave = async () => {
      const cardDoc = doc(db, "cards", id);
      await updateDoc(cardDoc, {
        title: editTitle,
        text: editText,
        image: editImage,
        link: editLink
      });
    };
  
    const handleDelete = async () => {
      const cardDoc = doc(db, "cards", id);
      await deleteDoc(cardDoc);
    };
  
    return (
        <div className="editable-card">
        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
        <input value={editImage} onChange={(e) => setEditImage(e.target.value)} />
        <input value={editLink} onChange={(e) => setEditLink(e.target.value)} />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    )
  }

