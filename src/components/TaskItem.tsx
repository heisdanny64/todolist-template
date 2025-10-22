import { useState } from 'react';
import { Check, Trash2, Edit2, X } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div className="glass glass-hover rounded-xl p-4 animate-slide-in">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="h-5 w-5"
        />
        
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <Input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit();
                if (e.key === 'Escape') handleCancel();
              }}
              className="glass border-0"
              autoFocus
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleEdit}
              className="shrink-0"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <p
              className={`flex-1 text-lg transition-all ${
                task.completed
                  ? 'line-through opacity-50'
                  : ''
              }`}
            >
              {task.text}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="shrink-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
