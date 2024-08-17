import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getCollectionName, statuses } from "../../../Constants";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const EditTask = ({ selectedTask, closeEdit, db }) => {
  const [newStatus, setNewStatus] = useState(selectedTask.status);
  const [newTitle,setTitle] = useState(selectedTask.title);
  const [newEnv,setEnv] = useState(selectedTask.env);
  const [ newOrganization,setOrganization] = useState(selectedTask.organization);
  
  const handleStatusChange = async (taskId) => {
    try {
      const taskDocRef = doc(db,  getCollectionName(), taskId);
      await updateDoc(taskDocRef, { status: newStatus , title: newTitle ,env:newEnv, organization:newOrganization, updated_at : serverTimestamp() ,});
      closeEdit();
    } catch (e) {
      console.error(e);
    }
  };
  const deleteTask = async(taskId) =>{
    try{
      const taskDocRef = doc(db, getCollectionName(),taskId);
      await deleteDoc(taskDocRef);
      closeEdit();
    }catch (e){
      console.error(e);
    }
  }
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
            <input type="text" name="task" id="task" onChange={(e)=>setOrganization(e.target.value)} className="form-control" value={newOrganization}/>
          </div>
          <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea type="text" name="task" id="task" onChange={(e)=>setTitle(e.target.value)} className="form-control" value={newTitle}/>
          </div>
          <div className="form-group">
              <label htmlFor="env">Env</label>
              <input type="text" name="env" id="env" onChange={(e)=>setEnv(e.target.value)} value={newEnv} className="form-control" />
            </div>
          <div className="form-actions bg-white">
            <button onClick={()=>deleteTask(selectedTask.id)} className="text-danger">
              Delete
            </button>
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
