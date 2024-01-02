import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VentasGeneradas from '../ventasGeneradas/VentasGeneradas'
import VentasAnuladas from '../ventasAnuladas/VentasAnuladas'
import ListProducts from '../listProducts/ListProducts'
import ProductsDetail from '../productsDetail/ProductsDetail'
import AddProduct from '../addProduct/AddProduct'
import UpdateProduct from '../updateProduct/UpdateProduct'
import DeleteProduct from '../deleteProduct/DeleteProduct'
import Car from '../car/Car'
import Welcome from '../welcome/Welcome'

const RoutesHome = () => {
  return (
    <Routes>
        <Route path='/*' element={<Welcome />} />
        <Route path='/ventas-generadas' element={<VentasGeneradas />} />
        <Route path='/ventas-anuladas' element={<VentasAnuladas />} />
        <Route path='/listar-productos' element={<ListProducts />} />
        <Route path='/producto/:id' element={<ProductsDetail />} />
        <Route path='/agregar-producto' element={<AddProduct />} />
        <Route path='/actualizar-producto' element={<UpdateProduct />} />
        <Route path='/eliminar-producto' element={<DeleteProduct />} />
        <Route path='/carrito' element={<Car />} />
    </Routes>
  )
}

export default RoutesHome