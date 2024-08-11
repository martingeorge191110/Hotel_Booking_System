const loginState = {
   userInf: JSON.parse(localStorage.getItem("user")) || null
}

const loginReducer = (state = loginState, action) => {
   if (action.type === "USER_LOGIN")
      return {
         ...loginState,
         userInf: action.payload
      }

   return loginState
}

export {loginReducer}