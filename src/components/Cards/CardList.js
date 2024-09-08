import { useState, useEffect } from "react";
import { CardForm } from "./CardForm";
import { db } from '../../Firebase';
import { collection, doc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore"; 

export const CardList = () => {

  const [cards, setCards] = useState([]);
  
  // Función para agregar o editar una tarjeta
  const addOrEditCard = async (cardObject) => {
    try {
      const cardsCollectionRef = collection(db, 'cards'); 
      const newDocRef = doc(cardsCollectionRef); 
      await setDoc(newDocRef, cardObject); 
      console.log("New card added");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  const onDeleteCard = async (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        const cardDocRef = doc(db, 'cards', id); 
        await deleteDoc(cardDocRef); 
        console.log("Card deleted");
      } catch (error) {
        console.error("Error deleting card: ", error);
      }
    }
  };

 // Función para obtener todas las tarjetas
  const getCards = () => {
    try {
      const cardsCollectionRef = collection(db, 'cards'); 
  
      onSnapshot(cardsCollectionRef, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id:doc.id});
        });
        setCards(docs);
      });
      
    } catch (error) {
      console.error("Error fetching cards in real-time: ", error);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

 

  return (
    <div className="card-list">
      <CardForm addOrEditCard={addOrEditCard} />
      <div className="col-md-8">
      {cards.map((card) =>(
        <div className="card mb-1" key={card.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
            <h4>{card.name}</h4>
            <i className="material-icons" onClick={()=> onDeleteCard(card.id)}>close</i>
            </div>
          <p>{card.description}</p>
          <a href={card.url} target="_blank" rel="noreferrer">Go to website</a>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
