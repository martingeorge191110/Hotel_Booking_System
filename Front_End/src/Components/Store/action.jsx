const userLogIn = (userInformation) => {
   return {
      type: "USER_LOGIN",
      payload: userInformation
   }
}
const Travelers = (options) => {
   return {
      type: "FLIGHT_OPTIONS",
      payload: options
   }
}
export {userLogIn, Travelers}