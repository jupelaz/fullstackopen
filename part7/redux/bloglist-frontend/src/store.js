import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store