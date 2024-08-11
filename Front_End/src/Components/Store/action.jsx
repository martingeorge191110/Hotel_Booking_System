const userLogIn = (userInformation) => {
   return {
      type: "USER_LOGIN",
      payload: userInformation
   }
}

export {userLogIn}