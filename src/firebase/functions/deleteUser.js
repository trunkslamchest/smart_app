import init from '../../firebase/init';
init.auth().useEmulator("http://localhost:8004")

async function deleteUser(){
  return await init.auth().currentUser.delete().then(function() {
    return { message: "Your Profile Has Been Deleted." }
  }).catch(function(error) {
      var errorObj = { error: true, code: error.code, message: error.message }
      console.log(errorObj)
      return errorObj
  });
}

export default deleteUser