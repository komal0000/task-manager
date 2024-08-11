import React from 'react';
import SingleTask from './SingleTask';

const Section = ({ status, tasks, onEditClick }) => {
    return (
        <div className={status} >
            <div className="title">
                {status}
            </div>
            <div className="data">
                {tasks.filter(task => task.status === status).map(task =>
                    <SingleTask key={task.id} task={task} onEditClick={onEditClick} />
                )}
            </div>
        </div>
    );
};

export default Section;
