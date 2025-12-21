
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ELEMENT
const form = document.getElementById("wishForm");
const list = document.getElementById("wishList");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// LOAD DATA REALTIME
const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  list.innerHTML = "";
  snapshot.forEach((doc) => {
    const d = doc.data();
    const div = document.createElement("div");
    div.className = "wish-item";
    div.innerHTML = `
      <h4>${d.name}</h4>
      <p>${d.message}</p>
    `;
    list.appendChild(div);
  });
});

// SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!nameInput.value || !messageInput.value) return;

  await addDoc(collection(db, "wishes"), {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
    createdAt: serverTimestamp()
  });

  form.reset();
});
