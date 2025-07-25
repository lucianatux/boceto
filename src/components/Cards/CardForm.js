import { useState, useEffect } from "react";

export const CardForm = ({ addOrEditCard, currentId, currentCard }) => {
  const [values, setValues] = useState({ 
    url: "", 
    name: "", 
    description: "", 
    image: "", 
    category: ""      
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentId === "") {
      setValues({ url: "", name: "", description: "", image: "", category: "" });
      setError("");
    } else {
      setValues({ ...currentCard });
      setError("");
    }
  }, [currentId, currentCard]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.url || !values.name || !values.category) {
      setError("Por favor completá los campos obligatorios.");
      return;
    }

    await addOrEditCard(values);
    setValues({ url: "", name: "", description: "", image: "", category: "" });
    setError("");
  };

  return (
    <div className="container">
    <div className="card-form m-1 p-1">
      <h3>Ingrese el nuevo contenido:</h3>
      <form
        onSubmit={handleSubmit}
        className="card card-body bg-secondary text-light"
      >
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
          <option value="">Seleccioná una categoría</option>
          <option value="inicio">Inicio</option>
          <option value="videos">Videos</option>
          <option value="libros">Libros</option>
          <option value="comunidad">Preguntas</option>
        </select>

        {error && <small className="text-warning">{error}</small>}

        <button className="btn btn-primary btn-block">
          {currentId ? "Actualizar" : "Enviar"}
        </button>
      </form>
    </div>
    </div>
  );
};
