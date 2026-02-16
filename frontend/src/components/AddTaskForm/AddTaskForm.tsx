import { useState } from 'react';
import { taskApi } from '../../services/api';
import './AddTaskForm.css';
import { useTranslation } from '../../hooks/useTranslation';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

export function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await taskApi.createTask({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error(t('errors.failedToCreateTask'), error);
      alert(t('errors.failedToCreateTask'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('forms.taskTitleRequired')}
          className="form-input"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('forms.taskDescription')}
          className="form-textarea"
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        className="btn btn-add"
        disabled={isSubmitting || !title.trim()}
      >
        {isSubmitting ? t('buttons.adding') : t('buttons.addTask')}
      </button>
    </form>
  );
}

