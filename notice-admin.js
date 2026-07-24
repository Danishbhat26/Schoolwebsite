import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveNotice");

saveBtn.addEventListener("click", async () => {

    const title = document.getElementById("noticeTitle").value;

    const details = document.getElementById("noticeDetails").value;

    const status = document.getElementById("status");

    if(title==="" || details===""){

        status.style.color="red";

        status.innerHTML="Please fill all fields.";

        return;

    }

    try{

        await addDoc(collection(db,"notices"),{

            title:title,

            details:details,

            createdAt:new Date()

        });

        status.style.color="green";

        status.innerHTML="✅ Notice Saved Successfully.";

        document.getElementById("noticeTitle").value="";

        document.getElementById("noticeDetails").value="";

    }

    catch(error){

        status.style.color="red";

        status.innerHTML=error.message;

    }

});