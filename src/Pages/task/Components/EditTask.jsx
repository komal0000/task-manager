import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  getCollectionName,
  statuses,
  uploadImageToCloudinary,
} from "../../../Constants";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const EditTask = ({ selectedTask, closeEdit, db }) => {
  const [newStatus, setNewStatus] = useState(selectedTask.status);
  const [newTitle, setTitle] = useState(selectedTask.title);
  const [newEnv, setEnv] = useState(selectedTask.env);
  const [newOrganization, setOrganization] = useState(
    selectedTask.organization,
  );
  const [imageUrls, setImageUrls] = useState(selectedTask.imageUrls);
  const [newImages, setNewImages] = useState([]);
  console.log(imageUrls);

  const handleDeleteImage = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };
  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 6) {
      setNewImages([...newImages, ...selectedFiles]);
    } else {
      alert("Cannot add more than 6 images in total");
    }
  };
  const handleStatusChange = async (taskId) => {
    try {
      let updatedImageUrls = [...imageUrls];
      if (newImages.length > 0) {
        const uploadedUrls = await uploadImageToCloudinary(newImages);
        updatedImageUrls = [...updatedImageUrls, ...uploadedUrls];
      }

      const taskDocRef = doc(db, getCollectionName(), taskId);
      await updateDoc(taskDocRef, {
        status: newStatus,
        title: newTitle,
        imageUrls: updatedImageUrls,
        env: newEnv,
        organization: newOrganization,
        updated_at: serverTimestamp(),
      });
      closeEdit();
    } catch (e) {
      console.error("Error updating task:", e);
    }
  };
  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(db, getCollectionName(), taskId);
      await deleteDoc(taskDocRef);
      closeEdit();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="popup">
      <div className="popup-back" onClick={closeEdit}></div>
      <div className="popup-inner">
        <div className="popup-header bg-white text-dark sticky-top px-3 pt-3 d-flex align-items-center justify-content-between">
          <h6 className="m-0">Change Status</h6>
          <button className="close-btn" onClick={closeEdit}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <hr />
        <div className="p-3">
          <div className="form-group">
            <label htmlFor="">Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="form-control"
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Organization</label>
            <input
              type="text"
              name="task"
              id="task"
              onChange={(e) => setOrganization(e.target.value)}
              className="form-control"
              value={newOrganization}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              name="task"
              id="task"
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              value={newTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="env">Env</label>
            <textarea
              type="text"
              name="env"
              id="env"
              onChange={(e) => setEnv(e.target.value)}
              value={newEnv}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images</label>
            <input
              type="file"
              name="images"
              id="images"
              className="form-control"
              multiple
              onChange={handleImage}
              accept=".png,.jpg,.jpeg,.webp"
            />
          </div>
          <div className="form-group">
            <div className="row m-0">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="col-md-3 col-2 p-1"
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "self-start",
                  }}
                >
                  <img src={url} height={"250px"} width={"300px"} />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteImage(url)}
                    style={{ fontSize: "32px", marginLeft: "1rem" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="form-actions bg-white">
            <button
              onClick={() => deleteTask(selectedTask.id)}
              className="btn btn-danger "
            >
              Delete
            </button>
            <button
              onClick={() => handleStatusChange(selectedTask.id)}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
