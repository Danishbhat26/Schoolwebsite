import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const alumniContainer = document.getElementById("alumniContainer");

async function loadAlumni() {

    alumniContainer.innerHTML = "";

    try {

        const q = query(
            collection(db, "alumni"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            alumniContainer.innerHTML = `

                <div style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:40px;
                    font-size:22px;
                    color:#666;
                ">

                    No Alumni Available Yet.

                </div>

            `;

            return;

        }

        snapshot.forEach((doc) => {

            const alumni = doc.data();

            alumniContainer.innerHTML += `

                <div class="alumni-card">

                    <img
    loading="lazy"
    src="${alumni.photo}"
    alt="${alumni.name}"
>

                    <div class="alumni-info">

                        <h3>${alumni.name}</h3>

                        <p>
                            <strong>Batch:</strong>
                            ${alumni.batch}
                        </p>

                        <p>
                            <strong>Profession:</strong>
                            ${alumni.profession}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${alumni.email}
                        </p>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alumniContainer.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                color:red;
                padding:40px;
                font-size:22px;
            ">

                Failed to Load Alumni.

            </div>

        `;

    }

}

loadAlumni();