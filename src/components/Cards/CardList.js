import { useState, useEffect, useContext } from "react";
import { db } from "../../Firebase";
import { AuthContext } from "../Auth/AuthContext";
import { SearchContext } from "../SearchContext";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { ConfirmModal } from "../UI/ConfirmModal";
import youtubeIcon from "../../assets/youtubeicon.png";

/*
  Lista de tarjetas que obtiene datos en tiempo real desde Firestore,
  filtra por categoría, subcategoría o búsqueda y permite editar o eliminar
  contenido según el estado de autenticación.
*/
export const CardList = ({
  category,
  subcategory,
  setCurrentCard,
  cardsToShow,
  onlyFirst = false,
  skipFirst = false,
  onToast,
}) => {
  const [cards, setCards] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (cardsToShow) return;

    const cardsCollectionRef = collection(db, "cards");
    const unsubscribe = onSnapshot(
      cardsCollectionRef,
      (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((docSnap) => {
          docs.push({ ...docSnap.data(), id: docSnap.id });
        });
        setCards(docs);
      },
      (error) => {
        console.error("Error fetching cards: ", error);
      },
    );

    return () => unsubscribe();
  }, [cardsToShow]);

  const maxChars = 280;

  const displayedCards =
    cardsToShow ??
    cards
      .filter((card) => {
        if (searchTerm.trim() !== "") {
          return (
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (card.description &&
              card.description.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        }
        return card.category === category && card.subcategory === subcategory;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const finalCards = displayedCards.filter((_, index) => {
    if (onlyFirst) return index === 0;
    if (skipFirst) return index !== 0;
    return true;
  });

  const onDeleteCard = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "cards", deleteTarget));
      onToast?.("Tarjeta eliminada correctamente", "success");
    } catch (error) {
      console.error("Error deleting card: ", error);
      onToast?.("Error al eliminar la tarjeta", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <div className="cards-container">
        {finalCards.map((card) => {
          const isExpanded = expandedCardId === card.id;
          const shouldTruncate =
            card.description && card.description.length > maxChars;

          const displayedDescription =
            isExpanded || !shouldTruncate
              ? card.description
              : card.description.slice(0, maxChars) + "...";

          const imageSrc =
            card.category === "shorts"
              ? `${process.env.PUBLIC_URL}/shorts/${card.order}.jpg`
              : card.image;

          return (
            <div
              className={`custom-card ${card.category} ${card.subcategory}`}
              key={card.id}
            >
              {currentUser && (
                <div className="card-actions">
                  <button
                    className="card-action-btn"
                    onClick={() => setCurrentCard(card)}
                    aria-label={`Editar tarjeta: ${card.name}`}
                    title="Editar"
                  >
                    <i className="material-icons">edit</i>
                  </button>
                  <button
                    className="card-action-btn"
                    onClick={() => setDeleteTarget(card.id)}
                    aria-label={`Eliminar tarjeta: ${card.name}`}
                    title="Eliminar"
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              )}

              {imageSrc &&
                (card.category === "inicio" && !card.url ? (
                  <img
                    src={imageSrc}
                    alt={card.name}
                    className="card-image"
                    loading="lazy"
                  />
                ) : (
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-image-link"
                  >
                    <img
                      src={imageSrc}
                      alt={card.name}
                      className="card-image"
                      loading="lazy"
                    />
                  </a>
                ))}

              <h4 className="card-title p-1">{card.name}</h4>
              <p className="card-description p-1">{displayedDescription}</p>

              {shouldTruncate && (
                <div className="read-more-container">
                  <button
                    onClick={() =>
                      setExpandedCardId(isExpanded ? null : card.id)
                    }
                    className="read-more-btn"
                  >
                    {isExpanded ? "leer menos" : "leer más"}
                  </button>
                </div>
              )}

              {!(card.category === "inicio") && (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-link"
                >
                  {card.category === "libros" ? (
                    <span className="ver-mas-text">Ir al sitio</span>
                  ) : (
                    <img
                      src={youtubeIcon}
                      className="youtlink"
                      loading="lazy"
                      alt="YouTube"
                    />
                  )}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de confirmación para eliminar */}
      {deleteTarget && (
        <ConfirmModal
          message="¿Estás seguro de que deseas eliminar esta tarjeta?"
          onConfirm={onDeleteCard}
          onCancel={() => setDeleteTarget(null)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};
