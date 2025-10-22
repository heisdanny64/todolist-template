import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types/task';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { MotivationalQuote } from './MotivationalQuote';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

export function TodoList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [previousCompletedCount, setPreviousCompletedCount] = useState(0);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const allComplete = totalTasks > 0 && completedTasks === totalTasks;
  const showMotivation = totalTasks > 0 && !allComplete;

  useEffect(() => {
    if (completedTasks > previousCompletedCount) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#8b5cf6'],
      });
    }
    setPreviousCompletedCount(completedTasks);
  }, [completedTasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              My Tasks
            </h1>
            {totalTasks > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-lg">
                  {completedTasks} of {totalTasks} completed
                </span>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>

        {/* Task Input */}
        <TaskInput onAddTask={addTask} />

        {/* Motivational Quote */}
        <MotivationalQuote show={showMotivation} />

        {/* Tasks List */}
        {tasks.length > 0 && (
          <div className="space-y-3 group">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </div>
        )}

        {/* Clear All Button */}
        {tasks.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="destructive"
              onClick={clearAllTasks}
              className="glass-hover gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All Tasks
            </Button>
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center animate-fade-in">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-semibold mb-2">No tasks yet</h2>
            <p className="text-muted-foreground">
              Add your first task to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
