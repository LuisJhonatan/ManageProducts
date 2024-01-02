import { useDispatch, useSelector } from "react-redux"
import style from "./car.module.css"
import { deleteCar, deleteProduct } from "../../redux/slices/carContentSlice";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase/dataBase";
import ModalSale from "../modalSale/ModalSale";
import { useForm } from "react-hook-form";
const Car = () => {
  const [cantidadSoles, setCantidadSoles]= useState(0);
  const [cantidadDolares, setCantidadDolares]= useState(0);
  const [finalSale, setFinalSale] = useState(false);
  const [idVenta, setIDVenta] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {register, handleSubmit, reset} = useForm();
  const car = useSelector(state => state.car);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('car', JSON.stringify(car.product));
    // Calcular la suma de precioSoles y precioDolares usando reduce
    const sumaSoles = car.product.reduce((total, producto) => total + producto.precioSoles, 0);
    const sumaDolares = car.product.reduce((total, producto) => total + producto.precioDolares, 0);

    // Actualizar los estados
    setCantidadSoles(sumaSoles);
    setCantidadDolares(sumaDolares);
  }, [car.product])

  const deleteP = (e) => {
    const id = e.currentTarget.dataset.id;
    dispatch(deleteProduct(id));
  }

  const sale = (data) => {
    const expNumero = /^[0-9]{8,9}$/;
    if(expNumero.test(data.dni)){
      const sale = {
        dniCliente: data.dni,
        direccion: data.direccion,
        nombreVendedor: user.name,
        productos: car.product.map(producto => ({
          idProducto: producto.idProducto,
          cantidad: producto.cantidad,
        })),
        estado: false
      }
      addDoc(collection(db, "ventas"), sale)
      .then((add) => {
        setFinalSale(true);
        dispatch(deleteCar());
        setIDVenta(add.id);
        console.log(add.id);
        console.log(idVenta);
        setModalVisible(true);
      })
    }else{
      alert("Ingrese un DNI válido.")
    }
    reset();
  }

  const closeModal = () => {
    setModalVisible(false);
    setIDVenta('');
  };

  return (
    <main className={style.containerCar}>
      <section>
      {
        car.product.length===0
        ? <h3> ☹️ Carrito vacio</h3>
        : car.product.map(p => {
          return(
            <article className={style.infProduct} key={p.idProducto}>
              <div>
                <h3>ID: {p.idProducto}</h3>
                <p>{p.nombre}</p>
                <p>S/.{p.precioSoles}.00</p>
                <p>${p.precioDolares}.00 USD</p>
                <p>Cantidad: {p.cantidad}</p>
                <button className={style.buttonProduct} data-id={p.idProducto}  onClick={deleteP}>Eliminar</button>
              </div>
              <div>
                <img src={p.imagen} alt={p.nombre} />
              </div>
            </article>
          )
        })
      }
      </section>
      {car.product.length!==0 && <section className={style.total}>
        <p>Total en soles: S./{cantidadSoles}.00 </p>
        <p>Total en dolares: $.{cantidadDolares}.00 USD </p>
        <form onSubmit={handleSubmit(sale)} className={style.formulario} >
          <label htmlFor="direccion">Dirección del cliente</label>
          <input id="direccion" type="text" {...register("direccion")} required={true} />
          <label htmlFor="dni">DNI del cliente</label>
          <input id="dni" type="text" {...register("dni")} required={true} />
          <input type="submit" value="Finalizar venta" />
        </form>
        {/* <button className={style.buttonProduct} onClick={sale}>Finalizar venta</button> */}
      </section>}
      <section>
        {finalSale && modalVisible && (
          <ModalSale idVenta={idVenta} closeModal={closeModal} />
        )}
      </section>
    </main>
  )
}

export default Car