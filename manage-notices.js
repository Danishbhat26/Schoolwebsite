import { db } from "./firebase-config.js";

import {

collection,
getDocs,
deleteDoc,
doc,
query,
orderBy

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const noticeList=document.getElementById("noticeList");

async function loadNotices(){

noticeList.innerHTML="";

const q=query(collection(db,"notices"),orderBy("createdAt","desc"));

const snapshot=await getDocs(q);

snapshot.forEach((document)=>{

const notice=document.data();

const id=document.id;

const date=new Intl.DateTimeFormat("en-GB",{

day:"2-digit",

month:"2-digit",

year:"numeric"

}).format(notice.createdAt.toDate());

noticeList.innerHTML+=`

<div class="notice-card">

<h3>${notice.title}</h3>

<small>${date}</small>

<p>${notice.details}</p>

<button class="deleteBtn" onclick="deleteNotice('${id}')">

🗑 Delete

</button>

</div>

`;

});

}

window.deleteNotice=async function(id){

const confirmDelete=confirm("Delete this notice?");

if(!confirmDelete) return;

await deleteDoc(doc(db,"notices",id));

loadNotices();

}

loadNotices();