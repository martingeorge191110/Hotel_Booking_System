const loginState = {
   userInf: localStorage.getItem("user") !== "" ? JSON.parse(localStorage.getItem("user")) : null,
   userToken: localStorage.getItem("token") !== "" ? localStorage.getItem("token") : null,
   travelers: null
}

const loginReducer = (state = loginState, action) => {
   if (action.type === "USER_LOGIN")
      return {
         ...loginState,
         userInf: action.payload
      }
   else if (action.type === "FLIGHT_OPTIONS")
      return {
         ...loginState,
         travelers: action.payload
      }

   return loginState
}

export {loginReducer}