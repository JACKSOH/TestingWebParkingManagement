
start();
function start() {

    //document.getElementById("registerContainer").style.display = "none";
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


}
function SaveDate() {

    var text1 = document.getElementById("box1").value;
    var text2 = document.getElementById("box2").value;

    if (text1 !== "" && text2 !== "") {

        var testingRef = firebase.database().ref().child("testing");
        alert();
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
            alert("hi");
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
    var check = false;
    if (email !== "" && name !== "" && password !== "" && confirmPassword !== "" && phone !== "") {
        if (password === confirmPassword) {

            check = true;
        } else {
            check = false;
            alert("password not match");
        }
    } else {
        alert("please fill all information");
        check = false;
    }

    return check;
}
function login() {

    var loginemail = document.getElementById("loginEmail").value;
    var loginpassword = document.getElementById("loginPassword").value;
    if (loginemail !== "" && loginpassword !== "") {
        firebase.auth().signInWithEmailAndPassword(loginemail, loginpassword).then(function success(user) {
            document.getElementById("welcome").innerHTML = "Welcome " + firebase.auth().currentUser.email;
            document.getElementById("registerContainer").style.display = "block";
        }).catch(function (error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    } else {
        alert("no null value accepted");
    }

}
function showCurrentUser() {
    alert(firebase.auth().currentUser.email);
}
function registerNewStaff() {

    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var phone = document.getElementById("phone").value;
    var role = document.getElementById("role").value;
    var originalUser = firebase.auth().currentUser;
    if (validateStaffInfo(email, name, password, confirmPassword, phone)) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function success(user) {
            var userRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid);

            userRef.set({
                name: name,
                phone: phone,
                email: email,
                role: role
            })
            alert("user created");
            //change back to the original user
            firebase.auth().updateCurrentUser(originalUser);
            alert(firebase.auth().currentUser.email);
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
class users {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

}
function getAllUser() {
    var usersRef = firebase.database().ref().child("users");
    var rowCount = 0;

    usersRef.on("child_added", snap => {
        var name = snap.child("name").val();
        var phone = snap.child("phone").val();
        var role = snap.child("role").val();
        var uid = snap.key;
        var userTable = document.getElementById("userTable");
        var row = userTable.insertRow(rowCount);
        row.id = uid;
        var numberCell = row.insertCell(0);
        var nameCell = row.insertCell(1);
        nameCell.id = "name";
        var phoneCell = row.insertCell(2);
        phoneCell.id = "phone";

        var roledd = document.createElement("select");

        var adminOption = document.createElement("option");
        var staffOption = document.createElement("option");

        adminOption.text = "Admin";
        adminOption.value = "admin";
        staffOption.text = "Staff";
        staffOption.value = "staff";
        roledd.add(adminOption);
        roledd.add(staffOption);
        roledd.onchange = function () { changeRole(roledd.options[roledd.selectedIndex].value, uid) };

        if (role.toLowerCase() === "admin") {

            adminOption.selected = "selected";

        } else {
            staffOption.selected = "selected";
        }
        var roleCell = row.insertCell(3);
        roleCell.id = "role";

        numberCell.innerHTML = rowCount + 1;
        nameCell.innerHTML = name;
        phoneCell.innerHTML = phone;
        roleCell.appendChild(roledd);
        rowCount++;

    });

}
function changeRole(changedRole, uid) {
    var userRef = firebase.database().ref("users/" + uid);
    userRef.update({
        'role': changedRole
    });
    alert("update successfully");

}


