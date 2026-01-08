import { Link } from '../Link'

export default function Page404() {
    return (
        <>
            <div>
                <h1>404 - Página No Encontrada</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZiZHJjNmNwaWM4c3pvdHk1bmFtdGZwMHdzcHYxaGhlaW9vc25lcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kspVl6FzbdblOMKRmM/giphy.gif'/>
            </div>
            <div>
                <Link to="/">Volver al Inicio</Link>
            </div>
        </>
    )
}