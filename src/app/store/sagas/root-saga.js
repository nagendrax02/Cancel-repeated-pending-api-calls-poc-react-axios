import { all } from "redux-saga/effects";
import { todosWatcher } from "./todos-saga";

function* rootSaga() {
  yield all([todosWatcher()]);
}

export default rootSaga;
