import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducers";
import postReducer from "./postReducer";
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
  post: postReducer
});
