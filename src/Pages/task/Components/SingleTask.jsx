import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const SingleTask = ({ task, onEditClick }) => {
    return (
        <div className='item'>
            <div className='p-2 item-title'>{task.organization} <FontAwesomeIcon
                icon={faEdit}
                onClick={() => onEditClick(task)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
            /></div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between p-2">

                <span>
                    {task.title}
                </span>

            </div>
        </div>
    );
};

export default SingleTask;
