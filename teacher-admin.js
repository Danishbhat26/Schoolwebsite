import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadBtn");

const teacherPhoto = document.getElementById("teacherPhoto");
const teacherName = document.getElementById("teacherName");
const teacherQualification = document.getElementById("teacherQualification");
const teacherSubject = document.getElementById("teacherSubject");
const teacherDepartment = document.getElementById("teacherDepartment");

const status = document.getElementById("status");

uploadBtn.addEventListener("click", async () => {

    const file = teacherPhoto.files[0];

    if (!file) {
        status.style.color = "red";
        status.innerHTML = "Please select a teacher photo.";
        return;
    }

    if (
    teacherName.value.trim() === "" ||
    teacherQualification.value.trim() === "" ||
    teacherSubject.value.trim() === "" ||
    teacherDepartment.value === ""
) {
        status.style.color = "red";
        status.innerHTML = "Please fill all fields.";
        return;
    }

    status.style.color = "#004080";
    status.innerHTML = "Uploading teacher...";

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

        await addDoc(collection(db, "teachers"), {

    photo: data.secure_url,
    name: teacherName.value,
    qualification: teacherQualification.value,
    subject: teacherSubject.value,
    department: teacherDepartment.value,
    createdAt: new Date()

});

        status.style.color = "green";
        status.innerHTML = "✅ Teacher added successfully.";

        teacherPhoto.value = "";
        teacherName.value = "";
        teacherQualification.value = "";
        teacherSubject.value = "";
        teacherDepartment.value = "";

        document.getElementById("previewImage").style.display = "none";

    }
    catch (error) {

        console.error(error);

        status.style.color = "red";
        status.innerHTML = "Upload failed.";

    }

});