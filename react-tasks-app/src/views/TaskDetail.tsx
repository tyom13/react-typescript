import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById } from '../services/taskService';
import type { Task } from '../model/Task';

export const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTaskById(Number(id))
        .then(data => setTask(data))
        .catch(() => {
          alert('Error al obtener los detalles de la tarea');
          navigate('/');
        });
    }
  }, [id, navigate]);

  if (!task) return <p>Cargando detalle...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1.5rem', borderRadius: '8px', maxWidth: '500px' }}>
      <h2>Detalle de la Tarea</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Título:</strong> {task.title}</p>
      <p><strong>Descripción:</strong> {task.description}</p>
      <p><strong>Estado:</strong> {task.status}</p>
      
      <div style={{ marginTop: '1.5rem' }}>
        {/* Pregunta 3: Botones de Editar y Volver */}
        <button onClick={() => navigate(`/edit/${task.id}`)} style={{ marginRight: '10px', backgroundColor: '#ffc107' }}>
          Editar
        </button>
        <button onClick={() => navigate('/')} style={{ backgroundColor: '#6c757d', color: 'white' }}>
          Volver
        </button>
      </div>
    </div>
  );
};