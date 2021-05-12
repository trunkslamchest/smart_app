import init from '../../firebase/init';
init.auth().useEmulator("http://localhost:8004")

async function logOut(){
  return await init.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    var errorObj = { error: true, code: error.code, message: error.message }
    // console.log(errorObj)
    return errorObj
  });
}

export default logOut