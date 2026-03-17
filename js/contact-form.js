/**
 * ============================================================
 * CONTACT FORM
 * POSTs JSON to your .NET Minimal API.
 * ============================================================
 */
//https://sebban-web-app-resume.azurewebsites.net/api/contact
const API_URL = window.CONTACT_API_URL || 'https://sebban-web-app-resume.azurewebsites.net/api/contact'//'http://localhost:5276/api/contact'; // override with global for deployed envs

function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');

  if (!form || !btn || !status) return;
  if (form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Bootstrap native validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';
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

      if (!res.ok) {
        let errorMessage = `Request failed (${res.status})`;
        try {
          const body = await res.json();
          if (body?.errors && typeof body.errors === 'object') {
            const firstField = Object.keys(body.errors)[0];
            const firstError = firstField ? body.errors[firstField]?.[0] : null;
            if (firstError) errorMessage = firstError;
          } else if (body?.title) {
            errorMessage = body.title;
          } else if (body?.message) {
            errorMessage = body.message;
          }
          console.error('Contact API error response:', body);
        } catch {
          // Ignore JSON parse errors and keep fallback message
        }
        throw new Error(errorMessage);
      }

      status.classList.add('success');
      status.classList.remove('error');
      status.textContent = "Message sent! I'll get back to you soon.";
      form.reset();
      form.classList.remove('was-validated');
    } catch (error) {
      status.classList.add('error');
      status.classList.remove('success');
      status.textContent = error.message || 'Something went wrong. Please email me directly.';
      console.error('Form submission error:', error);
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="bi bi-send ms-2" aria-hidden="true"></i>';
    }
  });
}

// Initialize after components are loaded
document.addEventListener('componentsLoaded', initializeContactForm);
// Fallback if page is already loaded
initializeContactForm();
