import { useForm } from "react-hook-form"
import style from "./deleteProduct.module.css"
import { useState } from "react";
import getDato from "../../helpers/getDato";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/dataBase";

const DeleteProduct = () => {

  const {register, handleSubmit, reset} = useForm();
  const [product, setProduct] = useState(null);
  const [exist, setExist] = useState(true);
  const [eliminado, setEliminado] = useState(false);

  const deleteProduct = (data) => {
    getDato(data.id)
    .then((product) => {
      if(product === null){
        setExist(false);
      }else{
        setProduct(product);
      } 
    }).catch(() => {
      setExist(false);;
    }).finally(() => {
      setTimeout(() => {
        setExist(true);
      }, 2000);
      reset();
    })
  }

  const deleteP = async () => {
    const confirma = window.confirm("¿Desea eliminar el producto?");
    if(confirma){
      await deleteDoc(doc(db, "productos", product.id))
      setProduct(null);
      setEliminado(true);
    }
    setTimeout(() => {
      setEliminado(false);
    }, 2000);
  }

  return (
    <main className={style.deleteProduct}>
      <form className={style.formulario} onSubmit={handleSubmit(deleteProduct)} >
        <input type="text" placeholder="Ingresa el ID" {...register("id")}  />
        <input type="submit" />
      </form>
      {
        !exist && <h3>El producto no existe</h3>
      }
      {product && (
            <div className={style.containerProduct}>
                <h3>{product.nombre}</h3>
                <img src={product.imagen} alt={product.nombre} />
                <div className={style.containerInfo}>
                  <p>Precio: S/. {product.precioSoles}.00</p>
                  <p>Precio: $ {product.precioDolares}.00 USD</p>
                  <p>Stock: {product.stock}</p>
                </div>
                <button className={style.delete} onClick={deleteP}>Eliminar</button>
            </div>
        )}
        {
        eliminado && <h3>El producto se eliminó con exito</h3>
        }
    </main>
  )
}

export default DeleteProduct