import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="glass border-0 focus-visible:ring-2 focus-visible:ring-primary text-lg"
        aria-label="New task input"
      />
      <Button 
        type="submit" 
        size="icon"
        className="glass-hover shrink-0 rounded-xl"
        aria-label="Add task"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
}
