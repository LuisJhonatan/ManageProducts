import React from 'react'
import { Link } from 'react-router-dom'
import style from "./menuUser.module.css"
import { useSelector } from 'react-redux'

const MenuUser = () => {
    const user = useSelector(state => state.user);
  return (
    <article className={style.menuUser}>
        <div className={style.users}>
            {
                user.employment==="Gerente"?
                <>
                    <p>Menú ventas</p>
                    <Link to="/home/ventas-generadas">Ventas generadas</Link>
                    <Link to="/home/ventas-anuladas">Ventas anuladas</Link>
                </>
                :""
            }
        </div>
        <div className={style.products}>
            <p>Menú productos</p>
            <Link to="/home/agregar-producto">Agregar Producto</Link>
            <Link to="/home/listar-productos">Listar Productos</Link>
            <Link to="/home/actualizar-producto">Actualizar Producto</Link>
            <Link to="/home/eliminar-producto">Eliminar Producto</Link>
        </div>
    </article>
  )
}

export default MenuUser