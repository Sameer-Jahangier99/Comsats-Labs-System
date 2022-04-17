import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  usersUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from './services/Reducers/UserReducer'
import {
  addProductReducer,
  allProductReducer,
  findProductReducer,
  updateProductReducer
} from './services/Reducers/ProductReducer'

import { addComplaintReducer, allComplaintReducer, complaintApproveByDcoReducer, complaintRejectByDcoReducer } from "./services/Reducers/ComplaintReducer"

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateProfileReducer,
  usersUpdate: usersUpdateProfileReducer,
  listuser: userListReducer,
  userDelete: userDeleteReducer,
  addProduct: addProductReducer,
  allProductRed: allProductReducer,
  updateProduct: updateProductReducer,
  findProduct: findProductReducer,
  addComplaint: addComplaintReducer,
  allComplaint: allComplaintReducer,
  complaintApproveByDcoReducer,
  complaintRejectByDcoReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
