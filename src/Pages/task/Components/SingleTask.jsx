import React, { useState, useEffect } from "react";
import { getCollectionName, statuses, yes } from "../../../Constants";

import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../../../firebase";

const SingleTask = ({ task, onEditClick }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrls, setImageUrls] = useState(task.imageUrls);
  const [newImages, setNewImages] = useState([]);
  console.log(imageUrls);

  const handleDeleteImage = (url) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

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

  const handleImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const deleteTask = async (taskId) => {
    if(yes()){
        try {
          const taskDocRef = doc(db, getCollectionName(), taskId);
          await deleteDoc(taskDocRef);
        } catch (e) {
          console.error(e);
        }
    }
  };

  return (
    <div className="item">
      <div className="p-2 d-flex justify-content-between align-items-center">
        <span>{task.organization}</span>
        <div>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => onEditClick(task)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteTask(task.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <hr className="my-1" />
      <div className="d-flex justify-content-between p-2">
        <span className="span">{task.title}</span>
      </div>
      <div className="row m-0">
        {task.imageUrls &&
          task.imageUrls.length > 0 &&
          task.imageUrls.map((imageUrl, index) => (
            <div className="col-md-2 col-4 p-1" key={index}>
              <img
                src={imageUrl}
                alt={`task_image_${index}`}
                height={"auto"}
                width={"100%"}
                onClick={() => handleImage(imageUrl)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Full image"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SingleTask;
