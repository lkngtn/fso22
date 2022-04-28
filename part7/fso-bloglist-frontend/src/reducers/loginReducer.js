import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      blogService.setToken(action.payload.token)
      return action.payload
    },
    clearUser() {
      blogService.setToken(null)
      return null
    },
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification('Login Successful', 'success', 5))
    } catch (exception) {
      dispatch(setNotification('Wrong Credentials', 'error', 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(clearUser())
    dispatch(setNotification('Logout Successful', 'success', 5))
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
