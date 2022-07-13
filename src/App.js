import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useReducer, useRef } from 'react';

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
      newState = state.filter((it) => it.id !== action.targerId);
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

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


const dummyDate = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1656177741256
  },
  {
    id: 2,
    emotion: 3,
    content: "오늘의 일기 2번",
    date: 1656177741257
  },
  {
    id: 3,
    emotion: 2,
    content: "오늘의 일기 3번",
    date: 1656177741258
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1656177741259
  },
  {
    id: 5,
    emotion: 6,
    content: "오늘의 일기 6번",
    date: 16561777412560
  }
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyDate);

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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={
        { onCreate, onEdit, onRemove }
      }>
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
