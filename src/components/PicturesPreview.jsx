import { useState } from "react";

import { CldImage } from "@/components/CldImage";

import clsx from "clsx";

function ImageItem({ image }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col h-fit transition-all hover:scale-110 duration-300 delay-50 peer-hover:scale-50">
      <div className="relative grow w-full aspect-[3/2] rounded-[2rem] ring-8 ring-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/20 via-slate-200/20 to-slate-300/20 animate-pulse" />
        <div className={clsx("absolute inset-0 transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}>
          <CldImage src={image.publicId} transformation="c_fill,g_auto,w_512,ar_3:2" quality="auto" format="auto" alt="" className="object-cover" fill={true} onLoad={() => setIsLoaded(true)} />
        </div>
      </div>
    </div>
  );
}

export function PicturesPreview({ images }) {

  const reducedImages = images.slice(0,6)

  return (
    <>
      <div className="not-prose group flex justify-start w-full h-[calc(14rem*2/3)] rounded-[2rem] pr-0 lg:pr-4 xl:pr-0 cursor-pointer">
        {images && reducedImages.map(image => (
          <div className="relative w-16 transition-all group-hover:w-[calc((100%-14rem)/5)] last-of-type:group-hover:w-56 duration-300 last-of-type:w-56 flex-shrink last-of-type:flex-none">
            <div className="absolute left-0 w-56">
              <ImageItem key={image.assetId} image={image} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
