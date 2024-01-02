import { useEffect, useState } from "react"
import style from "./ventasGeneradas.module.css"
import { collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/dataBase"
const VentasGeneradas = () => {
  const [ventas, setVentas] = useState([]);

  const updateStatus = async (e) => {
    const updateD = doc(db, "ventas", e.currentTarget.dataset.id);
    await updateDoc(updateD, {
      estado: true
    });
    
  }

  const handleSale = async (e) => {
    const deleteD = doc(db, "ventas", e.currentTarget.dataset.id);
    await setDoc(deleteD, { ventaAnulada : true }, { merge: true } );
  }

  useEffect(() => {
    // Obtener datos iniciales
    const obtenerVentas = async () => {
      const resp = await getDocs(collection(db, 'ventas'));
      setVentas(
        resp.docs.map((doc) => ({
          ...doc.data(),
          idVenta: doc.id,
        }))
      );
    };

    obtenerVentas();

    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(collection(db, 'ventas'), (querySnapshot) => {
      const ventasActualizadas = [];
      querySnapshot.forEach((doc) => {
        ventasActualizadas.push({
          ...doc.data(),
          idVenta: doc.id,
        });
      });
      setVentas(ventasActualizadas);
    });

    // Limpiar el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <main className={style.ventas}>
      {
        ventas.map((v) => {
          return(
            !v.ventaAnulada && 
            <article className={style.containerSale} key={v.idVenta}>
              <h3>Venta: {v.idVenta}</h3>
              <p>DNI cliente: {v.dniCliente}</p>
              <p>Dirección: {v.direccion}</p>
              <p>Vendedor: {v.nombreVendedor}</p>
              <div className={style.products}>
                <h3>Productos</h3>
              {
                v.productos.map((p) => {
                  return(
                    <div key={p.idProducto}>
                      <h4>Producto: {p.idProducto}</h4>
                      <p>Cantidad: {p.cantidad}</p>
                    </div>
                  )
                })
              }
              </div>
              <p>{v.estado?"Estado: Entregado":"Estado: No entregado"}</p>
              <div className={style.menuEdit}>
                {
                  v.estado?"": <button className={style.buttonProduct} data-id={v.idVenta} onClick={updateStatus}>Marcar como entregado</button>
                }
                <button className={style.buttonProduct} data-id={v.idVenta} onClick={handleSale}>Anular venta</button>
              </div>
            </article>
          )
        })
      }
    </main>
  )
}

export default VentasGeneradas