import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthenticatedTaskStore, useUnAuthenticatedTaskStore } from '@/store';
import { FaPlusCircle } from 'react-icons/fa';

const InputTask = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { isAuthenticated, user } = useAuth0();
  const authenticatedTasks = useAuthenticatedTaskStore();
  const unauthenticatedTasks = useUnAuthenticatedTaskStore();
  const addTask = isAuthenticated ? authenticatedTasks.addTask : unauthenticatedTasks.addTask;

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const userId = isAuthenticated ? user.name : null; // Retrieve the user ID from the user object
      addTask({title, dueDate, userId});
      setTitle('');
      setDueDate('');
      setMessage('');
    } else {
      setMessage('Please add item.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          id="task"
          type="text"
          placeholder="Add Reminder..."
          value={title}
          onChange={handleChange}
          className="input-text"
        />
        <input
          id="duedate"
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="input-due-date"
        />
        <button className="input-submit">
          <FaPlusCircle
            style={{
              color: '#5e5e5e',
              fontSize: '20px',
              marginTop: '2px',
            }}
          />
        </button>
      </form>
      <span className="submit-warning">{message}</span>
    </>
  );
};
export default InputTask;
