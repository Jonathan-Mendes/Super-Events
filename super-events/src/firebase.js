import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyAJAWqpng8KXlZKvOBafmZe4Ev2YZe9kdQ",
    authDomain: "super-events-f85d9.firebaseapp.com",
    databaseURL: "https://super-events-f85d9.firebaseio.com",
    projectId: "super-events-f85d9",
    storageBucket: "super-events-f85d9.appspot.com",
    messagingSenderId: "585925636579",
    appId: "1:585925636579:web:cf79d6a93cac4156c630d6"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        //Referenciando a database para acessar em outros locais
        this.app = app.database();

        this.storage = app.storage();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout() {
        return app.auth().signOut();
    }

    async register(nome, cpf, email, password, imagem) {
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome,
            cpf: cpf,
            foto: imagem
        })
    }

    resetPassword(email) {
        try {
            app.auth().sendPasswordResetEmail(email);
            return true
        } catch (error) {
            return false
        }

        // .then(function() {
        //     // Email sent.
        //   }).catch(function(error) {
        //     // An error happened.
        //   });
    }

    checkEmail(email) {
        app.sendSignInLinkToEmail(email).then(function () {
                window.localStorage.setItem('emailForSignIn', email);
                return true
            })
            .catch(function (error) {
            });
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null;
        }
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }
}

export default new Firebase();