/**
 * ============================================================
 * CONTACT FORM
 * POSTs JSON to your .NET Minimal API.
 * TODO: Replace API_URL with your deployed Azure endpoint.
 * ============================================================
 */

const API_URL = 'http://localhost:5094/api/contact'//'https://YOUR_API.azurewebsites.net/api/contact'; // <-- TODO: change this

function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Bootstrap native validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Server error');

      status.classList.add('success');
      status.classList.remove('error');
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      form.reset();
      form.classList.remove('was-validated');

    } catch (error) {
      status.classList.add('error');
      status.classList.remove('success');
      status.textContent = 'Something went wrong. Please email me directly.';
      console.error('Form submission error:', error);
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="bi bi-send ms-2" aria-hidden="true"></i>';
    }
  });
}

// Initialize after components are loaded
document.addEventListener('componentsLoaded', initializeContactForm);
// Fallback for DOMContentLoaded if page is already loaded
initializeContactForm();
