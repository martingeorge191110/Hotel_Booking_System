const loginState = {
   userInf: localStorage.getItem("user") !== "" ? JSON.parse(localStorage.getItem("user")) : null,
   userToken: localStorage.getItem("token") !== "" ? localStorage.getItem("token") : null,
   flightSearch: JSON.parse(sessionStorage.getItem("flight")) || null
}

const loginReducer = (state = loginState, action) => {
   if (action.type === "USER_LOGIN")
      return {
         ...loginState,
         userInf: action.payload
      }
   else if (action.type === "FLIGHT_SEARCH")
      return {
         ...loginState,
         flightSearch: action.payload
      }

   return loginState
}

export {loginReducer}