import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const SingleTask = ({ task, onEditClick }) => {
    return (
        <div className="d-flex justify-content-between item">
            <span>
                {task.title}
            </span>
            <FontAwesomeIcon
                icon={faEdit}
                onClick={() => onEditClick(task)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
        </div>
    );
};

export default SingleTask;
