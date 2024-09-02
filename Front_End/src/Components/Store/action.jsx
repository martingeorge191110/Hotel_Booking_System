const userLogIn = (userInformation) => {
   return {
      type: "USER_LOGIN",
      payload: userInformation
   }
}
/**
 * Function to store all searching items
 */
const flightData = (serachingData) => {
   return {
      type: "FLIGHT_SEARCH",
      payload: serachingData
   }
}

export {userLogIn, flightData}