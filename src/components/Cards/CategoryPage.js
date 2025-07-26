import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { CardForm } from "./CardForm";
import { CardList } from "./CardList";
import { db } from "../../Firebase";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

export const CategoryPage = ({ category }) => {
  const { currentUser } = useContext(AuthContext);

  // 👇 Lógica recuperada
  const [cards, setCards] = useState([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "cards"),
      (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) =>
          docs.push({ ...doc.data(), id: doc.id })
        );
        setCards(docs);
      },
      (error) => console.error("Error fetching cards:", error)
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
      console.error("Error saving card:", error);
    }
  };

  const currentCard = currentId
    ? cards.find((card) => card.id === currentId)
    : null;

  const subcategories = category === "videos"
    ? ["propios", "recomendados"]
    : category === "libros"
    ? ["propios", "recomendados"]
    : category === "comunidad"
    ? ["vedanta", "advaita vedanta", "upanishads", "vedas", "otros"]
    : category === "inicio"
    ? ["novedades", "destacados"]
    : [""];

  return (
    <div className="category-page">
      <h2 className="text-center m-3">{category.toUpperCase()}</h2>

      {currentUser && (
        <CardForm
          addOrEditCard={addOrEditCard}
          currentId={currentId}
          currentCard={currentCard || { url: "", name: "", description: "", image: "", category, subcategory: "" }}
        />
      )}

      {subcategories.map((sub) => (
        <div key={sub} className="subsection">
          <h4>{sub.toUpperCase()}</h4>
          <CardList
            category={category}
            subcategory={sub}
            setCurrentId={setCurrentId} // 👈 pasamos esto para que al editar sepa qué card
          />
        </div>
      ))}
    </div>
  );
};
