import { firebase } from '@react-native-firebase/storage'

export async function uploadImageToFirebaseStorage(
  uri: string,
  fileName: string,
) {
  const reference = firebase.storage().ref(fileName)
  await reference.putFile(uri)

  const fileUrl = await reference.getDownloadURL()
  return fileUrl
}
