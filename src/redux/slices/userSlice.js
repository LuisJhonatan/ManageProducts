import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:"",
    email:"",
    phone:"",
    idEmail:"",
    employment:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state, action) => {
        const {name, email, phone, idEmail, employment} = action.payload;
        state.name = name;
        state.email = email;
        state.phone = phone;
        state.idEmail = idEmail;
        state.employment = employment;
    }
  },
})

// Action creators are generated for each case reducer function
export const { assignUser } = userSlice.actions

export default userSlice.reducer