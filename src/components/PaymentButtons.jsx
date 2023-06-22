import clsx from 'clsx'

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    `${process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY}`
)

export function PaymentButtons({ columns, children }) {
    return (
        <div className={clsx("not-prose my-12 grid grid-cols-1 gap-6", "sm:grid-cols-".concat(columns))}>
            {children}
        </div>
    )
}

export function PaymentButton({ title, description, priceId }) {
    return (
        <div className="group relative grid content-center rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.violet.50)),var(--quick-links-hover-bg,theme(colors.violet.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.violet.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
                <h2 className={clsx("text-3xl text-slate-900 dark:text-white")}>
                    <form action="/api/checkout_sessions" method="POST">
                        <input type="hidden" id="priceId" name="priceId" readonly value={priceId} />
                        <button type="submit">
                            <span className="absolute -inset-px rounded-xl" />
                            {title}
                        </button>
                    </form>
                </h2>
                <p className={clsx("text-sm text-slate-700 dark:text-slate-400", description === undefined ? "" : "mt-1")}>
                    {description}
                </p>
            </div>
        </div>
    )
}
