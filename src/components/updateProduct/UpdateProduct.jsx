import { useForm } from 'react-hook-form'
import style from "./updateDatos.module.css"
import { useState } from 'react';
import getDato from '../../helpers/getDato';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/dataBase';

const UpdateProduct = () => {
    const [disabledForm1, setDisableForm1] = useState(false);
    const [disabledForm2, setDisableForm2] = useState(true);
    const [id, setId] = useState("");
    const [query, setQuery] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [product, setProduct] = useState(null);
    const {register, handleSubmit, reset} = useForm();
    const consultar = (e) => {
        e.preventDefault();
        getDato(id)
        .then((result) => {
            if(result === null){
                setQuery(true);
                setTimeout(() => {
                    setQuery(false);
                }, 1500);
            }else{
                setProduct(result);
                setDisableForm2(false);
                setDisableForm1(true);
            }
        })
    }
    const enviar = async (data) => {
        const updateProduct = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen,
            precioSoles: Number(data.precioSoles),
            precioDolares: Number(data.precioDolares),
            stock: Number(data.stock)
        }

        setDoc(doc(db,"productos", product.id), updateProduct)
        .then(() => {
            setProduct(null);
            setAddProduct(true);
        })
        .catch( (error) => {
            console.log("Ocurrio un eror");
        })
        .finally(() => {
            setTimeout(() => {
                setAddProduct(false);
            }, 1500);
            setDisableForm1(false);
            setDisableForm2(true);
            setId("");
            reset();
        })
        
    }

  return (
    <main className={style.updateProduct}>
        <h3>Actualizar producto</h3>
        <form className={style.formulario} onSubmit={consultar}>
            <input type="text" placeholder="ID del producto..." value={id} onChange={(e) => setId(e.target.value)} disabled={disabledForm1} required={true} />
            {!disabledForm1 && <input type="submit" value="Buscar producto"/>}
        </form>
        {product && (
            <div className={style.containerProduct}>
                <h3>{product.nombre}</h3>
                <img src={product.imagen} alt={product.nombre} />
                <div className={style.containerInfo}>
                <p>Precio: S/. {product.precioSoles}.00</p>
                <p>Precio: $ {product.precioDolares}.00 USD</p>
                <p>Stock: {product.stock}</p>
            </div>
        </div>
        )}
        {
            query && <h3>Producto no encontrado</h3>
        }
        <form className={style.formulario} onSubmit={handleSubmit(enviar)}>
            <input type="text" placeholder="Nombre del producto..." {...register("nombre")} disabled={disabledForm2} required={true} />
            <input type="text" placeholder="Descripción del producto..." {...register("descripcion")} disabled={disabledForm2} required={true} />
            <input type="text" placeholder="URL de la imagen..." {...register("imagen")} disabled={disabledForm2} required={true} />
            <input type="text" placeholder="Precio en soles..." {...register("precioSoles")} disabled={disabledForm2} required={true} />
            <input type="text" placeholder="Precio en dolares..." {...register("precioDolares")} disabled={disabledForm2} required={true} />
            <input type="text" placeholder="Stock..." {...register("stock")} disabled={disabledForm2} required={true} />
            <input type="submit" disabled={disabledForm2} />
        </form>
        {
            addProduct && <h3>Producto actualizado correctamente</h3>
        }
    </main>
  )
}

export default UpdateProduct