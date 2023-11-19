import { takeLatest, takeEvery, put, cancel, fork } from "redux-saga/effects";
import * as actions from "../actions/index";
import { httpGET } from "../../https/http";

let apiTask;

export function* getTodosSaga(action) {
  console.log("action--->", action);
  try {
    const response = yield httpGET(
      "https://jsonplaceholder.typicode.com/todos"
    );
    action.payload.setApiCalled(true);
    action.payload.onSuccess(true, response.data);
  } catch (err) {
    action.payload.onError(false, err.response?.data);
  } finally {
    action.payload.setApiCalled(false);
  }
}

// Note: don't check the network tab you can put a console on onsuccess of api and can see how many times its being called
// with take every we can use keep track of apitaks and can use cancel method of redux saga effect to cancel previous one

// export function* todosWatcher() {
//   yield takeEvery(actions.GET_TODOS_LIST, function* (action) {
//     // If there's a previous task running, cancel it
//     if (apiTask) {
//       yield cancel(apiTask);
//     }

//     // ceeate a new task for the current API call
//     apiTask = yield fork(getTodosSaga, action);
//   });
// }

// with take latest we can direct cancel all the old request it will only consider the last request have been made

export function* todosWatcher() {
  yield takeLatest(actions.GET_TODOS_LIST, getTodosSaga);
}

// export function* todosWatcher() {
//   yield takeLatest(actions.GET_TODOS_LIST, function* (action) {
//     // If there's a previous task running, cancel it
//     if (apiTask) {
//       yield cancel(apiTask);
//     }

//     // ceeate a new task for the current API call
//     apiTask = yield fork(getTodosSaga, action);
//   });
// }
