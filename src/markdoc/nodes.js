import { nodes as defaultNodes } from '@markdoc/markdoc'

import { Fence } from '@/components/Fence'
import Link from 'next/link'

const nodes = {
  document: {
    render: undefined,
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th.attributes,
      scope: {
        type: String,
        default: 'col',
      },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
    },
  },
  heading: {
    ...defaultNodes.heading,
    attributes: {
      ...defaultNodes.heading.attributes,
      'shortheading': {
        type: String,
      },
    },
  },
  link: {
    ...defaultNodes.link,
    render: ({ href, children }) => {
      return (
        <Link href={href}>
          {children ? children : href}
        </Link>
      )
    }
  },
}

export default nodes
