import clsx from 'clsx'

export function PaymentButtons({ columns, children }) {
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

export function PaymentButton({ title, description, priceId, colStart, colEnd }) {
    return (
        <div className={clsx("group relative grid content-center rounded-xl border border-slate-200 dark:border-slate-800",
          colEnd === "1" ? "sm:col-start-1" :
            colEnd === "2" ? "sm:col-start-2" :
              colEnd === "3" ? "sm:col-start-3" :
                colEnd === "4" ? "sm:col-start-4" : "",
          colStart === "1" ? "sm:col-end-1" :
            colStart === "2" ? "sm:col-end-2" :
              colStart === "3" ? "sm:col-end-3" :
                colStart === "4" ? "sm:col-end-4" : "")}>
                              
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
                <p className={clsx("text-sm text-slate-700 dark:text-slate-400", description === undefined | description === "" ? "" : "mt-1")}>
                    {description}
                </p>
            </div>
        </div>
    )
}
