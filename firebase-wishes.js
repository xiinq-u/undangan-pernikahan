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
