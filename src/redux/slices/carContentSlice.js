import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
};

export const carContentSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { idProducto, cantidad } = action.payload;
            const existProduct = state.product.find(p => p.idProducto === idProducto);
            if (existProduct) {
                // El producto ya existe, actualiza la cantidad
                existProduct.cantidad += cantidad;
              } else {
                // El producto no existe, agrégalo al array
                state.product.push(action.payload);
              }
        },
        deleteProduct: (state, action) => {
            const idProducto = action.payload;
            state.product = state.product.filter(p => p.idProducto !== idProducto);
        },
        deleteCar: (state) => {
            state.product = [];
        },
        existCar: (state, action) => {
            state.product = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { addProduct,deleteProduct,deleteCar, existCar } = carContentSlice.actions;

export default carContentSlice.reducer;