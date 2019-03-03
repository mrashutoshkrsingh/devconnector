import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducers";
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer
});
