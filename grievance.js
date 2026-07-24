import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const status = document.getElementById("status");

    // Check empty fields
if (
    name === "" ||
    email === "" ||
    mobile === "" ||
    subject === "" ||
    message === ""
) {

    status.style.color = "red";
    status.innerHTML = "Please fill all fields.";

    return;
}

// Validate email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {

    status.style.color = "red";
    status.innerHTML = "Please enter a valid email address.";

    return;
}

// Validate mobile number (10 digits)
const mobilePattern = /^[0-9]{10}$/;

if (!mobilePattern.test(mobile)) {

    status.style.color = "red";
    status.innerHTML = "Please enter a valid 10-digit mobile number.";

    return;
}

    try {

        await addDoc(collection(db, "grievances"), {

            name: name,
            email: email,
            mobile: mobile,
            subject: subject,
            message: message,
            status: "Pending",
            createdAt: new Date()

        });

        status.style.color = "green";
        status.innerHTML = "✅ Your grievance has been submitted successfully.";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";

    }

    catch (error) {

        console.error(error);

        status.style.color = "red";
        status.innerHTML = "Failed to submit grievance.";

    }

});