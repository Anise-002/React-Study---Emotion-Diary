import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';



const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => { it.id !== action.targerId });
      break;
    }
    case "EDIT": {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default: {
      return state;
    }
  }
  return newState;
}

function App() {

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE', data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    dataId.currnet++;
  }
  //REMOVE
  const onRemove = (targerId) => {
    dispatch({
      type: "REMOVE",
      targerId,
    })
  }
  //EDIT
  const onEdit = (date, content, emotion, targerId) => {
    dispatch({
      type: "REMOVE",
      data: {
        id: targerId,
        date: new Date(date).getTime(),
        content,
        emotion
      }

    })
  }


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
