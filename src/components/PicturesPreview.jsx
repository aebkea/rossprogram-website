import { useEffect, useState } from "react";

import { CldImage } from "@/components/CldImage";
import { useWindowSize } from "@/lib/utils";

import Link from "next/link";

import clsx from "clsx";

function ImageItem({ image }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-fit">
      <div className="relative grow w-full aspect-[3/2] rounded-[2rem] overflow-hidden ring-8 ring-white transition-all group-hover:ring-violet-200 duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/20 via-slate-200/20 to-slate-300/20 animate-pulse" />
        <div className={clsx("absolute inset-0 transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}>
          <CldImage src={image.publicId} transformation="c_fill,g_auto,w_512,ar_3:2" quality="auto" format="auto" alt="" className="object-cover" fill={true} onLoad={() => setIsLoaded(true)} />
        </div>
      </div>
    </div>
  );
}

export function PicturesPreview({ images, href }) {

  const windowSize = useWindowSize()
  const [reducedImages, setReducedImages] = useState([images.slice(0,6)])
  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(() => {
    if (windowSize.width < 700) {
      setReducedImages(images.slice(0,4))
      setSmallScreen(true)
    } else {
      setReducedImages(images.slice(0,6))
      setSmallScreen(false)
    }
  }, [windowSize, images])

  return (
    <div className="not-prose">
      <Link href={href}>
        <div className="group flex justify-start w-full h-[calc(14rem*2/3)] rounded-[2rem] pr-0 lg:pr-4 xl:pr-0 cursor-pointer">
          {images && reducedImages.map(image => (
            <div key={image.assetId} className={clsx("relative w-16 transition-all last-of-type:group-hover:w-56 duration-300 last-of-type:w-56 flex-shrink last-of-type:flex-none", smallScreen ? "w-[calc((100%-14rem)/3)]" : "group-hover:w-[calc((100%-14rem)/5)]")}>
              <div className="absolute left-0 w-56">
                <ImageItem image={image} />
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
