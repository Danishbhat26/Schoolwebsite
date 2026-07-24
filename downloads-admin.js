import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadBtn");

const pdfTitle = document.getElementById("pdfTitle");
const pdfCategory = document.getElementById("pdfCategory");
const pdfDescription = document.getElementById("pdfDescription");
const pdfLink = document.getElementById("pdfLink");

const status = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {

    if (
        pdfTitle.value.trim() === "" ||
        pdfCategory.value === "" ||
        pdfLink.value.trim() === ""
    ) {

        status.style.color = "red";
        status.innerHTML = "Please fill all required fields.";

        return;
    }

    status.style.color = "#004080";
    status.innerHTML = "Saving document...";

    try {

        await addDoc(collection(db, "downloads"), {

            title: pdfTitle.value.trim(),

            category: pdfCategory.value,

            description: pdfDescription.value.trim(),

            pdfUrl: pdfLink.value.trim(),

            createdAt: new Date()

        });

        status.style.color = "green";
        status.innerHTML = "✅ Document saved successfully.";

        pdfTitle.value = "";
        pdfCategory.value = "";
        pdfDescription.value = "";
        pdfLink.value = "";

    }

    catch (error) {

        console.error(error);

        status.style.color = "red";
        status.innerHTML = "Failed to save document.";

    }

});