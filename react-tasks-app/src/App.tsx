import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Error404 } from './components/Error404';

const TaskListPlaceholder = () => <div><h2>Vista de Listado de Tareas (Próximo paso)</h2></div>;
const TaskDetailPlaceholder = () => <div><h2>Vista de Detalle de Tarea (Próximo paso)</h2></div>;
const TaskFormPlaceholder = () => <div><h2>Vista de Formulario (Próximo paso)</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Menu /> 
      
      <main style={{ padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<TaskListPlaceholder />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/tasks/:id" element={<TaskDetailPlaceholder />} />
          <Route path="/create" element={<TaskFormPlaceholder />} />
          <Route path="/edit/:id" element={<TaskFormPlaceholder />} />
          
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;