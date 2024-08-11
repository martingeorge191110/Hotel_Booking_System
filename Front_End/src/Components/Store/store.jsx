import {createStore} from "redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import { loginReducer } from "./reducer"

const store = createStore(loginReducer, composeWithDevTools())


export default store