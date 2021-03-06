import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now:', state)
  console.log('action:', action)
  const { type, data } = action

  const actions = {
    NEW_BLOG: data => [...state, data],
    ADD_A_LIKE: data => state.map(blog => (blog.id === data.id ? data : blog)),
    DELETE_BLOG: data => state.filter(blog => blog.id !== data),
    GET_BLOGS: _ => data,
    ADD_COMMENT: data =>
      state.map(blog =>
        blog.id === data.id
          ? { ...blog, comments: [...blog.comments, data.comment] }
          : blog
      ),
    default: _ => state,
  }
  return (actions[type] || actions['default'])(data)
}

export const newBlog = blog => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: data,
    })
  }
}

export const getBlogs = _ => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: data,
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(newBlog)
    dispatch({
      type: 'ADD_A_LIKE',
      data: newBlog,
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.drop(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog.id,
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { id, comment },
    })
  }
}
export default blogReducer
