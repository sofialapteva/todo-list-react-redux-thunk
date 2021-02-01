const initialState = {
  list: [],
  error: ''
}

export const thunkGetList = () => {
  return async (dispatch) => {
    const req = await fetch('http://localhost:8080/');
    const listFromBackend = await req.json();
    dispatch({ type: 'SET_TODO_LIST', payload: listFromBackend })
  }
}

export const thunkAdd = (todo) => {
  return async (dispatch) => {
    const req = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: todo
      })
    })
    const listFromBackend = await req.json();
    dispatch({ type: 'SET_TODO_LIST', payload: listFromBackend })
  }
}

export const thunkDelete = (id) => {
  return async (dispatch) => {
    const req = await fetch('http://localhost:8080/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
    const res = await req.json()
    res._id === id ? dispatch({ type: 'REMOVE_LIST_ITEM', payload: id }) : dispatch({ type: 'ALREADY_DELETED' })
  }
}

export const thunkUpdate = (id) => {
  return async (dispatch) => {
    await fetch('http://localhost:8080/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id
      })
    })
    dispatch({ type: 'UPDATE_LIST_ITEM', payload: id })
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TODO_LIST':
      return {
        ...state, error: '',
        list: action.payload
      }
    case 'REMOVE_LIST_ITEM':
      const newList = state.list.filter(el => el._id !== action.payload)
      return {
        ...state, error: '',
        list: newList,
      }
    case 'UPDATE_LIST_ITEM':
      const updatedList = state.list.map(el => {
        if (el._id === action.payload) {
          el.isDone = !el.isDone
        }
        return el
      })
      return {
        ...state, error: '',
        list: updatedList,
      }
    case 'ALREADY_DELETED':
      return {
        ...state, error: 'Todo has already been deleted'
      }
    default:
      return state
  }
}

export default reducer
