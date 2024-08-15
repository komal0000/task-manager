import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBar from './SideBar';
import { useAuth } from '../../../Context/AuthContext';
import { updatePassword } from 'firebase/auth';

const ResetPassword = () => {
    const [sidebar, setSidebar] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const { user } = useAuth();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await updatePassword(user, newPassword);
            setMessage('Password successfully updated.');
            setNewPassword("");
        } catch (error) {
            setError("Failed to update the password.");
        }
    };

    return (
        <div className="task-container">
            <div className="task-header ">
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                {sidebar && <SideBar />}
                <div className="heading d-flex">
                    <h5 style={{ marginLeft: '40px', marginRight: "5px" }}>Task Manager</h5>
                    /
                    <h5 style={{ marginLeft: '5px' }}>Reset Password</h5>
                </div>
            </div>
            <div className="mid-section">
                <form onSubmit={handleResetPassword}>
                    <div className="row mt-4" style={{ alignItems: 'center' }}>

                        <div className="col-md-4">
                            <label htmlFor="password">Reset your Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className='form-control'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-4 mt-2">
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
                {message && <p className="text-success mt-3">{message}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
