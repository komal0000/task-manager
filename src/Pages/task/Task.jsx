import React, { useEffect, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import db from "../../firebase";
import './task.css'
import { statuses } from '../../Constants';
import ListTask from '../../Components/ListTask';


const Task = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        organization: null
    });
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
                status: 'Pending'
            });
            setShowPopup(false);
        } catch (e) {
            console.log(e);
        }
    }

    
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
            <ListTask/>
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
        
        </div>
    )
}

export default Task
