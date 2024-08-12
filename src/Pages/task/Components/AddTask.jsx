import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const AddTask = ({ db, close }) => {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: formData.title,
        organization: formData.organization,
        status: "Pending",
      });
      close(false);
      setFormData({ title: "", organization: "" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header bg-white text-dark sticky-top px-3 pt-3 d-flex align-items-center justify-content-between">
          <h6 className="m-0">Add New Task</h6>
          <button className="close-btn" onClick={close}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <hr />
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                name="organization"
                id="organization"
                onChange={handleInputChange}
                className="form-control"
                value={formData.organization}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Task</label>
              <textarea
                type="text"
                name="title"
                id="title"
                onChange={handleInputChange}
                className="form-control"
                value={formData.title}
                required
              />
            </div>
            <div className="form-actions sticky-bottom bg-white">
              <button type="submit" className="bg-white text-primary">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
