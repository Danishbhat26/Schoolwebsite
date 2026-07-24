import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const alumniList = document.getElementById("alumniList");

async function loadAlumni() {

    alumniList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "alumni"));

    snapshot.forEach((alumniDoc) => {

        const alumni = alumniDoc.data();

        alumniList.innerHTML += `

        <div class="alumni-card">

            <img src="${alumni.photo}" alt="${alumni.name}">

            <h3>${alumni.name}</h3>

            <p><b>Batch:</b> ${alumni.batch}</p>

            <p><b>Profession:</b> ${alumni.profession}</p>

            <a href="mailto:${alumni.email}" class="emailBtn">
                ✉ Contact
            </a>

            <button
                class="deleteBtn"
                data-id="${alumniDoc.id}">
                🗑 Delete Alumni
            </button>

        </div>

        `;

    });

}

loadAlumni();

alumniList.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    const confirmDelete = confirm("Delete this alumni?");

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(db, "alumni", e.target.dataset.id)
        );

        alert("Alumni deleted successfully.");

        loadAlumni();

    }

    catch (error) {

        console.error(error);

        alert("Delete failed.");

    }

});