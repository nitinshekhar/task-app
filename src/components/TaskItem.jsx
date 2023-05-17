import { useState, useRef } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthenticatedTaskStore, useUnAuthenticatedTaskStore } from '@/store';
import styles from '@/styles/TaskItem.module.css';

import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';

const TaskItem = ({ itemProp }) => {
  const { isAuthenticated, user } = useAuth0();
  const [editing, setEditing] = useState(false);

  const authenticatedTasks = useAuthenticatedTaskStore();
  const unauthenticatedTasks = useUnAuthenticatedTaskStore();
  const userId = isAuthenticated ? user.name : null;

  const handleChange = isAuthenticated ? authenticatedTasks.handleChange : unauthenticatedTasks.handleChange;
  const delTask = isAuthenticated ? authenticatedTasks.delTask  : unauthenticatedTasks.delTask;
  const setUpdate = isAuthenticated ? authenticatedTasks.setUpdate : unauthenticatedTasks.setUpdate;

  const editInputRef = useRef(null);

  const completedStyle =  {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const handleEditing = () => {
    setEditing(true);
  };

  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      const updatedTitle = editInputRef.current.value;
      const updatedDueDate = itemProp.dueDate;
      setUpdate(updatedTitle,updatedDueDate,itemProp.id,userId);
      setEditing(false);
    }
  };
  
  return (
    <li className={styles.item}>
      <div className={styles.content} style={viewMode}>
        <input
          type="checkbox" id="list"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        <button onClick={handleEditing}>
          <AiFillEdit
            style={{ color: '#5e5e5e', fontSize: '16px' }}
          />
        </button>
        <button onClick={() => delTask(itemProp.id)}>
          <FaTrash style={{ color: '#5e5e5e', fontSize: '16px' }} />
        </button>
        <span style={itemProp.completed ? completedStyle : null}>
          <div>{itemProp.title} </div>
          <div><b>Due:</b> {itemProp.dueDate}</div>     
        </span>
      </div>
      <input
        type="text" id="edit"
        ref={editInputRef}
        defaultValue={itemProp.title}
        className={styles.textInput}
        style={editMode}
        onKeyDown={handleUpdatedDone}
      />
      {editing && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <label htmlFor={`dueDate-${itemProp.id}`}>Due date: </label>
          <input
            id={`dueDate-${itemProp.id}`}
            type="date"
            defaultValue={itemProp.dueDate}
            onChange={(event) => {
              setUpdate(editInputRef.current.value,event.target.value,itemProp.id);
            }}
          />
        </div>
      )}

    </li>
  );
};
export default TaskItem;
