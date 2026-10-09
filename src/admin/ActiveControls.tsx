// Estado "ativo no site" e botão para mostrar/retirar, iguais em todas as listas do admin.
export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-block whitespace-nowrap text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${active ? 'bg-[#e9f5d8] text-[#3f6b0f]' : 'bg-gray-100 text-gray-500'}`}>
      {active ? 'Ativo — visível no site' : 'Inativo — escondido do site'}
    </span>
  )
}

export function ToggleButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border whitespace-nowrap transition-colors ${active ? 'border-gray-200 text-gray-600 hover:bg-gray-50' : 'border-[#7ab929] text-[#3f6b0f] hover:bg-[#f2f9e6]'}`}
    >
      {active ? 'Retirar do site' : 'Mostrar no site'}
    </button>
  )
}
