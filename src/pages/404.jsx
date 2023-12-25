import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function NotFound() {

  const router = useRouter()

  useEffect(() => {router.replace("/404")}, [router])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-violet-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}