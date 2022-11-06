const quotes = document.getElementById('quotes');
const error = document.getElementById('error');

const firebaseConfig = {
  apiKey: 'AIzaSyBfSKVmCqzVQRrxGUGgS8t6jeab-JDRho8',
  authDomain: 'aha-exam-8b280.firebaseapp.com',
  databaseURL:
    'https://aha-exam-8b280-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'aha-exam-8b280',
  storageBucket: 'aha-exam-8b280.appspot.com',
  messagingSenderId: '715484811639',
  appId: '1:715484811639:web:bfce8a582a3609e3ef1172',
  measurementId: 'G-BM3EGV5LYH',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

$(document).ready(async () => {
  
});