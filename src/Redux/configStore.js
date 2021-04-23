import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import CourseReducer from "./Reducers/CourseReducer";
import UserReducer from "./Reducers/UserReducer";

const rootReducers = combineReducers({
  //Store to place all reducers of application
  CourseReducer,
  UserReducer,
});

export const store = createStore(rootReducers, applyMiddleware(reduxThunk));
