import { useState, useEffect } from "react";

export const CardForm = ({ addOrEditCard, currentId, currentCard }) => {
  const [values, setValues] = useState({ url: "", name: "", description: "", image: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentId === "") {
      setValues({ url: "", name: "", description: "", image: "" });
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

    if (!values.url || !values.name) {
      setError("Por favor completá los campos obligatorios.");
      return;
    }

    await addOrEditCard(values);
    setValues({ url: "", name: "", description: "", image: "" });
    setError("");
  };

  return (
    <div className="card-form m-5 p-5">
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

        <label htmlFor="image">Image URL (e.g., from Drive or Imgur):</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="https://..."
          name="image"
          value={values.image}
          onChange={handleInputChange}
        />

        {error && <small className="text-warning">{error}</small>}

        <button className="btn btn-primary btn-block">
          {currentId ? "Actualizar" : "Enviar"}
        </button>
      </form>
    </div>
  );
};
