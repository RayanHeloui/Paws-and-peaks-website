// Initialize Firestore (make sure firebase has already been initialized in your HTML)
const db = firebase.firestore();

document.getElementById('subscribe-form').addEventListener('submit', async function (e) {
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

  const thankYou = document.getElementById('thank-you-box');

  if (!thankYou) {
    console.error("❌ Could not find #thank-you-box in the DOM.");
    return;
  }

  try {
    // ✅ Save subscriber to Firestore
    await db.collection('subscribers').add({
      name: name,
      email: email,
      subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // ✅ Trigger welcome email via Resend API
    const response = await fetch('/api/send-welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Resend email error:", result);
      alert("You're subscribed, but the welcome email couldn't be sent.");
    } else {
      console.log("✅ Welcome email sent to:", email);
    }

    // ✅ Show thank-you message
    form.style.display = 'none';
    thankYou.style.display = 'flex';
  } catch (error) {
    console.error("🔥 Submission error:", error);
    alert("Something went wrong. Please try again.");
  }
});
