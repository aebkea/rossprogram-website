import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { Logo, Logomark } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { ThemeSelector } from '@/components/ThemeSelector'
// import { Search } from './Search'
import ImageCarousel from './ImageCarousel'
import ImageModal from './ImageModal'

export const navigation = [
  {
    title: 'Overview',
    href: '/',
    colorLink: false,
    links: [
      { title: 'Introduction', href: '/' },
      { title: 'Mission Statement', href: '/mission-statement' },
      { title: 'History', href: '/history' },
      { title: 'Contribute', href: '/contribute' },
      { title: 'Pictures', href: '/pictures' },
      { title: 'Merch Store', href: 'https://store.rossprogram.org', external: true },
    ],
  },
  {
    title: 'Participants',
    href: '/participants',
    colorLink: true,
    links: [
      { title: 'Math at Ross', href: '/participants/math-at-ross' },
      { title: 'Life at Ross', href: '/participants/life-at-ross' },
      { title: 'FAQ', href: '/participants/faq' },
      { title: 'Application and Financial Aid', href: '/participants/to-apply' },
    ],
  },
  {
    title: 'Counselors',
    href: '/counselors',
    colorLink: true,
    links: [
      { title: 'Responsibilities', href: '/counselors/responsibilities' },
      { title: 'Administrators', href: '/counselors/administrators' },
      { title: 'To Apply', href: '/counselors/to-apply' },
    ],
  },
  {
    title: 'Alumni',
    href: '/alumni',
    colorLink: true,
    links: [
      { title: 'News and Comments', href: '/alumni/news-and-comments'},
      { title: 'Ross Anecdotes', href: '/alumni/anecdotes' },
    ],
  },
]

function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <Logomark className="h-7 w-auto fill-slate-800 dark:fill-violet-100 lg:hidden" />
          <Logo className="hidden h-9 w-auto fill-slate-800 dark:fill-violet-100 lg:block" />
        </Link>
      </div>
      {/* <div className="hidden md:block -my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div> */}
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
        <ThemeSelector className="relative z-10" />
        {/* <Link href="https://github.com" className="group" aria-label="GitHub">
          <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link> */}
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ children, title, sectionTitle, tableOfContents }) {
  let router = useRouter()
  let isHomePage = router.pathname === '/'
  let section = sectionTitle ?? navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  useEffect(() => {
    // Check to see if this is a redirect back from checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Donation placed!');
    }
    if (query.get('canceled')) {
      console.log('Donation canceled.')
    }
  }, []);

  const [imageOpen, setImageOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  function openImageModal(image) {
    setSelectedImage(image)
    setImageOpen(true)
  }

  return (
    <>
      <ImageModal open={imageOpen} setOpen={setImageOpen} image={selectedImage} />
      <Header navigation={navigation} />

      {isHomePage && <Hero openModal={openImageModal} />}
      {!isHomePage && <div className="-mt-1" />}
      
      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <Navigation navigation={navigation} />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-violet-500">
                    {section.title ?? section}
                  </p>
                )}
                {title && (
                  <h1 className="font-display font-medium text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-violet-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.shortTitle == null ? section.title : section.shortTitle}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-violet-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.shortTitle == null ? subSection.title : subSection.shortTitle}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
          {tableOfContents.length === 0 && (
            <ImageCarousel className="hidden xl:block" openModal={openImageModal} />
          )}
        </div>
      </div>
    </>
  )
}
