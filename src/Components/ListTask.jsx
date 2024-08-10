import React, { useEffect, useState } from 'react'
import { statuses } from '../Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import db from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
const ListTask = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const handleStatusChange = async (taskId) => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await updateDoc(taskDocRef, { status: newStatus });
            setSelectedTask(null);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
            console.log(tasks);

        });
        return () => unsubscribe();
    }, []);
    return (
        <div className="container">
            <div className="category">
                {
                    statuses.map((status, index) => <div key={index} className={status}>
                        <div className="title">
                            {status}
                        </div>
                        <div className="data">
                            {
                                tasks.filter((task) => task.status === status).map((task) =>
                                    <div key={task.id} className="item">
                                        {task.title}

                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setNewStatus(task.status);
                                            }}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                                        />
                                    </div>

                                )
                            }
                        </div>

                    </div>
                    )
                }
            </div>
            {selectedTask && (
                <div className="popup">
                    <div className="popup-inner">
                        <h3>Change Status for {selectedTask.title}</h3>
                        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className='form-control'>
                            {
                                statuses.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))
                            }

                        </select>
                        <div className="botton mt-2">
                            <button onClick={() => handleStatusChange(selectedTask.id)} className='btn btn-sm btn-primary' style={{ marginRight: "10px" }}>Change Status</button>
                            <button onClick={() => setSelectedTask(null)} className='btn btn-sm btn-secondary'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>



    )
}

export default ListTask
