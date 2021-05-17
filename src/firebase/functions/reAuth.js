import init from '../../firebase/init';
// init.auth().useEmulator("http://localhost:8004")

async function reAuth(email, password){

  var user = init.auth().currentUser
  var credentials = init.auth.EmailAuthProvider.credential(
    email,
    password
  )

  return await user.reauthenticateWithCredential(credentials).then(function(resObj) {
    return resObj
  }).catch(function(error) {
    var errorObj = { error: true, code: error.code, message: error.message }
    console.error(error)
    return errorObj
  });
}

export default reAuth