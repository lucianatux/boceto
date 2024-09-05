export const CardForm = () => {
    return (
      <div className="card-form">
        <div>
          <h1>Card Form</h1>
          <form  className="card card-body bg-secondary">
        <label htmlFor="url">Paste your URL</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="https://someurl.xyz"
            value=""
            name="url"
          />
        </div>

        <label htmlFor="name">Website Name:</label>
        <div className="input-group">
          <div className="input-group-text bg-dark">
          </div>
          <input
            type="text"
            value=""
            name="name"
            placeholder="Website Name"
            className="form-control mb-3"
          />
        </div>

        <label htmlFor="description">Write a Description:</label>
        <textarea
          rows="3"
          className="form-control mb-3"
          placeholder="Write a Description"
          name="description"
          value=""
        ></textarea>

        <button
          className="btn btn-primary btn-block"
        >button
        </button>
      </form>
        </div>
      </div>
    )
  }