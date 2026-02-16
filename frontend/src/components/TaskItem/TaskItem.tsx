import { useState } from 'react';
import { Task, TaskPriority } from '../../types/task';
import { taskApi } from '../../services/api';
import './TaskItem.css';
import { useTranslation } from '../../hooks/useTranslation';
import { formatDate } from '../../utils/dateFormatter';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState<TaskPriority>(task.priority);

  const handleToggleComplete = async () => {
    try {
      await taskApi.updateTask(task.id, {
        completed: !task.completed,
        priority,
      });
      onUpdate();
    } catch (error) {
      console.error(t('errors.failedToUpdateTask'), error);
    }
  };

  const handleSave = async () => {
    try {
      await taskApi.updateTask(task.id, {
        title,
        description: description || undefined,
        priority,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error(t('errors.failedToUpdateTask'), error);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm(t('tasks.deleteConfirm'))) {
      try {
        await taskApi.deleteTask(task.id);
        onDelete();
      } catch (error) {
        console.error(t('errors.failedToDeleteTask'), error);
      }
    }
  };

  const hasDescription = (task: Task): boolean => {
    return task.description != null || task.createdAt != null || task.updatedAt != null;
  }

  const fullDescription = (task: Task): React.ReactNode => {
    return (
      <span className="task-full-description">
        {task.description && <span>{task.description} | </span> } 
        {task.createdAt && <span> {t('tasks.createdAt', { date: formatDate(task.createdAt) })} | </span>} 
        {task.updatedAt && <span> {t('tasks.updatedAt', { date: formatDate(task.updatedAt) })}</span>}
      </span>
    );
  }

  const getPriorityClass = () => {
    const currentPriority = isEditing ? priority : task.priority;
    return `priority-${currentPriority}`;
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''} ${getPriorityClass()}`}>
      <div className="task-content">
        {!isEditing && (
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={handleToggleComplete}
            className="task-checkbox"
          />
        )}
        <div className="task-text">
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="task-edit-input"
                placeholder={t('forms.taskTitle')}
                autoFocus
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="task-edit-textarea"
                placeholder={t('forms.taskDescription')}
                rows={3}
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="task-edit-select"
              >
                <option value={TaskPriority.HIGH}>{t('forms.priorityHigh')}</option>
                <option value={TaskPriority.MEDIUM}>{t('forms.priorityMedium')}</option>
                <option value={TaskPriority.LOW}>{t('forms.priorityLow')}</option>
              </select>
            </>
          ) : (
            <>
              <h3 className="task-title">{task.title}</h3>
              <div className="task-details">
                {hasDescription(task) && fullDescription(task)}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="task-actions">
        {isEditing ? (
          <div className="task-edit-actions">
            <button onClick={handleSave} className="btn btn-save">
              {t('buttons.save')}
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              {t('buttons.cancel')}
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              {t('buttons.edit')}
            </button>
            <button onClick={handleDelete} className="btn btn-delete">
              {t('buttons.delete')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

