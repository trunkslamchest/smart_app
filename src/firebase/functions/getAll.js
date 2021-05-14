import init from '../../firebase/init';
init.auth().useEmulator("http://localhost:8004")

async function getAll() {
  // var ref = await init.database().ref().get().then((snap) => {
  //   if (snap.exists()) {
  //     return snap.val()
  //   } else {
  //     return { ERR_CODE: "001", MESSAGE: "Cannot fetch Reference" }
  //   }
  // }).catch((error) => {
  //   console.error(error)
  //   return error
  // });

  // return ref

  return await init.database().ref('/').once('value').then((snap) => {
    if (snap.exists()) return snap.val()
    else return { ERR_CODE: "001", MESSAGE: "Cannot fetch Reference" }
  }).catch((error) => {
    console.error(error)
    return error
  });

}

export default getAll()