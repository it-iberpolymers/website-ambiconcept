import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">

      <div className="bg-[#303f49] pt-[100px] pb-[50px]">
        <div className="max-w-[1140px] mx-auto px-5">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7ab929] mb-3">Legal</p>
          <h1 className="text-[36px] md:text-[45px] font-semibold uppercase text-white leading-tight">
            Política de Privacidade
          </h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 py-[60px]">
        <div className="space-y-8 text-[#303f49]">

          <section>
            <h2 className="text-[18px] font-semibold uppercase text-[#303f49] mb-3">1. Responsável pelo Tratamento</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              A <strong>AMBICONCEPT – Waste Solutions</strong>, empresa do Grupo Iberpolymers, é responsável pelo tratamento dos dados pessoais recolhidos através deste website, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold uppercase text-[#303f49] mb-3">2. Dados Recolhidos</h2>
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
            <h2 className="text-[18px] font-semibold uppercase text-[#303f49] mb-3">3. Finalidade do Tratamento</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Os dados são tratados exclusivamente para responder às solicitações de informação e orçamento enviadas pelos utilizadores, e para manter comunicação comercial relacionada com os nossos produtos e serviços.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold uppercase text-[#303f49] mb-3">4. Conservação dos Dados</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Os dados pessoais são conservados pelo período estritamente necessário para cumprir as finalidades descritas, sendo eliminados quando a relação comercial ou de interesse terminar, salvo obrigação legal em contrário.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold uppercase text-[#303f49] mb-3">5. Direitos dos Titulares</h2>
            <p className="leading-relaxed text-[#303f49]/75">
              Tem direito de acesso, retificação, apagamento, limitação e portabilidade dos seus dados, bem como o direito de se opor ao tratamento. Para exercer estes direitos, contacte-nos através do formulário em{' '}
              <Link to="/contactos" className="text-[#7ab929] hover:underline">Contactos</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold uppercase text-[#303f49] mb-3">6. Contacto</h2>
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
  )
}
