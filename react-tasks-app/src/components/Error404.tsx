import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Error 404</h2>
      <p>La ruta solicitada no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};