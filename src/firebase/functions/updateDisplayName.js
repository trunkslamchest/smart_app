import init from '../../firebase/init';
// init.auth().useEmulator("http://localhost:8004")

async function updateDisplayName(displayName){
  let user = init.auth().currentUser

  return await user.updateProfile({
    displayName: displayName
  })
  .then(() => {
    return user
  })
  .catch(function(error) {
    var errorObj = { error: true, code: error.code, message: error.message }
    console.error(error)
    return errorObj
  })
}

export default updateDisplayName