import React from "react";
import SingleTask from "./SingleTask";

const Section = ({ status, tasks, onEditClick }) => {
  return (
    <div className="section-container">
      <div className="title">{status}</div>
      <div className="data">
        {tasks
          .map((task) => (
            <SingleTask key={task.id} task={task} onEditClick={onEditClick} />
          ))}
      </div>
    </div>
  );
};

export default Section;
