import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBulew_BaByeY3dozl-MM537yQUS9-K8P8",
    authDomain: "final-project-4678c.firebaseapp.com",
    databaseURL: "https://final-project-4678c.firebaseio.com",
    projectId: "final-project-4678c",
    storageBucket: "final-project-4678c.appspot.com",
    messagingSenderId: "942991858994"
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export default firebase;
