import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

console.log("Dashboard JS Loaded");

onAuthStateChanged(auth, (user) => {

    console.log(user);

    if (!user) {

        alert("Not Logged In");

        window.location.href = "admin.html";

    }

});

document.getElementById("logout").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "admin.html";

});
