import { useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { db } from "../../Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { CardForm } from "./CardForm";
import { CardList } from "./CardList";
import { SearchContext } from "../SearchContext";

export const CategoryPage = ({ category }) => {
  const { currentUser } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);

  const [currentCardData, setCurrentCardData] = useState(null);

  const addOrEditCard = async (cardObject) => {
    try {
      if (currentCardData === null) {
        // Nueva card
        const newDocRef = doc(collection(db, "cards"));
        await setDoc(newDocRef, cardObject);
        console.log("New card added");
      } else {
        // Editar card existente
        const cardDocRef = doc(db, "cards", currentCardData.id);
        await setDoc(cardDocRef, cardObject, { merge: true });
        console.log("Card updated");
      }
      setCurrentCardData(null); // Limpiar form después
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const subcategories =
    category === "videos"
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
      {/*<h2 className="text-center m-3">{category.toUpperCase()}</h2>*/}

      {currentUser && (
        <CardForm
          addOrEditCard={addOrEditCard}
          currentId={currentCardData ? currentCardData.id : ""}
          currentCard={currentCardData}
        />
      )}

      {searchTerm.trim() !== "" ? (
        // Si hay búsqueda, mostramos un único CardList sin filtrar por subcategoría
        <CardList
          setCurrentCard={setCurrentCardData}
          isSearchResults={true}
          searchTerm={searchTerm}
        />
      ) : (
        // Si no hay búsqueda, mostramos las subsecciones normalmente
        subcategories.map((sub) => (
          <div key={sub} className="subsection">
            <h4>{sub.toUpperCase()}</h4>
            <CardList
              category={category}
              subcategory={sub}
              setCurrentCard={setCurrentCardData}
            />
          </div>
        ))
      )}
    </div>
  );
};
