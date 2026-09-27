// Accessible form handling for every form marked with data-form.
//
// - Checks required fields and email/phone formats when the form is sent.
// - Shows each error next to its field (linked with aria-describedby) and
//   an error summary at the top, which receives focus.
// - On success, shows the thank-you message and announces it to screen readers.
// - If the form has no data-endpoint yet (before Phase 3), nothing is sent and
//   a "preview only" note is shown instead.

type Check = { field: HTMLInputElement | HTMLTextAreaElement; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function labelText(field: HTMLElement): string {
  const label = document.querySelector<HTMLLabelElement>(`label[for="${field.id}"]`);
  return label?.dataset.name ?? label?.textContent?.trim() ?? field.id;
}

function validate(form: HTMLFormElement): Check[] {
  const errors: Check[] = [];
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[data-check], textarea[data-check]'
  );
  for (const field of fields) {
    const value = field.value.trim();
    const name = labelText(field).toLowerCase();
    if (field.required && !value) {
      errors.push({ field, message: field.dataset.requiredMessage ?? `Please enter your ${name}.` });
    } else if (value && field.type === 'email' && !EMAIL.test(value)) {
      errors.push({
        field,
        message: 'Please enter an email address in the format name@example.com.',
      });
    } else if (value && field.type === 'tel' && value.replace(/\D/g, '').length < 10) {
      errors.push({
        field,
        message: 'Please enter a phone number with the area code, like (248) 555-0123.',
      });
    }
  }
  return errors;
}

function setFieldError(field: HTMLElement, message: string | null) {
  const errorId = `${field.id}-error`;
  let error = document.getElementById(errorId);
  const described = (field.getAttribute('aria-describedby') ?? '')
    .split(' ')
    .filter((id) => id && id !== errorId);

  if (message) {
    if (!error) {
      error = document.createElement('p');
      error.id = errorId;
      error.className = 'error';
      field.insertAdjacentElement('beforebegin', error);
    }
    error.innerHTML = `<span class="visually-hidden">Error: </span>${message}`;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', [...described, errorId].join(' '));
  } else {
    error?.remove();
    field.removeAttribute('aria-invalid');
    if (described.length) field.setAttribute('aria-describedby', described.join(' '));
    else field.removeAttribute('aria-describedby');
  }
}

function showSummary(form: HTMLFormElement, errors: Check[]) {
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  if (!summary) return;
  const list = summary.querySelector('ul')!;
  const heading = summary.querySelector('[data-error-count]')!;
  heading.textContent =
    errors.length === 1
      ? 'There is 1 problem with this form'
      : `There are ${errors.length} problems with this form`;
  list.innerHTML = '';
  for (const { field, message } of errors) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${field.id}`;
    a.textContent = message;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      field.focus();
    });
    li.append(a);
    list.append(li);
  }
  summary.hidden = false;
  summary.focus();
}

function showStatus(form: HTMLFormElement, message: string, kind: 'success' | 'notice' | 'error') {
  const status = document.getElementById(form.dataset.status ?? '');
  if (!status) return;
  status.className = `form-status form-status--${kind}`;
  status.innerHTML = message;
  status.hidden = false;
  if (kind === 'success') {
    form.hidden = true;
    status.focus();
  }
}

async function onSubmit(event: SubmitEvent) {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');

  const errors = validate(form);
  form
    .querySelectorAll<HTMLElement>('[data-check]')
    .forEach((f) => setFieldError(f, errors.find((e) => e.field === f)?.message ?? null));

  if (errors.length) {
    showSummary(form, errors);
    return;
  }
  if (summary) summary.hidden = true;

  const success = form.dataset.success ?? 'Thank you.';
  const endpoint = form.dataset.endpoint;

  if (!endpoint) {
    showStatus(
      form,
      `<strong>Preview only: nothing was sent.</strong> This form will be connected in the next build phase. On the live site you would now see: “${success}”`,
      'notice'
    );
    return;
  }

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (button) button.disabled = true;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    if (!res.ok) throw new Error(String(res.status));
    showStatus(form, `<strong>${success}</strong>`, 'success');
  } catch {
    showStatus(form, form.dataset.failure ?? 'Sorry, something went wrong. Please try again.', 'error');
  } finally {
    if (button) button.disabled = false;
  }
}

document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  form.noValidate = true;
  form.addEventListener('submit', onSubmit);
});
