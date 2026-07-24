import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const downloadsContainer = document.getElementById("downloadsContainer");

async function loadDownloads() {

    downloadsContainer.innerHTML = "";

    try {

        const q = query(
            collection(db, "downloads"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            downloadsContainer.innerHTML = `
                <h2 style="text-align:center;color:#666;">
                    No Documents Available
                </h2>
            `;

            return;
        }

        snapshot.forEach((doc) => {

            const download = doc.data();

            downloadsContainer.innerHTML += `

                <div class="download-card">

                    <h3>📄 ${download.title}</h3>

                    <p><strong>Category:</strong> ${download.category}</p>

                    <p>${download.description || ""}</p>

                    <a
                        href="${download.pdfUrl}"
                        target="_blank"
                        class="downloadBtn">

                        📥 Download PDF

                    </a>

                </div>

            `;

        });

    }

    catch(error){

        console.error(error);

        downloadsContainer.innerHTML = `
            <h2 style="color:red;text-align:center;">
                Failed to load documents.
            </h2>
        `;

    }

}

loadDownloads();