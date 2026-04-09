import { useState, useEffect } from "react";

/*
  Formulario reutilizable para crear o editar tarjetas de contenido.
  Cuando se edita una tarjeta, aparece como un modal centrado en pantalla.
  Cuando se crea una nueva, aparece inline como antes.
*/
export const CardForm = ({ addOrEditCard, currentCard, onCancel, isLoading }) => {
  const [values, setValues] = useState({
    order: "",
    url: "",
    name: "",
    description: "",
    image: "",
    category: "",
    subcategory: "",
  });
  const [error, setError] = useState("");

  const subcategoriesByCategory = {
    inicio: ["pc", "celular"],
    videos: [
      "videos ¿de qué hablan los vedas?",
      "videos los upanishad",
      "videos pensar vedanta",
      "videos pensar advaita vedanta",
    ],
    libros: ["propios"],
    shorts: ["shorts"],
    comunidad: ["Preguntas y Respuestas"],
  };

  const currentSubcategories = subcategoriesByCategory[values.category] || [];

  useEffect(() => {
    if (currentCard) {
      setValues({ ...currentCard });
    } else {
      setValues({
        order: "",
        url: "",
        name: "",
        description: "",
        image: "",
        category: "",
        subcategory: "",
      });
    }
    setError("");
  }, [currentCard]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "order") {
      setValues({ ...values, order: Number(value) });
    } else if (name === "category") {
      setValues({ ...values, category: value, subcategory: "" });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.order === "" || !values.category || !values.subcategory) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }

    await addOrEditCard(values);

    setValues({
      order: "",
      url: "",
      name: "",
      description: "",
      image: "",
      category: "",
      subcategory: "",
    });
    setError("");
  };

  const isEditing = !!currentCard;

  const formContent = (
    <div className="card-form-modal-body">
      <div>
        <div className="card-form-header">
          <h3>{isEditing ? "Editar contenido" : "Nuevo contenido"}</h3>
          <button
            type="button"
            className="card-form-close-btn"
            onClick={onCancel}
            aria-label="Cerrar formulario"
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="card card-body bg-secondary text-light"
        >
          <label htmlFor="order">Orden:</label>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="1, 2, 3..."
            name="order"
            value={values.order}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="url">URL</label>
          <div className="input-group mb-3">
            <div className="input-group-text bg-light">
              <i className="material-icons">insert_link</i>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="https://someurl.xyz"
              name="url"
              value={values.url}
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="name">Título:</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Descripción:</label>
          <textarea
            rows="3"
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="image">URL de la imagen:</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="https://..."
            name="image"
            value={values.image}
            onChange={handleInputChange}
          />

          <label htmlFor="category">Categoría:</label>
          <select
            className="form-control mb-3"
            name="category"
            value={values.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="inicio">Inicio</option>
            <option value="videos">Videos</option>
            <option value="libros">Libros</option>
            <option value="shorts">Shorts</option>
            <option value="comunidad">Preguntas</option>
          </select>

          <label htmlFor="subcategory">Subcategoría:</label>
          <select
            className="form-control mb-3"
            name="subcategory"
            value={values.subcategory}
            onChange={handleInputChange}
            required
            disabled={!values.category}
          >
            <option value="">Selecciona una subcategoría</option>
            {currentSubcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          {error && <small className="text-warning">{error}</small>}

          <div className="card-form-buttons">
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-inline">
                  <i className="material-icons spinner-icon">autorenew</i>
                  Guardando...
                </span>
              ) : isEditing ? (
                "Actualizar"
              ) : (
                "Enviar"
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-light btn-block mx-2"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Siempre renderizar como modal overlay
  return (
    <div className="card-form-overlay" onClick={onCancel}>
      <div
        className="card-form-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {formContent}
      </div>
    </div>
  );
};