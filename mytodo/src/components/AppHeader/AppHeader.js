import React from 'react';
import './AppHeader.css';

const AppHeader = ({ toDo, done }) => {
    return (
        <div className="AppHeader d-flex">
            <h1>ToDo List</h1>
            <h2>{toDo} more todo, {done} done</h2>
        </div>
    );
};

export default AppHeader;