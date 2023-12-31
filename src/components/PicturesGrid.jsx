import { useState } from "react";

import { CldImage } from "@/components/CldImage";

import ImageModal from "@/components/ImageModal";
import clsx from "clsx";

function ImageItem({ image, openImageModal }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div onClick={() => openImageModal(image)}>
      <div className="flex flex-col h-fit transition ease-in-out delay-50 hover:scale-105 duration-300 cursor-pointer">
        <div className="relative grow w-full aspect-[3/2] rounded-md sm:rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/20 via-slate-200/20 to-slate-300/20 animate-pulse" />
          <div className={clsx("absolute inset-0 transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}>
            <CldImage src={image} width="512" quality="auto" format="auto" alt="" className="object-cover" fill={true} onLoad={() => setIsLoaded(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PicturesGrid({ images, count }) {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  function openImageModal(image) {
    setImageWidth(image.width);
    setImageHeight(image.height);
    setSelectedImage(image.url);
    setImageOpen(true);
  }

  const reducedImages = count > 0 ? images.slice(0,count) : images;

  return (
    <>
      <ImageModal open={imageOpen} setOpen={setImageOpen} image={selectedImage} unoptimized={false} width={imageWidth} height={imageHeight} />
      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-4 pr-0 lg:pr-4 xl:pr-0">
        {images && reducedImages.map(image => (
          <ImageItem key={image.assetId} image={image} openImageModal={openImageModal} />
        ))}
      </div>
    </>
  );
}
