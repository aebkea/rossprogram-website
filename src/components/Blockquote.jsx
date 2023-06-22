import clsx from 'clsx'

export function Blockquote({ children, quoteless }) {
    return (
        <blockquote className={clsx(quoteless === "true" && "prose-quoteless")}>
            {children}
        </blockquote>
    )
}
