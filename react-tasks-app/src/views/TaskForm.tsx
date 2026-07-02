import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, getTaskById, updateTask } from '../services/taskService';
import type { Task } from '../model/Task';

export const TaskForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Pregunta 4: Técnica de formularios con control
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'done'>('pending');

  useEffect(() => {
    if (isEditMode && id) {
      getTaskById(Number(id))
        .then(task => {
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
        })
        .catch(() => alert('Error al cargar la tarea para edición'));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pregunta 4: Validación de datos nulos o vacíos
    if (!title.trim() || !description.trim()) {
      alert('Todos los campos son obligatorios. No se permiten valores vacíos.');
      return;
    }

    const taskData: Task = {
      title: title.trim(),
      description: description.trim(),
      status
    };

    try {
      if (isEditMode && id) {
        // Pregunta 4: Caso PUT
        await updateTask(Number(id), taskData);
      } else {
        // Pregunta 4: Caso POST
        await createTask(taskData);
      }
      // Redirigir a la ruta principal tras guardar con éxito
      navigate('/');
    } catch (error) {
      alert('Ocurrió un error al guardar la tarea.');
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>{isEditMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Título:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '100%', padding: '6px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ width: '100%', padding: '6px', minHeight: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Estado:</label>
          {/* Pregunta 4: Etiqueta select con valores pending y done */}
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value as 'pending' | 'done')}
            style={{ width: '100%', padding: '6px' }}
          >
            <option value="pending">pending</option>
            <option value="done">done</option>
          </select>
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', marginRight: '10px' }}>
            {isEditMode ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ backgroundColor: '#6c757d', color: 'white' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};