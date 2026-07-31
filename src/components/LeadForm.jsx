import { useState } from 'react';
import { formatPhone, isValidPhone } from '../lib/phoneMask.js';

const INITIAL = {
  name: '',
  phone: '',
  email: '',
  comment: '',
};

export function LeadForm({ texts, recommendation, onSubmit, isSubmitting }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = texts.errors.name;
    if (!isValidPhone(form.phone)) nextErrors.phone = texts.errors.phone;

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      phone: form.phone,
      email: form.email.trim(),
      comment: form.comment.trim(),
    });
  };

  return (
    <section className="screen screen--lead" aria-labelledby="lead-title">
      <h2 id="lead-title" className="screen__title">
        {texts.title}
      </h2>
      <p className="screen__subtitle">{texts.description}</p>

      <div className="recommendation" role="status">
        <p className="recommendation__prefix">{texts.recommendationPrefix}</p>
        <p className="recommendation__title">{recommendation.title}</p>
        <p className="recommendation__desc">{recommendation.description}</p>
      </div>

      <p className="lead-prompt">{texts.prompt}</p>

      <form className="lead-form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span className="field__label">{texts.fields.name}</span>
          <input
            className={`field__input${errors.name ? ' is-invalid' : ''}`}
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="field__error" role="alert">
              {errors.name}
            </span>
          )}
        </label>

        <label className="field">
          <span className="field__label">{texts.fields.phone}</span>
          <input
            className={`field__input${errors.phone ? ' is-invalid' : ''}`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={form.phone}
            onChange={(e) => updateField('phone', formatPhone(e.target.value))}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span id="phone-error" className="field__error" role="alert">
              {errors.phone}
            </span>
          )}
        </label>

        <label className="field">
          <span className="field__label">{texts.fields.email}</span>
          <input
            className="field__input"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </label>

        <label className="field">
          <span className="field__label">{texts.fields.comment}</span>
          <textarea
            className="field__input field__input--area"
            name="comment"
            rows={3}
            value={form.comment}
            onChange={(e) => updateField('comment', e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={isSubmitting}
        >
          {isSubmitting ? texts.submitting : texts.submit}
        </button>

        <p className="privacy">{texts.privacy}</p>
      </form>
    </section>
  );
}
