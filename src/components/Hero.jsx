import { Fragment } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Math } from '@/components/Math'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import hero from '@/images/hero.png'
import heroFull from '@/images/hero_full.jpg'

const codeLanguage = 'javascript'
const code = `export default {
  strategy: 'predictive',
  engine: {
    cpus: 12,
    backups: ['./storage/cache.wtf'],
  },
}`

const tabs = [
  { name: 'cache-advance.config.js', isActive: true },
  { name: 'package.json', isActive: false },
]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero({ openModal }) {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurIndigoImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <p className="inline bg-gradient-to-r from-fuchsia-200 via-violet-400 to-fuchsia-200 bg-clip-text font-display font-medium text-4xl min-[434px]:text-5xl tracking-tight text-transparent">
                Ross Mathematics Program
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                Think deeply about simple things.
              </p>
              {/* <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href="/">Get started</Button>
                <Button href="/" variant="secondary">
                  View on GitHub
                </Button>
              </div> */}
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+6rem)] lg:right-0 lg:[mask-image:none]">
              <div className="relative h-full w-full [mask-image:linear-gradient(90deg,white_0%_50%,transparent_100%)]">
                <HeroBackground className="absolute left-0 -translate-y-32 -translate-x-16 lg:-translate-x-16 lg:-translate-y-3" />
              </div>
            </div>
            <div className="relative">
              <Image
                className="absolute -right-64 -top-64"
                src={blurIndigoImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -bottom-40 -right-44"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-300 via-violet-300/70 to-purple-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-300 via-violet-300/70 to-purple-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur transition ease-in-out delay-50 hover:scale-105 duration-300 cursor-pointer" onClick={() => openModal(heroFull)}>
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-violet-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-purple-400/0 via-purple-400 to-purple-400/0" />
                <div className="overflow-hidden rounded-2xl">
                  <Image className="w-full h-full" width="750" height="290" src={hero} alt="Ross/Ohio 2023 group photo" priority={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
