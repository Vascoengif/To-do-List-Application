import { useState, useEffect } from 'react';
import { Task } from './types/task';
import { taskApi } from './services/api';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';
import './App.css';
import { TaskItem } from './components/TaskItem/TaskItem';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(t('errors.failedToLoadTasks'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTasksList = () => {
    fetchTasks();
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>{t('app.title')}</h1>
          <p className="subtitle">{t('app.subtitle')}</p>
        </header>

        <AddTaskForm onTaskAdded={updateTasksList} />

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchTasks} className="btn btn-retry">
              {t('buttons.retry')}
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="loading">{t('tasks.loading')}</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>{t('tasks.empty')}</p>
          </div>
        ) : (
          <div className="tasks-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTasksList}
                onDelete={updateTasksList}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
