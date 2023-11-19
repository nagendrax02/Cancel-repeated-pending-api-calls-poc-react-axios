import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root-saga";
import { getTodosSaga } from "./sagas/todos-saga";

const rootReducer = combineReducers({
  getTodos: getTodosSaga
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
