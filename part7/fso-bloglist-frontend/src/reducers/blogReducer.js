import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blogObject,
      likes: blogObject.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const destroyBlog = (blogObject) => {
  return async (dispatch) => {
    await blogService.destroy(blogObject.id)
    dispatch(deleteBlog(blogObject))
  }
}

export const { appendBlog, updateBlog, deleteBlog, setBlogs } =
  blogSlice.actions
export default blogSlice.reducer
