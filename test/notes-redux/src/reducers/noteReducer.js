const noteReducer = (state = [], { type, data }) => {
  const types = {
    NEW_NOTE: _ => [...state, data],
    INIT_NOTES: _ => state,
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
  return (types[type] || types['default'])()
}

export const createNote = data => {
  return {
    type: 'NEW_NOTE',
    data,
  }
}

export const initializeNotes = data => {
  return {
    type: 'INIT_NOTES',
    data,
  }
}

export const toggleImportanceOf = id => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  }
}

export default noteReducer
