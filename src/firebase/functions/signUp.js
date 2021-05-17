import init from '../../firebase/init';
init.auth().useEmulator("http://localhost:8004")

async function signUp(email, password){
  return await init.auth().createUserWithEmailAndPassword(email, password)
  .then((resObj) => {
    var creds = resObj.user
    return creds
  })
  .catch((error) => {
    var errorObj = { error: true, code: error.code, message: error.message }
    return errorObj
  });
}

export default signUp