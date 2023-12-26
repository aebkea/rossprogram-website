import Link from 'next/link'

import clsx from 'clsx'

import { SponsorLogo } from '@/components/SponsorLogo'

export function Sponsors({ columns, children }) {
    return (
        <div className={clsx("not-prose my-12 grid grid-cols-1 gap-6", "sm:grid-cols-".concat(columns))}>
            {children}
        </div>
    )
}

export function Sponsor({ title, description, href, logo, alt }) {
    return (
        <Link href={href} className="group relative grid content-center rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.violet.50)),var(--quick-links-hover-bg,theme(colors.violet.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.violet.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
                <SponsorLogo logo={logo} className={clsx("mx-auto", logo === "cakeShopCapital" ? "w-2/3" : "w-full")} />
                <p className="sr-only">{alt}</p>
                <h2 className={clsx("font-display text-base text-slate-900 dark:text-white", title === undefined ? "" : "mt-4")}>
                    {title}
                </h2>
                <p className={clsx("text-sm text-slate-700 dark:text-slate-400", description === undefined ? "" : "mt-1")}>
                    {description}
                </p>
            </div>
        </Link>
    )
}
