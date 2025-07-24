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
  const { currentUser } = useContext(AuthContext);
  const [expandedCardId, setExpandedCardId] = useState(null); // 👈 nuevo estado

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

  const maxChars = 100; // 👈 cantidad máxima de caracteres

  return (
    <div className="card-list m-1 p-1">
      {currentUser && (
        <CardForm
          addOrEditCard={addOrEditCard}
          currentId={currentId}
          currentCard={currentCard || { url: "", name: "", description: "" }}
        />
      )}

      <div className="col-md-12">
        {cards.map((card) => {
          const isExpanded = expandedCardId === card.id;
          const shouldTruncate =
            card.description && card.description.length > maxChars;

          const displayedDescription =
            isExpanded || !shouldTruncate
              ? card.description
              : card.description.slice(0, maxChars) + "...";

          return (
            <div className="custom-card" key={card.id}>
              {currentUser && (
                <div className="card-actions">
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(card.id)}
                    title="Editar"
                  >
                    edit
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => onDeleteCard(card.id)}
                    title="Eliminar"
                  >
                    delete
                  </i>
                </div>
              )}
              {card.image && (
                <img src={card.image} alt={card.name} className="card-image" />
              )}
              <h4 className="card-title">{card.name}</h4>
              <p className="card-description">{displayedDescription}</p>

              {shouldTruncate && (
                <div className="read-more-container">
                  <button
                    onClick={() =>
                      setExpandedCardId(isExpanded ? null : card.id)
                    }
                    className="read-more-btn"
                  >
                    {isExpanded ? "Ver menos" : "Ver más"}
                  </button>
                </div>
              )}

              <a
                href={card.url}
                target="_blank"
                rel="noreferrer"
                className="card-link"
              >
                Go to website
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
