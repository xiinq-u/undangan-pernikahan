// 1. Impor fungsi-fungsi yang dibutuhkan dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Konfigurasi Firebase (Dapatkan ini dari Firebase Console -> Project Settings)
  const firebaseConfig = {
    apiKey: "AIzaSyB3IfMrJrCwO5aDrvAf0RCU90-AA9E3dwY",
    authDomain: "undangan-pernikahan0.firebaseapp.com",
    projectId: "undangan-pernikahan0",
    storageBucket: "undangan-pernikahan0.firebasestorage.app",
    messagingSenderId: "1077031359212",
    appId: "1:1077031359212:web:5b4430b4a2f56ab97a0bc9",
    measurementId: "G-CX8PYXM9BY"
  };

// 3. Inisialisasi Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("wishForm");
  const list = document.getElementById("wishList");

  if (!form || !list) {
    console.warn("❌ wishForm / wishList tidak ditemukan");
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach((doc) => {
      const d = doc.data();
      list.innerHTML += `
        <div class="wish-item">
          <h4>${d.name}</h4>
          <p>${d.message}</p>
        </div>
      `;
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "wishes"), {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
      createdAt: serverTimestamp()
    });

    form.reset();
  });

});
