'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { tasksAtom, isLoadingAtom, errorAtom } from '@/store/atom';
import Task from "@/components/Tasks";
import Tasks from '@/components/Tasks';

export default function TaskManager() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch {
        setError('Could not load tasks. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setIsLoading, setError]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      
      const newTask = await res.json();
      setTasks([newTask, ...tasks]); 
      setNewTaskTitle(''); 
    } catch{
      setError('Could not add task.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Task Manager</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={addTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            Add
          </button>
        </form>

        {isLoading ? (
          <div className="text-center text-gray-500 py-4">Loading tasks...</div>
        ) : (
          <ul className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
            ) : (
              tasks.map((task) => (
                <Tasks key={task.id} task={task} />
              ))
            )}
          </ul>
        )}
      </div>
    </main>
  );
}