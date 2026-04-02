/**
 * ============================================================
 * CONTACT FORM
 * POSTs JSON to your .NET Minimal API.
 * ============================================================
 */
const API_URL =
  window.CONTACT_API_URL ||
  'https://sebban-web-app-resume-fhczdcepaed3dehj.westeurope-01.azurewebsites.net/api/contact';
const PUBLIC_EMAIL_CHAR_CODES = [
  115, 101, 98, 97, 115, 116, 105, 97, 110, 119, 97, 108, 108, 100, 101, 110, 57, 54,
  64, 103, 109, 97, 105, 108, 46, 99, 111, 109,
];

function getPublicEmailAddress() {
  return String.fromCharCode(...PUBLIC_EMAIL_CHAR_CODES);
}

function initializeDirectEmail() {
  const revealButton = document.getElementById('contact-email-reveal');
  const output = document.getElementById('contact-email-output');
  const copyButton = document.getElementById('contact-email-copy');

  if (!revealButton || !output || !copyButton) return;
  if (revealButton.dataset.bound === '1') return;
  revealButton.dataset.bound = '1';

  const revealEmail = () => {
    const email = getPublicEmailAddress();
    const link = document.createElement('a');
    link.href = `mailto:${email}`;
    link.textContent = email;

    output.replaceChildren(link);
    output.hidden = false;
    revealButton.hidden = true;
    revealButton.setAttribute('aria-expanded', 'true');
    copyButton.hidden = false;
  };

  revealButton.addEventListener('click', revealEmail);

  copyButton.addEventListener('click', async () => {
    const email = getPublicEmailAddress();
    const originalLabel = copyButton.textContent;

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = 'Copied';
      window.setTimeout(() => {
        copyButton.textContent = originalLabel;
      }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

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
      website: form.website.value.trim(),
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
      status.textContent = 'Message sent. Thanks for reaching out.';
      form.reset();
      form.classList.remove('was-validated');
    } catch (error) {
      status.classList.add('error');
      status.classList.remove('success');
      const isNetworkError = error instanceof TypeError;
      status.textContent = isNetworkError
        ? 'The contact service is unavailable right now. Please try again later or email me directly.'
        : error.message || 'Something went wrong. Please email me directly.';
      console.error('Form submission error:', error);
      if (isNetworkError) {
        console.error('Contact API URL:', API_URL);
      }
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="bi bi-send ms-2" aria-hidden="true"></i>';
    }
  });
}

// Initialize after components are loaded
document.addEventListener('componentsLoaded', () => {
  initializeContactForm();
  initializeDirectEmail();
});
// Fallback if page is already loaded
initializeContactForm();
initializeDirectEmail();
