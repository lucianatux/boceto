import { useState, useContext, useRef } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { db } from "../../Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { CardForm } from "./CardForm";
import { CardList } from "./CardList";
import { SearchContext } from "../SearchContext";

/*
  Página de categoría que muestra tarjetas por subcategoría,
  permite buscar contenido y habilita la creación o edición de cards
  según autenticación.
*/
export const CategoryPage = ({ category }) => {
  const { currentUser } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);

  const [currentCardData, setCurrentCardData] = useState(null);

  // 🔹 Estado solo para videos
  const [selectedVideoSubcategory, setSelectedVideoSubcategory] =
    useState(null);

  // 🔹 Ref para hacer scroll a los videos
  const videosRef = useRef(null);

  const addOrEditCard = async (cardObject) => {
    try {
      if (currentCardData === null) {
        const newDocRef = doc(collection(db, "cards"));
        await setDoc(newDocRef, cardObject);
        console.log("New card added");
      } else {
        const cardDocRef = doc(db, "cards", currentCardData.id);
        await setDoc(cardDocRef, cardObject, { merge: true });
        console.log("Card updated");
      }
      setCurrentCardData(null);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  // 🔹 Camino sugerido SOLO para videos
  const videoPath = [
    {
      id: "videos ¿de qué hablan los vedas?",
      title: "Los Vedas",
      description:
        "Escuchar el conocimiento explicado simplemente",
    },
    {
      id: "videos los upanishad",
      title: "Upanishads",
      description:
        "Profundizar en el conocimiento y sentir dudas",
    },
    {
      id: "videos pensar vedanta",
      title: "Vedanta",
      description: "El conocimiento para remover las dudas",
    },
    {
      id: "videos pensar advaita vedanta",
      title: "Advaita Vedanta",
      description:
        "Cómo la conciencia impregna toda experiencia",
    },
  ];

  const subcategories =
    category === "videos"
      ? [
          "videos ¿de qué hablan los vedas?",
          "videos los upanishad",
          "videos pensar vedanta",
          "videos pensar advaita vedanta",
          "shorts",
        ]
      : category === "libros"
      ? ["propios", "recomendados"]
      : category === "comunidad"
      ? ["Preguntas y Respuestas"]
      : category === "inicio"
      ? ["novedades", "destacados"]
      : [""];

  const handleVideoStepClick = (id) => {
    setSelectedVideoSubcategory(id);

    // pequeño delay para asegurar que el contenido exista
    setTimeout(() => {
      videosRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

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
        // 🔍 RESULTADOS DE BÚSQUEDA
        <CardList
          setCurrentCard={setCurrentCardData}
          isSearchResults={true}
          searchTerm={searchTerm}
        />
      ) : category === "videos" ? (
        // 🎥 COMPORTAMIENTO ESPECIAL PARA VIDEOS
        <>
          <div className="videos-intro">
            <h2>Recorrido sugerido</h2>
            <p>
              Este es el orden recomendado para ver los videos.
              Cada sección profundiza un poco más en el conocimiento.
            </p>
          </div>

          <div className="video-path">
            {videoPath.map((step, index) => (
              <button
                key={step.id}
                className={`video-step ${
                  selectedVideoSubcategory === step.id ? "active" : ""
                }`}
                onClick={() => handleVideoStepClick(step.id)}
              >
                <span className="step-index">{index + 1}</span>

                <div className="step-content">
                  <p><span className="steptitle">{step.title}</span>: <span className="stepdescription">{step.description}</span></p>
                </div>
              </button>
            ))}
          </div>

          {selectedVideoSubcategory && (
            <div ref={videosRef}>
              <CardList
                category={category}
                subcategory={selectedVideoSubcategory}
                setCurrentCard={setCurrentCardData}
              />
            </div>
          )}
        </>
      ) : (
        // 🔒 COMPORTAMIENTO ORIGINAL PARA EL RESTO
        subcategories.map((sub) => (
          <div key={sub} className="subsection">
            <h6>{sub.toUpperCase()}</h6>
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
