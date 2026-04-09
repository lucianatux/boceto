import { useState, useContext, useRef, useCallback } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { db } from "../../Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { CardForm } from "./CardForm";
import { CardList } from "./CardList";
import { SearchContext } from "../SearchContext";
import { Toast } from "../UI/Toast";
import { useIsMobile } from "../../hooks/useIsMobile";

export const CategoryPage = ({ category }) => {
  const { currentUser } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);

  const [currentCardData, setCurrentCardData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  // Estado solo para videos (por defecto: Los Vedas)
  const [selectedVideoSubcategory, setSelectedVideoSubcategory] = useState(
    "videos ¿de qué hablan los vedas?",
  );

  // Ref SOLO para mobile
  const videosRef = useRef(null);
  const isMobile = useIsMobile();

  const addOrEditCard = async (cardObject) => {
    setIsSaving(true);
    try {
      if (currentCardData === null) {
        const newDocRef = doc(collection(db, "cards"));
        await setDoc(newDocRef, cardObject);
        showToast("Tarjeta creada correctamente", "success");
      } else {
        const cardDocRef = doc(db, "cards", currentCardData.id);
        await setDoc(cardDocRef, cardObject, { merge: true });
        showToast("Tarjeta actualizada correctamente", "success");
      }
      setCurrentCardData(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving card:", error);
      showToast("Error al guardar la tarjeta", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // showForm: controla si se muestra el modal (tanto para crear como editar)
  const [showForm, setShowForm] = useState(false);

  const handleCancelEdit = () => {
    setCurrentCardData(null);
    setShowForm(false);
  };

  // Cuando se selecciona una card para editar, abrir el modal
  const handleEditCard = (card) => {
    setCurrentCardData(card);
    setShowForm(true);
  };

  // Botón flotante: abrir modal vacío para crear
  const handleFabClick = () => {
    setCurrentCardData(null);
    setShowForm(true);
  };

  const videoPath = [
    {
      id: "videos ¿de qué hablan los vedas?",
      title: "Conoce Los Vedas",
      description:
        "10 videos con explicaciones simples del conocimiento del mundo y la conciencia.",
    },
    {
      id: "videos los upanishad",
      title: "Conoce los Upanishads",
      description:
        "10 videos con las ideas esenciales descubiertas en los antiguos Vedas.",
    },
    {
      id: "videos pensar vedanta",
      title: "Pensar Vedanta",
      description:
        "Cómo aplicaron este conocimiento la devoción, la filosofía y la ciencia.",
    },
    {
      id: "videos pensar advaita vedanta",
      title: "Pensar Advaita Vedanta",
      description:
        "Cómo se aplica hoy para liberarse de las ataduras del mundo moderno.",
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
      {/* Toast de feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}

      {/* Modal único para crear o editar (aparece centrado) */}
      {currentUser && showForm && (
        <CardForm
          addOrEditCard={addOrEditCard}
          currentId={currentCardData ? currentCardData.id : ""}
          currentCard={currentCardData}
          onCancel={handleCancelEdit}
          isLoading={isSaving}
        />
      )}

      {/* Botón flotante para crear nueva tarjeta */}
      {currentUser && !showForm && (
        <button
          className="fab-add-card"
          onClick={handleFabClick}
          aria-label="Crear nueva tarjeta"
          title="Crear nueva tarjeta"
        >
          <i className="material-icons">add</i>
        </button>
      )}

      {searchTerm.trim() !== "" ? (
        <CardList
          setCurrentCard={handleEditCard}
          isSearchResults={true}
          searchTerm={searchTerm}
          onToast={showToast}
        />
      ) : category === "videos" ? (
        <>
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
                    <p className="step-p">
                      <span className="steptitle">{step.title}</span>{" "}
                    </p>
                    <p>
                      <span className="stepdescription">
                        {step.description}
                      </span>{" "}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {!isMobile && (
              <div className="video-preview">
                <CardList
                  category={category}
                  subcategory={selectedVideoSubcategory}
                  setCurrentCard={handleEditCard}
                  onlyFirst
                  onToast={showToast}
                />
              </div>
            )}
          </div>

          {isMobile ? (
            <div ref={videosRef}>
              <CardList
                category={category}
                subcategory={selectedVideoSubcategory}
                setCurrentCard={handleEditCard}
                onToast={showToast}
              />
            </div>
          ) : (
            <CardList
              category={category}
              subcategory={selectedVideoSubcategory}
              setCurrentCard={handleEditCard}
              skipFirst
              onToast={showToast}
            />
          )}
        </>
      ) : (
        subcategories.map((sub) => (
          <div key={sub} className="subsection">
            {!(category === "inicio") && (
              <h6>
                {category === "libros" && sub === "propios"
                  ? "CUENTOS- NOVELAS - ENSAYOS- MEMORIAS en formato IMPRESO o DIGITAL"
                  : category === "shorts" && sub === "shorts"
                    ? "LOS VIDEOS CORTOS MÁS VISTOS"
                    : category === "comunidad" &&
                        sub === "Preguntas y Respuestas"
                      ? "PREGUNTAS con la RESPUESTA en un click"
                      : sub.toUpperCase()}
              </h6>
            )}

            <CardList
              category={category}
              subcategory={sub}
              setCurrentCard={handleEditCard}
              onToast={showToast}
            />
          </div>
        ))
      )}
    </div>
  );
};