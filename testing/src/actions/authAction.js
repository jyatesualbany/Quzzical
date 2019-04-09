import {TEST_DISPATCH} from './types.js'
//Register USer

export const registerUser = (userData) => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
}
