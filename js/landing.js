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

  // Save to Firebase
  firebase.database().ref('subscribers').push({
    name: name,
    email: email,
    subscribedAt: new Date().toISOString()
  })
  .then(() => {
    form.style.display = 'none';
    if (thankYou) thankYou.style.display = 'block';
  })
  .catch((error) => {
    console.error("Firebase error:", error);
    alert("Something went wrong. Try again.");
  });
});
