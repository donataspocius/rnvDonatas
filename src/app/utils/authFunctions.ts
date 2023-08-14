import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAkhFg3hCRjnpIxdETeJPaCCekNyOR2F0U',
  authDomain: 'flexn-donatas.firebaseapp.com',
  projectId: 'flexn-donatas',
  storageBucket: 'flexn-donatas.appspot.com',
  messagingSenderId: '1008600520434',
  appId: '1:1008600520434:web:48273f933f51646b85226b',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface UserDataProps {
  name?: string;
  email: string;
  password: string;
}

// CREATE USER
export const createUser = (
  {email, password}: UserDataProps,
  callback: (userId: string | undefined, error?: string) => void,
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed up
      const userId = userCredential.user.uid;
      callback(userId);
    })
    .catch(err => {
      // console.log(err.code);
      // console.log(err.message);
      let error: string = '';
      if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        error = 'Password should be at least 6 characters';
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        error = 'Email already in use';
      }
      callback(undefined, error);
    });
};

// SIGN IN USER
export const signInUser = (
  {email, password}: UserDataProps,
  callback: (userId: string | undefined) => void,
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      // Signed in
      const userId = userCredential.user.uid;
      callback(userId);
    })
    .catch(err => {
      console.log(err.code);
      console.log(err.message);
      callback(undefined);
    });
};

// LOGOUT USER
export const logoutUser = async () => {
  await auth.signOut();
};
