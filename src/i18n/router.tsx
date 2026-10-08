/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react'
import {
  Link as RouterLink, NavLink as RouterNavLink, Navigate as RouterNavigate,
  useNavigate as useRouterNavigate, useLocation, type LinkProps, type NavLinkProps, type NavigateOptions, type NavigateProps, type To,
} from 'react-router-dom'
import { useI18n } from '@/i18n'
import { localizePath, stripLangPrefix } from './routing'

// Ligações internas que respeitam a língua do endereço: `to="/produtos"` vira `/en/produtos` em inglês.
// Usar estas em vez das do react-router-dom em todo o site público.

function useLocalize() {
  const { lang } = useI18n()
  return (to: To): To => {
    if (typeof to === 'string') return localizePath(to, lang)
    return to.pathname ? { ...to, pathname: localizePath(to.pathname, lang) } : to
  }
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  const localize = useLocalize()
  return <RouterLink ref={ref} to={localize(to)} {...rest} />
})

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ to, ...rest }, ref) {
  const localize = useLocalize()
  return <RouterNavLink ref={ref} to={localize(to)} {...rest} />
})

export function Navigate({ to, ...rest }: NavigateProps) {
  const localize = useLocalize()
  return <RouterNavigate to={localize(to)} {...rest} />
}

export function useNavigate() {
  const navigate = useRouterNavigate()
  const localize = useLocalize()
  return (to: To | number, options?: NavigateOptions) =>
    typeof to === 'number' ? navigate(to) : navigate(localize(to), options)
}

/** Endereço atual sem o prefixo de língua (`/en/produtos` → `/produtos`), para lógica de menus. */
export function usePathname() {
  const { pathname } = useLocation()
  return stripLangPrefix(pathname)
}

/** Para ligações a escrever à mão (`<a href>`): põe o prefixo da língua atual. */
export function useLocalizedHref() {
  const { lang } = useI18n()
  return (to: string) => localizePath(to, lang)
}
