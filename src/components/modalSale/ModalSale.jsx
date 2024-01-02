import React from 'react'
import style from "./modal.module.css"

const ModalSale = ({idVenta, closeModal}) => {
  return (
    <div className={style.modalOverlay} onClick={closeModal}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Venta finalizada</h3>
        <p>ID de venta: {idVenta}</p>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  )
}

export default ModalSale