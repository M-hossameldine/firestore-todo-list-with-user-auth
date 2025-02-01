import { useCallback } from "react"
import { getFirestore, collection, getDocs } from "firebase/firestore"

export const useFirebase = () => {
  // init service

  // collection ref

  // get collection data
  const getCollectionData = useCallback(async (collectionKey: string) => {
    const db = getFirestore()

    const getCollectionRef = (key: string) => collection(db, key)

    const colRef = getCollectionRef(collectionKey)
    return getDocs(colRef).then(snapshot => {
      return snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }))
    })
  }, [])

  return {
    getCollectionData,
  }
}
