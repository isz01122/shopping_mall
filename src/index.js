import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//라이브러리 임포트 방법 주로 "./" 기호가 없으면 라이브러리임
import { HashRouter } from "react-router-dom";
// 리덕스 사용방법!
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === "alert닫기") {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 초기값 = [];

//데이터 수정하는 방법을 담을 함수
function reducer(state = 초기값, 액션) {
  if (액션.type === "항목추가") {
    let found = state.findIndex((a) => {
      return a.id === 액션.payload.id;
    });
    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      let copy = [...state];
      액션.payload.cartnum = state.length;
      copy.push(액션.payload);
      return copy;
    }
  }
  if (액션.type === "수량증가") {
    let copy = [...state];
    copy[액션.데이터].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];
    if (copy[액션.데이터].quan > 0) {
      copy[액션.데이터].quan--;
    }
    return copy;
  } else {
    return state;
  }
}
//리덕스 스토어!
let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <HashRouter>
    {/* 리덕스로 값을 공유할 부분을 프로바이더로 감싼다 */}
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
