import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    clearUser(state, action) {
      return null
    },
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(clearUser())
  }
}

export const loginUser = (credential) => {
  return async (dispatch) => {
    const user = await await loginService.login(credential)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
