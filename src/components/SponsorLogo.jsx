import { useId } from 'react'
import clsx from 'clsx'

import { AMSLogo } from '@/components/logos/AMSLogo'
import { JaneStreetLogo } from '@/components/logos/JaneStreetLogo'
import { CakeShopCapital } from '@/components/logos/CakeShopCapital'

const logos = {
    ams: AMSLogo,
    janeStreet: JaneStreetLogo,
    cakeShopCapital: CakeShopCapital,
}

export function SponsorLogo({ logo, className, ...props }) {
    let id = useId()
    let LogoComponent = logos[logo]
    let color = "fill-slate-900 dark:fill-slate-300"

    return (
        <LogoComponent className={className} color={color} />
    )
}
