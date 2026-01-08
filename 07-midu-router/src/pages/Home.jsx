import { Link } from '../Link.jsx'

export default function Homepage() {
  return (
    <>
      <h1>Inicio</h1>
      <p>Esto es una página de ejemplo para crear una React Router desde cero</p>
      <Link to="/about">Ir a Sobre Nosotros</Link>
    </>
  )
}