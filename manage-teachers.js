import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const teacherList = document.getElementById("teacherList");

async function loadTeachers() {

    teacherList.innerHTML = "";

    const q = query(
        collection(db, "teachers"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((teacherDoc) => {

        const teacher = teacherDoc.data();

        teacherList.innerHTML += `

        <div class="teacher-card">

            <img src="${teacher.photo}" alt="Teacher">

            <h3>${teacher.name}</h3>

            <p><b>Qualification:</b> ${teacher.qualification}</p>

            <p><b>Subject:</b> ${teacher.subject}</p>

            <p><b>Department:</b> ${teacher.department}</p>

            <button class="deleteBtn"
                data-id="${teacherDoc.id}">
                🗑 Delete Teacher
            </button>

        </div>

        `;

    });

}

loadTeachers();

teacherList.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("deleteBtn")) return;

    if (!confirm("Delete this teacher?")) return;

    try {

        await deleteDoc(
            doc(db, "teachers", e.target.dataset.id)
        );

        alert("Teacher deleted successfully.");

        loadTeachers();

    }
    catch (error) {

        console.error(error);

        alert("Delete failed.");

    }

});