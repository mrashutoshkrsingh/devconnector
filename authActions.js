import { TEST_DISPATCH } from "./types";

//REGISTER USER

export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
