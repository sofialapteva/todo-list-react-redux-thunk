import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetList, thunkAdd, thunkDelete, thunkUpdate } from './redux/reducer'
import styles from './styles'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from './components/loader'

function App() {
  const list = useSelector(store => store.list)
  const error = useSelector(store => store.error)
  const textInput = useRef()
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    dispatch(thunkGetList()).then(() => {
      setLoader(pre => !pre)
    })
  }, [])

  const addHandler = async () => {
    setLoader(pre => !pre)
    await dispatch(thunkAdd(textInput.current.value))
    textInput.current.value = ''
    dispatch(thunkGetList()).then(() => {
      setLoader(pre => !pre)
    })
  }

  const updateHandler = async (id) => {
    setLoader(pre => !pre)
    await dispatch(thunkUpdate(id))
    dispatch(thunkGetList()).then(() => {
      setLoader(pre => !pre)
    })
  }

  const deleteHandler = async (id) => {
    setLoader(pre => !pre)
    await dispatch(thunkDelete(id))
    dispatch(thunkGetList()).then(() => {
      setLoader(pre => !pre)
    })
  }

  return (
    <div>
      <h1 className={styles.header}>To-do list</h1>
      {error}
      <div className='form'>
        <input type='text' ref={textInput} className={styles.inp} />
        <input type='button' value='ADD' className={styles.btn} onClick={addHandler} />
      </div>
      <div className='list'>
        {loader ? <Loader /> : ''}
        {list?.map((el, i) =>
          <div key={i} className={styles.task}>
            <div>{i + 1}).</div>
            <div className={el.isDone ? styles.doneLabel : styles.label}>{el.label}</div>
            <input className={styles.btnSmall} type='button' onClick={() => updateHandler(el._id)} value={el.isDone ? 'done' : 'do'} />
            <input className={styles.btnSmall} type='button' onClick={() => deleteHandler(el._id)} value='delete' />
          </div>)}
      </div>
    </div>
  );
}

export default App;
