import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadBtn");

const alumniPhoto = document.getElementById("alumniPhoto");
const alumniName = document.getElementById("alumniName");
const alumniBatch = document.getElementById("alumniBatch");
const alumniProfession = document.getElementById("alumniProfession");
const alumniEmail = document.getElementById("alumniEmail");

const status = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {

    const file = alumniPhoto.files[0];

    if (!file) {

        status.style.color = "red";
        status.innerHTML = "Please select an alumni photo.";

        return;
    }

    if (

        alumniName.value.trim() === "" ||
        alumniBatch.value.trim() === "" ||
        alumniProfession.value.trim() === "" ||
        alumniEmail.value.trim() === ""

    ) {

        status.style.color = "red";
        status.innerHTML = "Please fill all fields.";

        return;

    }

    status.style.color = "#004080";
    status.innerHTML = "Uploading Alumni...";

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "school_gallery");

    try {

        const response = await fetch(

            "https://api.cloudinary.com/v1_1/c6imkuby/image/upload",

            {

                method: "POST",
                body: formData

            }

        );

        const data = await response.json();

        if (!data.secure_url) {

            status.style.color = "red";
            status.innerHTML = "Image upload failed.";

            return;

        }

        await addDoc(collection(db, "alumni"), {

            photo: data.secure_url,
            name: alumniName.value,
            batch: alumniBatch.value,
            profession: alumniProfession.value,
            email: alumniEmail.value,
            createdAt: new Date()

        });

        status.style.color = "green";
        status.innerHTML = "✅ Alumni added successfully.";

        alumniPhoto.value = "";
        alumniName.value = "";
        alumniBatch.value = "";
        alumniProfession.value = "";
        alumniEmail.value = "";

        document.getElementById("previewImage").style.display = "none";

    }

    catch (error) {

        console.error(error);

        status.style.color = "red";
        status.innerHTML = "Upload failed.";

    }

});