import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    doc,
    deleteDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const grievanceContainer = document.getElementById("grievanceContainer");

async function loadGrievances() {

    grievanceContainer.innerHTML = "";

    try {

        const q = query(
            collection(db, "grievances"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            grievanceContainer.innerHTML = `
                <h2 style="text-align:center;color:#666;">
                    No Grievances Found
                </h2>
            `;

            return;

        }

        snapshot.forEach((document) => {

            const grievance = document.data();

            grievanceContainer.innerHTML += `

            <div class="card">

                <h3>${grievance.subject}</h3>

                <p><strong>Name:</strong> ${grievance.name}</p>

                <p><strong>Email:</strong> ${grievance.email}</p>

                <p><strong>Mobile:</strong> ${grievance.mobile}</p>

                <p><strong>Message:</strong><br>${grievance.message}</p>

                <p>

                <strong>Status:</strong>

                <span id="status-${document.id}">

                ${grievance.status}

                </span>

                </p>

                <button
                class="resolveBtn"
                onclick="resolveGrievance('${document.id}')">

                Mark Resolved

                </button>

                <button
                class="deleteBtn"
                onclick="deleteGrievance('${document.id}')">

                Delete

                </button>

            </div>

            `;

        });

    }

    catch(error){

        console.error(error);

        grievanceContainer.innerHTML = "Failed to load grievances.";

    }

}

window.resolveGrievance = async function(id){

    try{

        await updateDoc(doc(db,"grievances",id),{

            status:"Resolved"

        });

        document.getElementById("status-"+id).innerHTML="Resolved";

    }

    catch(error){

        alert("Failed to update.");

    }

}

window.deleteGrievance = async function(id){

    if(confirm("Delete this grievance?")){

        await deleteDoc(doc(db,"grievances",id));

        loadGrievances();

    }

}
onAuthStateChanged(auth, (user) => {

    if (user) {

        loadGrievances();

    } else {

        window.location.href = "alumni-login.html";

    }

});