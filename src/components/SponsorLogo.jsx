import { useId } from 'react'
import clsx from 'clsx'

import { AMSLogo } from '@/components/logos/AMSLogo'

const logos = {
    ams: AMSLogo,
}

const logoStyles = {
    violet: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
    amber: '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]',
}

export function SponsorLogo({ color = 'violet', logo, className, ...props }) {
    let id = useId()
    let LogoComponent = logos[logo]

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            fill="none"
            className={clsx(className, logoStyles[color])}
            {...props}
        >
            <LogoComponent id={id} />
        </svg>
    )
}

export function LightMode({ className, ...props }) {
    return <g className={clsx('dark:hidden', className)} {...props} />
}

export function DarkMode({ className, ...props }) {
    return <g className={clsx('hidden dark:inline', className)} {...props} />
}
