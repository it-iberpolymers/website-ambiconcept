import { Link } from 'react-router-dom'
import '@/styles/page-shell.css'

export default function PrivacyPolicy() {
  return (
    <div className="ps-page">

      <div className="ps-hero">
        <div className="max-w-[800px] mx-auto px-5 relative z-[1]">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#95d855] mb-3">Legal</p>
          <h1 className="text-[34px] md:text-[48px] font-bold tracking-[-0.03em] text-white leading-tight">
            Política de Privacidade
          </h1>
        </div>
        <svg className="ps-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V28C240 -4 480 -4 720 22s480 30 720 4V60z" />
        </svg>
      </div>

      <div className="max-w-[800px] mx-auto px-5 pt-[30px] pb-[100px]">
       <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_24px_50px_-38px_rgba(14,26,16,0.4)]">
        <div className="space-y-8 text-[#303f49]">

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">1. Responsável pelo Tratamento</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              A <strong>AMBICONCEPT – Waste Solutions</strong>, empresa do Grupo Iberpolymers, é responsável pelo tratamento dos dados pessoais recolhidos através deste website, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">2. Dados Recolhidos</h2>
            <p className="leading-relaxed text-[#303f49]/75 mb-3">
              Através do formulário de contacto, recolhemos os seguintes dados:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#303f49]/75">
              <li>Nome e empresa</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone (opcional)</li>
              <li>Mensagem e assunto da comunicação</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">3. Finalidade do Tratamento</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Os dados são tratados exclusivamente para responder às solicitações de informação e orçamento enviadas pelos utilizadores, e para manter comunicação comercial relacionada com os nossos produtos e serviços.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">4. Conservação dos Dados</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Os dados pessoais são conservados pelo período estritamente necessário para cumprir as finalidades descritas, sendo eliminados quando a relação comercial ou de interesse terminar, salvo obrigação legal em contrário.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">5. Direitos dos Titulares</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Tem direito de acesso, retificação, apagamento, limitação e portabilidade dos seus dados, bem como o direito de se opor ao tratamento. Para exercer estes direitos, contacte-nos através do formulário em{' '}
              <Link to="/contactos" className="text-[#7ab929] hover:underline">Contactos</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#1c2b1f] mb-3">6. Contacto</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Para qualquer questão relacionada com a proteção de dados, pode contactar-nos através da página de{' '}
              <Link to="/contactos" className="text-[#7ab929] hover:underline">Contactos</Link>.
            </p>
          </section>

        </div>

        <div className="mt-[60px] pt-[30px] border-t border-[#eaeaea]">
          <Link
            to="/"
            className="btn-outline"
          >
            ← Voltar ao início
          </Link>
        </div>
       </div>
      </div>

    </div>
  )
}
