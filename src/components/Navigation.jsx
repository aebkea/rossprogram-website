import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export function Navigation({ navigation, className }) {
  let router = useRouter()

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            {section.href &&
              <h2 className={clsx("font-display font-medium",
                section.href === router.pathname && section.colorLink
                  ? "text-violet-500"
                  : "text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300")}>
                <Link href={section.href}>{section.title}</Link>
              </h2>
            }{!section.href &&
              <h2 className="font-display font-medium text-slate-900 dark:text-white">
                {section.title}
              </h2>
            }
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
            >
              {section.links.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={clsx(
                      'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                      link.href === router.pathname
                        ? 'font-semibold text-violet-500 before:bg-violet-500'
                        : 'text-slate-500 fill-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:fill-slate-600 hover:before:block dark:text-slate-400 dark:fill-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300 dark:hover:fill-slate-300'
                    )}
                  >
                    {link.title}{link.external && <svg xmlns="http://www.w3.org/2000/svg" className='inline w-3 lg:w-2.5 ml-1.5 -translate-y-[1px]' license="Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc." viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
