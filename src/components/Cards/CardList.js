import { useState, useEffect, useContext } from "react";
import { CardForm } from "./CardForm";
import { db } from "../../Firebase";
import { AuthContext } from "../Auth/AuthContext";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export const CardList = () => {
  const [cards, setCards] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const { currentUser } = useContext(AuthContext); // 👈 importás el contexto

  useEffect(() => {
    const cardsCollectionRef = collection(db, "cards");
    const unsubscribe = onSnapshot(
      cardsCollectionRef,
      (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setCards(docs);
      },
      (error) => {
        console.error("Error fetching cards: ", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const addOrEditCard = async (cardObject) => {
    try {
      if (currentId === "") {
        const newDocRef = doc(collection(db, "cards"));
        await setDoc(newDocRef, cardObject);
        console.log("New card added");
      } else {
        const cardDocRef = doc(db, "cards", currentId);
        await setDoc(cardDocRef, cardObject, { merge: true });
        console.log("Card updated");
      }
      setCurrentId("");
    } catch (error) {
      console.error("Error saving card: ", error);
    }
  };

  const onDeleteCard = async (id) => {
    if (window.confirm("¿Estás seguro de que querés borrar esta card?")) {
      try {
        await deleteDoc(doc(db, "cards", id));
        console.log("Card deleted");
      } catch (error) {
        console.error("Error deleting card: ", error);
      }
    }
  };

  const currentCard = currentId
    ? cards.find((card) => card.id === currentId)
    : null;

  return (
    <div className="card-list m-5 p-5">
      {currentUser && ( // ✅ solo se muestra si está logueado
        <CardForm
          addOrEditCard={addOrEditCard}
          currentId={currentId}
          currentCard={currentCard || { url: "", name: "", description: "" }}
        />
      )}

      <div className="col-md-8">
        {cards.map((card) => (
          <div className="card mb-1" key={card.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{card.name}</h4>
                {currentUser && ( // ✅ solo los ve en modo edición
                  <div>
                    <i
                      className="material-icons me-2 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setCurrentId(card.id)}
                      title="Editar"
                    >
                      edit
                    </i>
                    <i
                      className="material-icons text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => onDeleteCard(card.id)}
                      title="Eliminar"
                    >
                      delete
                    </i>
                  </div>
                )}
              </div>
              {/* Imagen */}
              {card.image && (
                <img
                  src={card.image}
                  alt={card.name}
                  className="img-fluid mb-2"
                />
              )}
              <p>{card.description}</p>
              <a href={card.url} target="_blank" rel="noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
