import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const downloadsList = document.getElementById("downloadsList");

/* Convert Google Drive Share Link to Direct Download Link */

function convertGoogleDrive(url) {

    if (!url) return "#";

    // If already direct link
    if (url.includes("uc?export=download")) {
        return url;
    }

    // Share Link
    const match = url.match(/\/d\/([^\/]+)/);

    if (match) {

        return `https://drive.google.com/uc?export=download&id=${match[1]}`;

    }

    return url;

}

async function loadDownloads() {

    downloadsList.innerHTML = "";

    try {

        const q = query(
            collection(db, "downloads"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            downloadsList.innerHTML = `
                <h3>No documents available.</h3>
            `;

            return;

        }

        snapshot.forEach((downloadDoc) => {

            const download = downloadDoc.data();

            downloadsList.innerHTML += `

            <div class="download-card">

                <h3>📄 ${download.title}</h3>

                <span class="category">
                    ${download.category}
                </span>

                <p>
                    ${download.description || "No description available."}
                </p>

                <div class="button-group">

                    <a
                        href="${convertGoogleDrive(download.pdfUrl)}"
                        target="_blank"
                        class="downloadBtn">

                        📥 Download

                    </a>

                    <button
                        class="deleteBtn"
                        data-id="${downloadDoc.id}">

                        🗑 Delete

                    </button>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        downloadsList.innerHTML = `
            <h3 style="color:red;">
                Failed to load documents.
            </h3>
        `;

    }

}

loadDownloads();

/* Delete Document */

downloadsList.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    const confirmDelete = confirm(
        "Delete this document?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(db, "downloads", e.target.dataset.id)
        );

        alert("Document deleted successfully.");

        loadDownloads();

    }

    catch (error) {

        console.error(error);

        alert("Delete failed.");

    }

});