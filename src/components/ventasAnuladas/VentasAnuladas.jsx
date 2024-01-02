import { useEffect, useState } from 'react';
import style from './ventasAnuladas.module.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/dataBase';

const VentasAnuladas = () => {
  const [ventas, setVentas] = useState([]);

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
  }, []);


  return (
    <main className={style.ventas}>
      {
        ventas.map((v) => {
          return(
            v.ventaAnulada && 
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
              <p>{v.ventaAnulada && "VENTA ANULADA"}</p>
            </article>
          )
        })
      }
    </main>
  )
}

export default VentasAnuladas