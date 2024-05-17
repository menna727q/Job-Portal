// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment = {
  firebase:{
  apiKey: "AIzaSyBhA6eIZBlWzyNPaG2IgTjlYomc6jLtOFs",
  authDomain: "job-portal-491ab.firebaseapp.com",
  projectId: "job-portal-491ab",
  storageBucket: "job-portal-491ab.appspot.com",
  messagingSenderId: "320395212869",
  appId: "1:320395212869:web:9fac627f6dd2f1288c8b2c",
  },
  production:false
};

// // Initialize Firebase
// const app = initializeApp(environment);


// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig = {
//   apiKey: "AIzaSyBhA6eIZBlWzyNPaG2IgTjlYomc6jLtOFs",
//   authDomain: "job-portal-491ab.firebaseapp.com",
//   projectId: "job-portal-491ab",
//   storageBucket: "job-portal-491ab.appspot.com",
//   messagingSenderId: "320395212869",
//   appId: "1:320395212869:web:9fac627f6dd2f1288c8b2c",
// };

// // Initialize Firebase
export const app = initializeApp(environment.firebase);


// // Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
