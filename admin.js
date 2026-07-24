import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

        message.style.color = "green";
        message.innerHTML = "Login Successful!";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    })

    .catch((error) => {

        message.style.color = "red";
        message.innerHTML = error.message;

    });

});