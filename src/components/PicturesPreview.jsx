import { useState } from "react";

import { CldImage } from "@/components/CldImage";

import ImageModal from "@/components/ImageModal";
import clsx from "clsx";

function ImageItem({ image, openImageModal }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div onClick={() => openImageModal(image)}>
      <div className="flex flex-col h-fit">
        <div className="relative grow w-full aspect-[3/2] rounded-[2rem] ring-8 ring-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/20 via-slate-200/20 to-slate-300/20 animate-pulse" />
          <div className={clsx("absolute inset-0 transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}>
            <CldImage src={image.publicId} transformation="c_fill,g_auto,w_512,ar_3:2" quality="auto" format="auto" alt="" className="object-cover" fill={true} onLoad={() => setIsLoaded(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PicturesPreview({ images, count }) {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function openImageModal(image) {
    setSelectedImage(image);
    setImageOpen(true);
  }

  const reducedImages = count > 0 ? images.slice(0,count) : images;

  return (
    <>
      <div className="not-prose flex justify-start -space-x-32 w-[80%] h-[calc(14rem*2/3)] rounded-[2rem] pr-0 lg:pr-4 xl:pr-0 transition-all hover:w-full hover:-space-x-[6.3rem] duration-300">
        {images && reducedImages.map(image => (
          <div className="relative w-56 transition-all duration-300">
            <ImageItem key={image.assetId} image={image} openImageModal={openImageModal} />
          </div>
        ))}
      </div>
    </>
  );
}
