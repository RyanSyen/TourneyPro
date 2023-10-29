var userObj = {
  id: null,
  username: null,
  email: null,
  isEmailVerified: null,
  photoURL: null,
  phoneNumber: null,
  providerData: providerDataObj,
  providerId: null, // firebase
  accessToken: null,
  lastSignInTime: null,
};

var providerDataObj = {
  providerId: null,
  uid: null,
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
};

// const providerDataObj = {
//     providerId: "password",
//     uid: "tester.tourneypro@gmail.com",
//     displayName: null,
//     email: "tester.tourneypro@gmail.com",
//     phoneNumber: null,
//     photoURL: null
// }

export default userObj;
