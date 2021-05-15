const noteReducer = (state = [], { type, data }) => {
  const types = {
    NEW_NOTE: _ => [...state, data],
    TOGGLE_IMPORTANCE: _ => {
      const id = data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      return state.map(note => (note.id !== id ? note : changedNote))
    },
    default: _ => state,
  }
  return types[type]() || types['default']()
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = content => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId(),
    },
  }
}

export const toggleImportanceOf = id => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  }
}

export default noteReducer
