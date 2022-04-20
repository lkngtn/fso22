import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeout = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    writeNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const setNotification = (message, type, duration) => {
  const notification = { message: message, type: type }
  return async (dispatch) => {
    dispatch(writeNotification(notification))
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export const { writeNotification, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
