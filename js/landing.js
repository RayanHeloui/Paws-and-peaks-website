<script>
  // Ensure Firestore is initialized
  const db = firebase.firestore();

  document.getElementById('subscribe-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    const thankYou = document.getElementById('thank-you-message');

    // ✅ Save to Firestore
    db.collection('subscribers').add({
      name: name,
      email: email,
      subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      form.style.display = 'none';
      if (thankYou) thankYou.style.display = 'block';
    })
    .catch((error) => {
      console.error("Firestore error:", error);
      alert("Something went wrong. Try again.");
    });
  });
</script>
