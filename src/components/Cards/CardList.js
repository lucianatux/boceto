import { CardForm } from "./CardForm";
import { db } from '../../Firebase';
import { collection, doc, setDoc } from "firebase/firestore"; // Importar las funciones necesarias

export const CardList = () => {
  
  // Función para agregar o editar una tarjeta
  const addOrEditCard = async (cardObject) => {
    try {
      const cardsCollectionRef = collection(db, 'cards'); // Acceder a la colección 'cards'
      const newDocRef = doc(cardsCollectionRef); // Crear una referencia a un nuevo documento
      await setDoc(newDocRef, cardObject); // Guardar el documento en la colección
      console.log("New card added");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div className="card-list">
      <CardForm addOrEditCard={addOrEditCard} />
      <div>
        <h1>Card List</h1>
      </div>
    </div>
  )
}
