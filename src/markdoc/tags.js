import { Callout } from '@/components/Callout'
import { Math } from '@/components/Math'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { Sponsor, Sponsors } from '@/components/Sponsors'
import { PaymentButton, PaymentButtons } from '@/components/PaymentButtons'
import { Blockquote } from '@/components/Blockquote'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
    attributes: {
      columns: {
        type: String,
        default: '2',
        matches: ['1', '2', '3', '4'],
        errorLevel: 'critical',
      },
    },
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      href: { type: String },
    },
  },
  'payment-buttons': {
    render: PaymentButtons,
    attributes: {
      columns: {
        type: String,
        default: '2',
        matches: ['1', '2', '3', '4'],
        errorLevel: 'critical',
      },
    },
  },
  'payment-button': {
    selfClosing: true,
    render: PaymentButton,
    attributes: {
      title: { type: String },
      description: { type: String },
      href: { type: String },
      checkoutMode: {
        type: String,
        default: 'payment',
      },
      priceId: { type: String },
      colStart: { type: String },
      colEnd: { type: String },
    },
  },
  'math': {
    render: Math,
    attributes: {
      type: {
        type: String,
        default: 'inline',
        matches: ['display', 'inline'],
        errorLevel: 'critical',
      },
    },
  },
  'sponsors': {
    render: Sponsors,
    attributes: {
      columns: {
        type: String,
        default: '2',
        matches: ['1', '2', '3', '4'],
        errorLevel: 'critical',
      }
    }
  },
  'sponsor': {
    selfClosing: true,
    render: Sponsor,
    attributes: {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      href: { type: String },
      alt: { type: String },
    },
  },
  'blockquote': {
    render: Blockquote,
    attributes: {
      quoteless: { type: String },
    },
  },
}

export default tags
