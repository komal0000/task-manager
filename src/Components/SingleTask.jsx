import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const SingleTask = ({ task, onEditClick }) => {
    return (
        <div className="item">
            {task.title}
            <FontAwesomeIcon
                icon={faEdit}
                onClick={() => onEditClick(task)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
        </div>
    );
};

export default SingleTask;
