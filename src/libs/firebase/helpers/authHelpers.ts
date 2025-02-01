import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
} from "../firebaseConfig";

type UserCredentials = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password }: UserCredentials) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  // Save user details in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date().toISOString(),
  });

  return userCredential;
};

export const login = async ({ email, password }: UserCredentials) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
