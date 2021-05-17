import init from '../../firebase/init';
init.auth().useEmulator("http://localhost:8004")

async function logOut(){
  return await init.auth().signOut().then(() => {
  }).catch((error) => {
    var errorObj = { error: true, code: error.code, message: error.message }
    console.error(error)
    return errorObj
  });
}

export default logOut