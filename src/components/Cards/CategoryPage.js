import { useState, useContext, useRef } from "react";
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

  //  Estado solo para videos (por defecto: Los Vedas)
  const [selectedVideoSubcategory, setSelectedVideoSubcategory] = useState(
    "videos ¿de qué hablan los vedas?",
  );

  //  Ref SOLO para mobile
  const videosRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const addOrEditCard = async (cardObject) => {
    try {
      if (currentCardData === null) {
        const newDocRef = doc(collection(db, "cards"));
        await setDoc(newDocRef, cardObject);
      } else {
        const cardDocRef = doc(db, "cards", currentCardData.id);
        await setDoc(cardDocRef, cardObject, { merge: true });
      }
      setCurrentCardData(null);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const videoPath = [
    {
      id: "videos ¿de qué hablan los vedas?",
      title: "Conocé Los Vedas",
    },
    {
      id: "videos los upanishad",
      title: "Conocé los Upanishads",
    },
    {
      id: "videos pensar vedanta",
      title: "Pensar Vedanta",
    },
    {
      id: "videos pensar advaita vedanta",
      title: "Pensar Advaita Vedanta",
    },
  ];

  const subcategories =
    category === "videos"
      ? [
          "videos ¿de qué hablan los vedas?",
          "videos los upanishad",
          "videos pensar vedanta",
          "videos pensar advaita vedanta",
        ]
      : category === "libros"
        ? ["propios"]
        : category === "shorts"
          ? ["shorts"]
          : category === "comunidad"
            ? ["Preguntas y Respuestas"]
            : category === "inicio"
              ? [isMobile ? "celular" : "pc"]
              : [""];

  const handleVideoStepClick = (id) => {
    setSelectedVideoSubcategory(id);

    //  SOLO en mobile hay scroll
    if (isMobile) {
      setTimeout(() => {
        videosRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className="category-page">
      {currentUser && (
        <CardForm
          addOrEditCard={addOrEditCard}
          currentId={currentCardData ? currentCardData.id : ""}
          currentCard={currentCardData}
        />
      )}

      {searchTerm.trim() !== "" ? (
        <CardList
          setCurrentCard={setCurrentCardData}
          isSearchResults={true}
          searchTerm={searchTerm}
        />
      ) : category === "videos" ? (
        <>
          {/*  BOTONES + PREVIEW (DESKTOP) */}
          <div className="video-desktop-layout">
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
                    <p>
                      <span className="steptitle">{step.title}</span>{" "}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/*  PREVIEW SOLO DESKTOP */}
            {!isMobile && (
              <div className="video-preview">
                <CardList
                  category={category}
                  subcategory={selectedVideoSubcategory}
                  setCurrentCard={setCurrentCardData}
                  onlyFirst
                />
              </div>
            )}
          </div>

          {/*  LISTADO */}
          {isMobile ? (
            //  MOBILE → lista completa
            <div ref={videosRef}>
              <CardList
                category={category}
                subcategory={selectedVideoSubcategory}
                setCurrentCard={setCurrentCardData}
              />
            </div>
          ) : (
            //  DESKTOP → cards 2,3,4...
            <CardList
              category={category}
              subcategory={selectedVideoSubcategory}
              setCurrentCard={setCurrentCardData}
              skipFirst
            />
          )}
        </>
      ) : (
        subcategories.map((sub) => (
          <div key={sub} className="subsection">
            {!(category === "inicio") && (
              <h6>
                {category === "libros" && sub === "propios"
                  ? "CUENTOS- NOVELAS - ENSAYOS- MEMORIAS"
                  : sub.toUpperCase()}
              </h6>
            )}

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
