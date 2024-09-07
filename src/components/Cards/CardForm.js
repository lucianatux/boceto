import { useState } from "react";

export const CardForm = () => {
  const initialState = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialState);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }
  
  /*({ target: { name, value } }) =>
    setWebsite({ ...website, [name]: value });*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    /*if (!validURL(website.url))
      return toast("invalid url", { type: "warning", autoClose: 1000 });

    if (!params.id) {
      await saveWebsite(website);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateWebsite(params.id, website);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setWebsite(initialState);
    navigate("/");
    */
  };

  return (
    <div className="card-form">
      <div>
        <h1>Card Form</h1>
        <form onSubmit={handleSubmit} className="card card-body bg-secondary">
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
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="name">Website Name:</label>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Website Name"
              className="form-control mb-3"
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="description">Write a Description:</label>
          <textarea
            rows="3"
            className="form-control mb-3"
            placeholder="Write a Description"
            name="description"
            onChange={handleInputChange}
          ></textarea>

          <button className="btn btn-primary btn-block">button</button>
        </form>
      </div>
    </div>
  );
};
