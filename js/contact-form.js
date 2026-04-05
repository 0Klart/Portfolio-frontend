/**
 * ============================================================
 * CONTACT FORM
 * POSTs JSON to your .NET Minimal API.
 * ============================================================
 */
const API_URL =
  window.CONTACT_API_URL ||
  'https://sebban-web-app-resume-fhczdcepaed3dehj.westeurope-01.azurewebsites.net/api/contact';

const CONTACT_FIELD_ERROR_KEYS = {
  name: 'contact.form.errors.name',
  email: 'contact.form.errors.emailValid',
  subject: 'contact.form.errors.subject',
  message: 'contact.form.errors.message',
};

function translateContact(key, variables) {
  return window.PortfolioPreferences?.t(key, variables) || key;
}

function getContactFieldErrorKey(fieldName) {
  const normalizedFieldName = String(fieldName || '').toLowerCase();
  return CONTACT_FIELD_ERROR_KEYS[normalizedFieldName] || null;
}

function getNetworkErrorKey(apiUrl) {
  try {
    const pageOrigin = window.location.origin;
    const apiOrigin = new URL(apiUrl, window.location.href).origin;

    if (apiOrigin !== pageOrigin) {
      return 'contact.form.status.corsError';
    }
  } catch {
    // Fall back to the generic network message if the URL cannot be parsed.
  }

  return 'contact.form.status.networkError';
}

function setSubmitButtonLabel(button, translationKey) {
  const label = button?.querySelector('[data-contact-submit-label]');
  if (label) {
    label.textContent = translateContact(translationKey);
  }
}

function setStatusMessage(statusElement, type, translationKey, variables = {}) {
  statusElement.classList.remove('success', 'error');

  if (!translationKey) {
    statusElement.textContent = '';
    delete statusElement.dataset.i18nKey;
    delete statusElement.dataset.i18nVars;
    return;
  }

  if (type) {
    statusElement.classList.add(type);
  }

  statusElement.dataset.i18nKey = translationKey;
  statusElement.dataset.i18nVars = JSON.stringify(variables);
  statusElement.textContent = translateContact(translationKey, variables);
}

function refreshLocalizedContactUi() {
  const button = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');

  if (button) {
    setSubmitButtonLabel(button, button.disabled ? 'contact.form.sending' : 'contact.form.submit');
  }

  if (status?.dataset.i18nKey) {
    let variables = {};

    try {
      variables = status.dataset.i18nVars ? JSON.parse(status.dataset.i18nVars) : {};
    } catch {
      variables = {};
    }

    status.textContent = translateContact(status.dataset.i18nKey, variables);
  }
}

function resolveRequestErrorKey(responseStatus, responseBody) {
  if (responseBody?.errors && typeof responseBody.errors === 'object') {
    const firstField = Object.keys(responseBody.errors)[0];
    const fieldErrorKey = getContactFieldErrorKey(firstField);
    if (fieldErrorKey) {
      return { key: fieldErrorKey, variables: {} };
    }
  }

  if (responseStatus === 429) {
    return { key: 'contact.form.status.rateLimited', variables: {} };
  }

  if (responseStatus >= 500) {
    return { key: 'contact.form.status.serverError', variables: {} };
  }

  return {
    key: 'contact.form.status.requestFailed',
    variables: { status: responseStatus },
  };
}

function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const button = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');
  const fields = form ? [...form.querySelectorAll('.form-control')] : [];

  if (!form || !button || !status) return;
  if (form.dataset.bound === '1') {
    refreshLocalizedContactUi();
    return;
  }

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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatusMessage(status, '', null);

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      const firstInvalidField = fields.find((field) => syncFieldValidity(field));
      firstInvalidField?.focus();
      return;
    }

    button.disabled = true;
    setSubmitButtonLabel(button, 'contact.form.sending');
    form.setAttribute('aria-busy', 'true');
    resetFieldValidity();

    const payload = {
      name: form.elements.namedItem('name').value.trim(),
      email: form.elements.namedItem('email').value.trim(),
      subject: form.elements.namedItem('subject').value.trim(),
      message: form.elements.namedItem('message').value.trim(),
      website: form.elements.namedItem('website').value.trim(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let responseBody = null;

        try {
          responseBody = await response.json();
          console.error('Contact API error response:', responseBody);
        } catch {
          responseBody = null;
        }

        const { key, variables } = resolveRequestErrorKey(response.status, responseBody);
        throw new Error(JSON.stringify({ key, variables }));
      }

      setStatusMessage(status, 'success', 'contact.form.status.success');
      form.reset();
      form.classList.remove('was-validated');
      resetFieldValidity();
    } catch (error) {
      const isNetworkError = error instanceof TypeError;

      if (isNetworkError) {
        setStatusMessage(status, 'error', getNetworkErrorKey(API_URL));
        console.error('Contact API URL:', API_URL);
        console.error(
          'If DevTools shows a CORS error or preflightMissingAllowOriginHeader, the browser blocked the request before the API could handle it.'
        );
      } else {
        let parsedError = null;

        try {
          parsedError = JSON.parse(error.message);
        } catch {
          parsedError = null;
        }

        if (parsedError?.key) {
          setStatusMessage(status, 'error', parsedError.key, parsedError.variables || {});
        } else {
          setStatusMessage(status, 'error', 'contact.form.status.generic');
        }
      }

      console.error('Form submission error:', error);
    } finally {
      form.removeAttribute('aria-busy');
      button.disabled = false;
      setSubmitButtonLabel(button, 'contact.form.submit');
    }
  });

  refreshLocalizedContactUi();
}

document.addEventListener('componentsLoaded', initializeContactForm);
window.addEventListener('portfolio:localechange', refreshLocalizedContactUi);
initializeContactForm();
