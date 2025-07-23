import { useState, useEffect } from "react";

export const CardForm = ({ addOrEditCard, currentId, currentCard }) => {
  const [values, setValues] = useState({ url: "", name: "", description: "" });
  const [error, setError] = useState(""); // Si querés, para mensajes de validación

  useEffect(() => {
    if (currentId === "") {
      setValues({ url: "", name: "", description: "" });
      setError("");
    } else {
      setValues({ ...currentCard });
      setError("");
    }
  }, [currentId, currentCard]); // ✅ Ahora el warning desaparece

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación rápida
    if (!values.url || !values.name) {
      setError("Por favor completá los campos obligatorios.");
      return;
    }

    await addOrEditCard(values);
    setValues({ url: "", name: "", description: "" });
    setError("");
  };

  return (
    <div className="card-form m-5 p-5">
      <div>
        <h1>Card Form</h1>
        <form
          onSubmit={handleSubmit}
          className="card card-body bg-secondary text-light"
        >
          <label htmlFor="url">Paste your URL</label>
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

          <label htmlFor="name">Website Name:</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Website Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Write a Description:</label>
          <textarea
            rows="3"
            className="form-control mb-3"
            placeholder="Write a Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>

          {error && <small className="text-warning">{error}</small>}

          <button className="btn btn-primary btn-block">
            {currentId ? "Actualizar" : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};
