import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const galleryList = document.getElementById("galleryList");

async function loadGallery() {

    galleryList.innerHTML = "";

    const q = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((document) => {

        const data = document.data();

        galleryList.innerHTML += `
            <div class="gallery-card">

                <img src="${data.imageUrl}" alt="Gallery Image">

                <button class="deleteBtn"
                    data-id="${document.id}">
                    🗑 Delete
                </button>

            </div>
        `;

    });

}

loadGallery();

galleryList.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    const confirmDelete = confirm("Delete this image?");

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(db, "gallery", e.target.dataset.id)
        );

        alert("Image deleted successfully.");

        loadGallery();

    } catch (error) {

        console.error(error);

        alert("Delete failed.");

    }

});