import { useForm } from "react-hook-form"
import style from "./addProduct.module.css"
import getDato from "../../helpers/getDato";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/dataBase";
import { useState } from "react";
import Loading from "../loading/Loading";

const AddProduct = () => {
    const {register, handleSubmit, reset} = useForm();
    const [add, setAdd] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    const enviar = (data) => {
        const expID = /^\d{5}[A-Z]$/;
        const expNumero = /^[0-9]+$/;
        let message = "Ingresa:";
        if(!expID.test(data.id)){
            message = `${message} un ID valido`;
        }
        if(!expNumero.test(data.precioSoles) || !expNumero.test(data.precioDolares)){
            message = `${message} un precio válido`;
        }
        if(!expNumero.test(data.stock)){
            message = `${message} un valor de stock válido`;
        }

        if(message!=="Ingresa:"){
            alert(message);
        }else{
            setLoading(true);
            getDato(data.id)
            .then( async(result) => {
                if(result!==null){
                    setRegistered(true);
                    setTimeout(() => {
                        setRegistered(false);
                    }, 2500);
                }else{
                    await setDoc(doc(db, "productos", data.id), {
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                        imagen: data.imagen,
                        precioSoles: Number(data.precioSoles),
                        precioDolares: Number(data.precioDolares),
                        stock: Number(data.stock)
                    })
                    setAdd(true);
                    setTimeout(() => {
                        setAdd(false);
                    }, 2500);
                }
            })
            .catch((error)=>{
                console.log("Error", error);
            })
            .finally(() => {
                setLoading(false);
                reset();
            })
            
        }
        
    }
  return (
    <main className={style.addProduct}>
        <h3>Agrega los datos del producto</h3>
        <form className={style.formulario} onSubmit={handleSubmit(enviar)}>
            <input type="text" placeholder="ID del producto..." {...register("id")} />
            <input type="text" placeholder="Nombre del producto..." {...register("nombre")} />
            <input type="text" placeholder="Descripción del producto..." {...register("descripcion")} />
            <input type="text" placeholder="URL de la imagen..." {...register("imagen")} />
            <input type="text" placeholder="Precio en soles..." {...register("precioSoles")} />
            <input type="text" placeholder="Precio en dolares..." {...register("precioDolares")} />
            <input type="text" placeholder="Stock..." {...register("stock")} />
            <input type="submit" />
        </form>
        <div>{loading && <Loading />}</div>
        <div>{add && <div className={style.complete}>Se agregó el producto correctamente.</div>}</div>
        <div>{registered && <div className={style.complete}>El producto ya se ha registrado anteriormente.</div>}</div>
    </main>
  )
}

export default AddProduct