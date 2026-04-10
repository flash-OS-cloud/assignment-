import { useAtom, useSetAtom } from 'jotai';
import { tasksAtom, errorAtom, Task } from '@/store/atom';

interface TaskItemProps {
  task: Task;
}

export default function Tasks({ task }: TaskItemProps) {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const setError = useSetAtom(errorAtom);

  const toggleTask = async () => {
    const currentStatus = task.done;
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !currentStatus } : t));

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      if (!res.ok) throw new Error('Failed to update task');
    } catch  {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: currentStatus } : t));
      setError('Could not update task.');
    }
  };

  const deleteTask = async () => {
    const previousTasks = [...tasks];
    setTasks(tasks.filter(t => t.id !== task.id));

    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
    } catch {
      setTasks(previousTasks);
      setError('Could not delete task.');
    }
  };

  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-center gap-3 overflow-hidden">
        <input
          type="checkbox"
          checked={task.done}
          onChange={toggleTask}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
        />
        <span className={`text-gray-800 truncate ${task.done ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={deleteTask}
        className="ml-2 text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-md hover:bg-red-50 transition-colors"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
}