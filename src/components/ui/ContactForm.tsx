import { useContactForm } from '@/hooks/useContactForm'
import './ContactForm.css'

export default function ContactForm() {
  const { form, status, handleChange, handleSubmit } = useContactForm()

  if (status === 'success') {
    return (
      <div className="cf-success">
        <svg className="cf-success-icon" fill="none" viewBox="0 0 24 24" stroke="#7AB929" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="cf-success-title">Mensagem enviada!</p>
        <p className="cf-success-text">Entraremos em contacto consigo brevemente.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="cf-form">

      {status === 'error' && (
        <div role="alert" className="cf-error">
          Ocorreu um erro ao enviar a mensagem. Por favor tente novamente.
        </div>
      )}

      {/* Nome + Empresa */}
      <div className="cf-row">
        <div>
          <label htmlFor="contact-name" className="cf-label">
            Nome <span aria-hidden="true" className="cf-required">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="cf-field"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="cf-label">
            Empresa
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            className="cf-field"
          />
        </div>
      </div>

      {/* E-mail + Telefone */}
      <div className="cf-row">
        <div>
          <label htmlFor="contact-email" className="cf-label">
            E-mail <span aria-hidden="true" className="cf-required">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="cf-field"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="cf-label">
            Telefone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className="cf-field"
          />
        </div>
      </div>

      {/* Assunto */}
      <div>
        <label htmlFor="contact-subject" className="cf-label">
          Assunto <span aria-hidden="true" className="cf-required">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="cf-field"
        >
          <option value="" disabled>Selecionar assunto...</option>
          <option value="briefing">Partilhar Briefing</option>
          <option value="outros">Outros Assuntos</option>
        </select>
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="contact-message" className="cf-label">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="cf-field cf-field--textarea"
        />
      </div>

      {/* Política de privacidade */}
      <div>
        <span className="cf-privacy-label-top">
          Política de Privacidade <span aria-hidden="true" className="cf-required">*</span>
        </span>
        <div className="cf-privacy-wrap">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            checked={form.privacy}
            onChange={handleChange}
            className="cf-privacy-checkbox"
          />
          <label htmlFor="contact-privacy" className="cf-privacy-label">
            Declaro que li e aceito a{' '}
            <a href="/politica-de-privacidade" target="_blank" className="cf-privacy-link">
              Política de Privacidade
            </a>
            {' '}Ambiconcept – Waste Solutions.
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="cf-submit"
      >
        {status === 'loading' ? 'A enviar…' : 'Enviar'}
      </button>

    </form>
  )
}
