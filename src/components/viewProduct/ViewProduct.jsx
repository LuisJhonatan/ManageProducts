import { Link } from "react-router-dom"
import style from "./viewProduct.module.css"

const ViewProduct = ({product}) => {
  return (
    <div className={style.containerProduct}>
        <h3>{product.nombre}</h3>
        <img src={product.imagen} alt={product.nombre} />
        <div className={style.containerInfo}>
        <p>Precio: S/. {product.precioSoles}.00</p>
        <p>Precio: $ {product.precioDolares}.00 USD</p>
        <p>Stock: {product.stock}</p>
        <Link to={`/home/producto/${product.id}`}>Leer más...</Link>
        </div>
    </div>
  )
}

export default ViewProduct