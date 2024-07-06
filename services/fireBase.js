import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyB31ECT-MsUC4MfoDCrxBlIL5RrkPus-Vo',
  authDomain: 'damda-fa904.firebaseapp.com',
  projectId: 'damda-fa904',
  storageBucket: 'damda-fa904.appspot.com',
  messagingSenderId: '881140049167',
  appId: '1:881140049167:web:b076fe847200e0b9460a7a',
  measurementId: 'G-2RDMX9EWEZ',
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export { app as default }
