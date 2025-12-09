import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    _id : "",
    name : "",
    email : "",
    verify_email : "",
    status : "",
    role : "",
  }

  const userSlice = createSlice({
    name : 'user',
    initialState : initialValue,
    reducers : {
        setUserDetails : (state,action) => {
          state._id = action.payload?._id
          state.name = action.payload?.name
          state.email = action.payload?.email
          state.verify_email = action.payload?.verify_email
          state.status = action.payload?.status
          state.role = action.payload?.role
        },
        logout : (state,action)=>{
          state._id = ""
          state.name = ""
          state.email = ""
          state.verify_email = ""
          state.status = ""
          state.role = ""
        }
    }
  })

  export const { setUserDetails,logout } = userSlice.actions

  export default userSlice.reducer