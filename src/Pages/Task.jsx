import React, { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import db from "../firebase";
import './task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Task = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        organization: null
    });
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
        });
        return () => unsubscribe();
    }, []);

    const handleStatusChange = async (taskId) => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await updateDoc(taskDocRef, { status: newStatus });
            setSelectedTask(null);
        } catch (e) {
            console.error(e);
        }
    }
    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "tasks"), {
                title: formData.title,
                organization: formData.organization,
                status: 'pending'
            });
            setShowPopup(false);
        } catch (e) {
            console.log(e);
        }
    }
    const renderStatusCell = (task, status, label) => (
        <td>
            {task.status === status ? task.title : ""}
            {task.status === status && (
                <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                        setSelectedTask(task);
                        setNewStatus(task.status);
                    }}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
            )}
        </td>
    );

    return (
        <div className='container'>
            <div className="head">
                <div className="text">
                    Something
                </div>
                <button className='btn btn-sm btn-primary' onClick={togglePopup}>
                    Add task
                </button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th id='pending'> Pending</th>
                        <th id='seen'>Seen</th>
                        <th id='working'>Working</th>
                        <th id='ontest'> Ontest</th>
                        <th id='finished'>Finished</th>
                        <th id='updated'>updated</th>
                        <th id='backlog'>Backlog</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            {renderStatusCell(task, "pending", "Pending")}
                            {renderStatusCell(task, "seen", "Seen")}
                            {renderStatusCell(task, "working", "Working")}
                            {renderStatusCell(task, "ontest", "On Test")}
                            {renderStatusCell(task, "finished", "Finished")}
                            {renderStatusCell(task, "updated", "Updated")}
                            {renderStatusCell(task, "backlog", "Backlog")}
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <h5>
                                        Add new task
                                    </h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label htmlFor="title">
                                        Title
                                    </label>
                                    <input type="text" name="title" id="title" onChange={handleInputChange} className='form-control' />
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label htmlFor="organization">
                                        Organization
                                    </label>
                                    <input type="text" name="organization" id="organization" onChange={handleInputChange} className='form-control' />
                                </div>
                                <div className="col-md-12">
                                    <button type='submit' className='btn btn-sm btn-primary' style={{ marginRight: '10px' }}>
                                        Submit
                                    </button>
                                    <button type="button" className="btn btn-sm btn-secondary" onClick={togglePopup}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {selectedTask && (
                <div className="popup">
                    <div className="popup-inner">
                        <h3>Change Status for {selectedTask.title}</h3>
                        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className='form-control'>
                            <option value="pending">Pending</option>
                            <option value="seen">Seen</option>
                            <option value="working">Working</option>
                            <option value="ontest">On Test</option>
                            <option value="finished">Finished</option>
                            <option value="updated">Updated</option>
                            <option value="backlog">Backlog</option>
                        </select>
                        <div className="botton mt-2">
                        <button onClick={() => handleStatusChange(selectedTask.id)} className='btn btn-sm btn-primary' style={{marginRight:"10px"}}>Change Status</button>
                        <button onClick={() => setSelectedTask(null)} className='btn btn-sm btn-secondary'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Task
