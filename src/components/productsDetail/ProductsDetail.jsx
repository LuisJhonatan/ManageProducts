import {  useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from "./productsDetail.module.css"
import getDato from '../../helpers/getDato';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/slices/carContentSlice';

const ProductsDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [valid, setValid] = useState(true);
    const car = useSelector(state => state.car);
    const dispatch = useDispatch();

    useEffect(() => {
        if(car.product.length !== 0){
            localStorage.setItem('car', JSON.stringify(car.product));
        }
    }, [car.product])

    useEffect(()=>{
        getDato(id)
        .then((result)=>{
            setProduct(result);
        })
        .catch((error) => {
            alert("Ocurrio un error:", error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //console.log(car);
    const subtract = () => {
        if(quantity>0){
            setQuantity(quantity-1)
        }
    }
    const add = () => {
        if(quantity<product.stock){
            setQuantity(quantity+1)
        }
    }
    const handleClick = () => {
        if(quantity!==0){
            const quantityProduct = {
                idProducto: product.id,
                nombre: product.nombre,
                imagen: product.imagen,
                precioSoles: product.precioSoles,
                precioDolares: product.precioDolares,
                cantidad: quantity
            }
            dispatch(addProduct(quantityProduct))
            
        }else{
            setValid(false);
            setTimeout(() => {
                setValid(true);
            }, 2000);
        }
    }

  return (
    <main className={style.containerProduct} >
        {
                product
                &&
                <div className={style.product}>
                <h3>{product.nombre}</h3>
                <img src={product.imagen} alt={product.nombre} />
                <div className={style.containerInfo}>
                    <p>{product.descripcion}</p>
                    <p>Precio: S/. {product.precioSoles}.00</p>
                    <p>Precio: $ {product.precioDolares}.00 USD</p>
                    <p>Stock: {product.stock}</p>
                </div>
                <div className={style.quantityProduct}>
                    <button className={style.buttonProduct} onClick={subtract}>
                        -
                    </button>
                    { quantity }
                    <button className={style.buttonProduct} onClick={add}>
                        +
                    </button>
                </div>
                <button onClick={handleClick} className={style.agregar}>Agregar al carrito...</button>
                </div>
        }
        {
            !valid && <h3>Nose puede agregar la cantidad seleccionada</h3>
        }
    </main>
  )
}

export default ProductsDetail