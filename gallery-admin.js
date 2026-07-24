import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadBtn");
const imageFile = document.getElementById("imageFile");
const status = document.getElementById("status");
const galleryList = document.getElementById("galleryList");

uploadBtn.addEventListener("click", async () => {

    const file = imageFile.files[0];

    if (!file) {

        status.style.color = "red";
        status.innerHTML = "Please select an image.";

        return;
    }

    status.style.color = "#004080";
    status.innerHTML = "Uploading image...";

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
            status.innerHTML = "Cloudinary upload failed.";

            console.log(data);

            return;
        }

        await addDoc(collection(db, "gallery"), {

            imageUrl: data.secure_url,
            createdAt: new Date()

        });

        status.style.color = "green";
        status.innerHTML = "✅ Image uploaded successfully.";

        imageFile.value = "";

        document.getElementById("previewImage").style.display = "none";

    } catch (error) {

        console.error(error);

        status.style.color = "red";
        status.innerHTML = "Upload failed.";

    }

});
async function loadGallery() {

    if (!galleryList) return;

    galleryList.innerHTML = "";

    const q = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((item) => {

        const image = item.data();

        galleryList.innerHTML += `
        <div class="gallery-card">

            <img src="${image.imageUrl}" alt="Gallery Image">

            <button class="deleteBtn" data-id="${item.id}">
                🗑 Delete
            </button>

        </div>
        `;

    });

}

loadGallery();

galleryList?.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    if (!confirm("Delete this image?")) return;

    await deleteDoc(doc(db, "gallery", e.target.dataset.id));

    loadGallery();

});