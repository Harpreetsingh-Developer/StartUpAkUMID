import React, { useState } from 'react';
import './DashboardTodoList.scss';

const DashboardTodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Meeting with Team', completed: false },
    { id: 2, text: 'Dinner', completed: false },
    { id: 3, text: 'Have to go for Checkup', completed: false },
    { id: 4, text: 'Pickup kids from school', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const newTaskObject = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="todo-list-card">
      <div className="todo-list-header">
        <h3 className="todo-list-title">TODO LIST</h3>
        <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
      </div>
      <div className="tasks-container">
        <ul className="tasks-list">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content" onClick={() => toggleTaskCompletion(task.id)}>
                <span className="task-bullet"></span>
                <span className="task-text">{task.text}</span>
              </div>
              <button className="delete-task-btn" onClick={() => handleDeleteTask(task.id)}>-</button>
            </li>
          ))}
        </ul>
      </div>
      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="add-task-input"
          placeholder="Enter Tasks"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-task-btn">ADD</button>
      </form>
    </div>
  );
};

export default DashboardTodoList;
