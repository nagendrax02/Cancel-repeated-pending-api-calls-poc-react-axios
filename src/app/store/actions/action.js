import { GET_TODOS_LIST } from "../actions/index";

// export const setTodos = (data) => {
//   return {
//     type: SET_TODOS,
//     payload: data
//   };
// };

export const getTodosList = (data) => {
  return { type: GET_TODOS_LIST, payload: data };
};
