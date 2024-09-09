import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../firebase";
import "./task.css";
import { getCollectionName, statuses } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import Section from "./Components/Section";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
import SideBar from "./Components/SideBar";

const Task = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const tasksQuery = query(
      collection(db, getCollectionName()),
      orderBy("created_at", "desc"),
    );
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  const toogleAdd = () => {
    setShowPopup(!showPopup);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };
  const handleClickOutside = (event) => {
    if (
      sidebar &&
      !event.target.closest(".sidebar-inner") &&
      !event.target.closest(".sidebar-toggle")
    ) {
      closeSidebar();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="task-container mt-2">
      <div className="task-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {sidebar && <SideBar closeSidebar={closeSidebar} />}
        <h5 style={{ marginLeft: "40px" }}>Task Manager</h5>
        <button className="btn btn-primary btn-sm" onClick={toogleAdd}>
          <FontAwesomeIcon icon={faPlus} /> Add Task
        </button>
      </div>

      <div className="task-categories">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onEditClick={handleEditClick}
          />
        ))}
      </div>

      {showPopup && <AddTask closeAdd={toogleAdd} db={db} />}
      {selectedTask && (
        <EditTask
          selectedTask={selectedTask}
          db={db}
          closeEdit={() => {
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Task;
