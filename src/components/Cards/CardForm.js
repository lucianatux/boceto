import { useState, useEffect } from "react";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const CardForm = ({ addOrEditCard, currentCard }) => {
  const [values, setValues] = useState({ 
    url: "", 
    name: "", 
    description: "", 
    image: "",        // sigue igual
    image2: "",       // nuevo campo
    category: "", 
    subcategory: ""
  });
  const [error, setError] = useState("");

  const subcategoriesByCategory = {
    inicio: ["destacados", "novedades"],
    videos: ["propios", "recomendados"],
    libros: ["propios", "recomendados"],
    comunidad: ["vedanta", "advaita vedanta", "upanishads", "vedas", "otros"]
  };

  const currentSubcategories = subcategoriesByCategory[values.category] || [];

  useEffect(() => {
    if (currentCard) {
      setValues({ 
        url: currentCard.url || "", 
        name: currentCard.name || "", 
        description: currentCard.description || "", 
        image: currentCard.image || "", 
        image2: currentCard.image2 || "",  // recupera también si ya existía
        category: currentCard.category || "", 
        subcategory: currentCard.subcategory || "" 
      });
    } else {
      setValues({ 
        url: "", 
        name: "", 
        description: "", 
        image: "", 
        image2: "", 
        category: "", 
        subcategory: "" 
      });
    }
    setError("");
  }, [currentCard]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setValues({ ...values, category: value, subcategory: "" });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const storageRef = ref(storage, `cards/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setValues(prev => ({ ...prev, image2: url }));
      setError("");
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Error al subir la imagen.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.url || !values.name || !values.category || !values.subcategory) {
      setError("Por favor completá los campos obligatorios.");
      return;
    }

    await addOrEditCard(values);
    setValues({ 
      url: "", 
      name: "", 
      description: "", 
      image: "", 
      image2: "", 
      category: "", 
      subcategory: "" 
    });
    setError("");
  };

  return (
    <div className="container">
      <div className="card-form m-1 p-1">
        <h3>{currentCard ? "Editar contenido" : "Ingrese el nuevo contenido:"}</h3>
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

          <label htmlFor="file">O subí una imagen desde tu PC:</label>
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={handleFileUpload}
          />
          {values.image2 && (
            <small className="text-success">Imagen subida correctamente</small>
          )}

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

          <label htmlFor="subcategory">Subcategoría:</label>
          <select
            className="form-control mb-3"
            name="subcategory"
            value={values.subcategory}
            onChange={handleInputChange}
            required
            disabled={!values.category}
          >
            <option value="">Seleccioná una subcategoría</option>
            {currentSubcategories.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          {error && <small className="text-warning">{error}</small>}

          <button className="btn btn-primary btn-block">
            {currentCard ? "Actualizar" : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

