import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";
import "./task.css";
import { statuses } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Section from "../../Components/Section";

const Task = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
  });
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (taskId) => {
    try {
      const taskDocRef = doc(db, "tasks", taskId);
      await updateDoc(taskDocRef, { status: newStatus });
      setSelectedTask(null);
    } catch (e) {
      console.error(e);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
      setShowPopup(false);
      setFormData({ title: "", organization: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setNewStatus(task.status);
  };

  return (
    <div className="task-container mt-2">
        <div className="task-header ">
          <h5>Task Manager</h5>
          <button className="btn btn-primary btn-sm" onClick={togglePopup}>
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
        </div>
      
      <div className="task-categories ">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            onEditClick={handleEditClick}
          />
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={togglePopup}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Add New Task</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleInputChange}
                  className="form-control"
                  value={formData.title}
                  required
                />
              </div>
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
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={() => setSelectedTask(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Change Status for {selectedTask.title}</h3>
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
            <div className="form-actions mt-3">
              <button
                onClick={() => handleStatusChange(selectedTask.id)}
                className="btn btn-primary"
              >
                Change Status
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
