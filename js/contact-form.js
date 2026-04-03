/**
 * ============================================================
 * CONTACT FORM
 * POSTs JSON to your .NET Minimal API.
 * ============================================================
 */
const API_URL =
  window.CONTACT_API_URL ||
  'https://sebban-web-app-resume-fhczdcepaed3dehj.westeurope-01.azurewebsites.net/api/contact';

function buildNetworkErrorMessage(apiUrl) {
  try {
    const pageOrigin = window.location.origin;
    const apiOrigin = new URL(apiUrl, window.location.href).origin;

    if (apiOrigin !== pageOrigin) {
      return 'The browser blocked the request before it reached the contact service. This is usually a cross-origin (CORS) configuration issue between this site and the API.';
    }
  } catch {
    // Fall back to the generic message if the URL cannot be parsed.
  }

  return 'The contact service could not be reached right now. Please try again later or reach out on LinkedIn.';
}

function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');
  const fields = form ? [...form.querySelectorAll('.form-control')] : [];

  if (!form || !btn || !status) return;
  if (form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  function syncFieldValidity(field) {
    const invalid = !field.checkValidity();
    field.classList.toggle('is-invalid', invalid);
    field.toggleAttribute('aria-invalid', invalid);
    return invalid;
  }

  function resetFieldValidity() {
    fields.forEach((field) => {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
    });
  }

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (form.classList.contains('was-validated') || field.classList.contains('is-invalid')) {
        syncFieldValidity(field);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.classList.remove('success', 'error');
    status.textContent = '';

    // Bootstrap native validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      const firstInvalidField = fields.find((field) => syncFieldValidity(field));
      firstInvalidField?.focus();
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    form.setAttribute('aria-busy', 'true');
    resetFieldValidity();

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
      resetFieldValidity();
    } catch (error) {
      status.classList.add('error');
      status.classList.remove('success');
      const isNetworkError = error instanceof TypeError;
      status.textContent = isNetworkError
        ? buildNetworkErrorMessage(API_URL)
        : error.message || 'Something went wrong. Please try again later or reach out on LinkedIn.';
      console.error('Form submission error:', error);
      if (isNetworkError) {
        console.error('Contact API URL:', API_URL);
        console.error(
          'If DevTools shows a CORS error or preflightMissingAllowOriginHeader, the browser blocked the request before the API could handle it.'
        );
      }
    } finally {
      form.removeAttribute('aria-busy');
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="bi bi-send ms-2" aria-hidden="true"></i>';
    }
  });
}

// Initialize after components are loaded
document.addEventListener('componentsLoaded', initializeContactForm);
// Fallback if page is already loaded
initializeContactForm();
