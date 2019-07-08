import * as firebase from 'firebase/app';
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyA8Y1nQSkqyu08sUfi5UEH7JDlp1vk8cDU",
authDomain: "draggablenote.firebaseapp.com",
databaseURL: "https://draggablenote.firebaseio.com",
projectId: "draggablenote",
storageBucket: "",
messagingSenderId: "38129360452",
appId: "1:38129360452:web:51eb3c9b94d6c4d8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseConnect = firebase.database().ref();
export default firebaseConnect;


