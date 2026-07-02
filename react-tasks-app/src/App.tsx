// react-tasks-app/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Error404 } from './components/Error404';
import { TaskList } from './views/TaskList';
import { TaskDetail } from './views/TaskDetail';
import { TaskForm } from './views/TaskForm';

function App() {
  return (
    <BrowserRouter>
      <Menu /> 
      
      <main style={{ padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;