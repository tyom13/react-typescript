import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f4f4f4', marginBottom: '1rem' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>Inicio / Listado</Link>
        </li>
        <li>
          <Link to="/create" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>Crear Tarea</Link>
        </li>
      </ul>
    </nav>
  );
};