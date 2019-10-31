var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var firebaseConfig = {
        apiKey: "AIzaSyDpdZrrn3iGs2Ikfgq8DZpJ42caugAi1_M",
        authDomain: "testing-5f70e.firebaseapp.com",
        databaseURL: "https://testing-5f70e.firebaseio.com",
        projectId: "testing-5f70e",
        storageBucket: "testing-5f70e.appspot.com",
        messagingSenderId: "1033477612291",
        appId: "1:1033477612291:web:46837dba4f1efd4e963f36",
        measurementId: "G-4BC6T605TD",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);