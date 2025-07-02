document.getElementById('email-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const emailInput = document.getElementById('email');
  const thankYou = document.getElementById('thank-you-message');

  if (emailInput.value.trim() === "") {
    alert("Please enter a valid email.");
    return;
  }

  // Optional: use fetch to submit manually
  form.submit(); // native submit

  form.style.display = 'none';
  thankYou.style.display = 'block';
});
