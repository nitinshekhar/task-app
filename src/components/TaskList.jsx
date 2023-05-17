import TaskItem from '@/components/TaskItem';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthenticatedTaskStore, useUnAuthenticatedTaskStore } from '@/store';
const TaskList = () => {
  const { isAuthenticated, user } = useAuth0();
  const authenticatedTasks = useAuthenticatedTaskStore();
  const unauthenticatedTasks = useUnAuthenticatedTaskStore();
  const userId = isAuthenticated ? user.name : null;
  const tasks = isAuthenticated 
    ? authenticatedTasks.tasks.filter(task => task.userId === userId)
    : unauthenticatedTasks.tasks;
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} itemProp={task} />
      ))}
    </ul>
  );
};
export default TaskList;
