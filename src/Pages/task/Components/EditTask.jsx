import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { statuses } from "../../../Constants";
import { doc, updateDoc } from "firebase/firestore";

const EditTask = ({ selectedTask, closeEdit, db }) => {
  const [newStatus, setNewStatus] = useState(selectedTask.status);
  const handleStatusChange = async (taskId) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);
      await updateDoc(taskDocRef, { status: newStatus });
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
            <div className="form-control">{selectedTask.organization}</div>
          </div>
          <div className="form-group">
            <label htmlFor="">Description</label>
            <div className="form-control">{selectedTask.title}</div>
          </div>

          <div className="form-actions bg-white">
            <button
              onClick={() => handleStatusChange(selectedTask.id)}
              className="text-primary"
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
