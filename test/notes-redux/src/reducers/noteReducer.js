import noteService from '../services/notes'

const noteReducer = (state = [], { type, data }) => {
  const types = {
    NEW_NOTE: _ => [...state, data],
    INIT_NOTES: _ => data,
    TOGGLE_IMPORTANCE: _ => {
      const { id } = data
      return state.map(note =>
        note.id !== id
          ? note
          : {
              ...note,
              important: !note.important,
            }
      )
    },
    default: _ => state,
  }
  return (types[type] || types['default'])()
}

export const createNote = content => {
  return async dispatch => {
    const data = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: data,
    })
  }
}

export const initializeNotes = _ => {
  return async dispatch => {
    const data = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: data,
    })
  }
}

export const toggleImportanceOf = id => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  }
}

export default noteReducer
