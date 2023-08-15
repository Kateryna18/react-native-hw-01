import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRo9LWW_-K_YnDbO8RY2plmSfg0xiTmWo",
  authDomain: "react-native-socials-66a0e.firebaseapp.com",
  projectId: "react-native-socials-66a0e",
  storageBucket: "react-native-socials-66a0e.appspot.com",
  messagingSenderId: "711575960867",
  appId: "1:711575960867:web:b271000361fa12c41f6096",
  measurementId: "G-2MJ0ELR6GF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
