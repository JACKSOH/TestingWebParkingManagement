
function start() {
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

    var database = firebase.datebase();
}
function SaveDate() {

    var text1 = document.getElementById("box1").value;
    var text2 = document.getElementById("box2").value;

    if (text1 !== "" && text2 !== "") {

        var testingRef = firebase.database().ref().child("testing");

        testingRef.push({
            a: text1,
            b: text2
        })
        alert("value inserted");
    } else {
        alert("no null value accept");
        document.getElementById("box1").value = "";
        document.getElementById("box2").value = "";
    }
}
function registerStaff() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var phone = document.getElementById("phone").value;
    var role = document.getElementById("role").value;

    if (validateStaffInfo(email, name, password, confirmPassword, phone)) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function success(user) {
            var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid);
            alert("hi" );
            userRef.set({
                name: name,
                phone: phone,
                role: role
            })
            alert("user creted");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode);
            alert(errorMessage);
        });
    } else {
        alert("wrong");
    }

}
function validateStaffInfo(email, name, password, confirmPassword, phone) {
    var check = "false";
    if (email !== "" && name !== "" && password !== "" && confirmPassword !== "" && phone !== "") {
        if (password === confirmPassword) {

            check = true;
        } else {
            alert("password not match");
        }
    } else {
        alert("please fill all information");
        check = false;
    }

    return check;
}
start();