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
import Section from "./Components/Section";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";

const Task = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

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

  

  const toogleAdd = () => {
    setShowPopup(!showPopup);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="task-container mt-2">
      <div className="task-header ">
        <h5>Task Manager</h5>
        <button className="btn btn-primary btn-sm" onClick={toogleAdd}>
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
    
      {showPopup && <AddTask closeAdd={toogleAdd} db={db} />}

      {selectedTask && <EditTask selectedTask={selectedTask} db={db} closeEdit={()=>{setSelectedTask(null)}}/>}
    </div>
  );
};

export default Task;
