import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { CardForm } from "./CardForm";
import { CardList } from "./CardList";

export const CategoryPage = ({ category }) => {
  const { currentUser } = useContext(AuthContext);

  const subcategories = category === "videos"
    ? ["propios", "recomendados"]
    : category === "libros"
    ? ["propios", "recomendados"]
      : category === "inicio"
    ? ["novedades", "destacados"]
    : category === "comunidad"
    ? ["vedanta", "advaita vedanta", "upanishads", "vedas", "otros"]
    : [""]; // por defecto para otras

  return (
    <div className="category-page">
      <h2 className="text-center m-3">{category.toUpperCase()}</h2>

      {currentUser && (
        <CardForm
          addOrEditCard={() => {}}
          currentId={""}
          currentCard={{ url: "", name: "", description: "", image: "", category, subcategory: "" }}
        />
      )}

      {subcategories.map((sub) => (
        <div key={sub} className="subsection">
          <h4>{sub.toUpperCase()}</h4>
          <CardList
            category={category}
            subcategory={sub}
          />
        </div>
      ))}
    </div>
  );
};
