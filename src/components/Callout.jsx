import clsx from 'clsx'

import { Icon } from '@/components/Icon'

const styles = {
  note: {
    container:
      'bg-violet-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    line:
      'bg-violet-200 dark:bg-violet-800',
    title: 'text-violet-900 dark:text-violet-400',
    body: 'text-violet-800 [--tw-prose-background:theme(colors.violet.50)] prose-a:text-violet-900 prose-code:text-violet-900 dark:text-slate-300 dark:prose-code:text-slate-300',
  },
  warning: {
    container:
      'bg-yellow-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
    line:
      'bg-yellow-200 dark:bg-yellow-800',
    title: 'text-yellow-900 dark:text-yellow-500',
    body: 'text-yellow-800 [--tw-prose-underline:theme(colors.yellow.400)] [--tw-prose-background:theme(colors.yellow.50)] prose-a:text-yellow-900 prose-code:text-yellow-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.violet.700)] dark:prose-code:text-slate-300',
  },
}

const icons = {
  note: (props) => <Icon icon="lightbulb" {...props} />,
  warning: (props) => <Icon icon="warning" color="amber" {...props} />,
}

export function Callout({ type = 'note', useIcon = true, title, children }) {
  let IconComponent = icons[type]

  return (
    <div className={clsx('relative my-8 p-4 flex', styles[type].container)}>
      { useIcon && <IconComponent className="h-8 w-8 flex-none" />}
      <span className={clsx('absolute inset-y-0 left-0 w-1', styles[type].line)} />
      <span className={clsx('absolute inset-y-0 right-0 w-1', styles[type].line)} />
      <div className={clsx("flex-auto", useIcon ? "ml-4" : "mx-2")}>
        <p className={clsx('m-0 font-display text-xl', styles[type].title)}>
          {title}
        </p>
        {children && (
          <div className={clsx('prose', title && 'mt-2.5', styles[type].body)}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
