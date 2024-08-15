export const statuses = ["Pending", "Seen", "Working","Ontest", "Tested", "Finished", "Updated", "Backlog"];
export const getCollectionName=()=>{
    console.log('mode', process.env.NODE_ENV);
    return process.env.NODE_ENV === 'development' ? 'task_test' : 'tasks';
};