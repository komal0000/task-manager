import React from 'react';
import SingleTask from './SingleTask';

const Tasks = ({ status, tasks, onEditClick }) => {
    return (
        <div className={status} style={{width:"300px"}}>
            <div className="title" style={{fontWeight:"600"}}>
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

export default Tasks;
