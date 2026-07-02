import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, deleteTask } from '../services/taskService';
import type { Task } from '../model/Task';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number | undefined, title: string) => {
    if (!id) return;
    
    // Pregunta 5: Advertencia antes de proceder
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar la tarea "${title}"?`);
    
    if (confirmDelete) {
      try {
        await deleteTask(id);
        // Pregunta 5: Actualizar la UI sin recargar la página
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        alert('Error al intentar eliminar la tarea');
      }
    }
  };

  if (loading) return <p>Cargando tareas...</p>;

  return (
    <div>
      <h2>Listado de Tareas</h2>
      
      {/* Pregunta 1: Mostrar mensaje si no hay tareas */}
      {tasks.length === 0 ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>No hay tareas disponibles.</p>
      ) : (
        <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th>Título</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <span style={{ 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: task.status === 'done' ? '#d4edda' : '#fff3cd',
                    color: task.status === 'done' ? '#155724' : '#856404'
                  }}>
                    {task.status}
                  </span>
                </td>
                <td>
                  {/* Pregunta 1: Botones requeridos */}
                  <button onClick={() => navigate(`/tasks/${task.id}`)} style={{ marginRight: '5px' }}>Ver detalle</button>
                  <button onClick={() => navigate(`/edit/${task.id}`)} style={{ marginRight: '5px', backgroundColor: '#ffc107' }}>Editar</button>
                  <button onClick={() => handleDelete(task.id, task.title)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};