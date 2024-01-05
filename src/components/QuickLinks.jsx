import Link from 'next/link'

import clsx from 'clsx'

export function QuickLinks({ columns, children }) {
  return (
    <div className={clsx("not-prose my-12 grid grid-cols-1 gap-6",
      columns === "1" ? "sm:grid-cols-1" :
      columns === "2" ? "sm:grid-cols-2" :
      columns === "3" ? "sm:grid-cols-3" :
      columns === "4" ? "sm:grid-cols-4" : ""
      )
    }>
      {children}
    </div>
  )
}

export function QuickLink({ title, description, href }) {
  return (
    <div className="not-prose group relative rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.violet.50)),var(--quick-links-hover-bg,theme(colors.violet.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.violet.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <h2 className="font-display text-xl font-medium text-slate-900 dark:text-white">
          <Link href={href}>
            <span className="absolute -inset-px rounded-xl" />
            {title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  )
}
