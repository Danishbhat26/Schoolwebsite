import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Protect Dashboard
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "admin.html";

    }

});

// Logout
document.getElementById("logout").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "admin.html";

});
