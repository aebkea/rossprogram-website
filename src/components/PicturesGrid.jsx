import { useState } from "react";
import Image from "next/image";

import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

import ImageModal from "@/components/ImageModal";
import clsx from "clsx";

// New ImageItem component
function ImageItem({ image, openImageModal }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate Cloudinary URL
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
  });
  const cldImage = cld.image(image.publicId)
    .resize(scale().width(512))
    .quality('auto')
    .format('auto');
  const url = cldImage.toURL().split("?")[0];

  return (
    <div onClick={() => openImageModal(image)}>
      <div className="flex flex-col h-fit transition ease-in-out delay-50 hover:scale-105 duration-300 cursor-pointer">
        <div className="relative grow w-full aspect-[3/2] rounded-md sm:rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-300/20 via-slate-200/20 to-slate-300/20 animate-pulse" />
          <div className={clsx("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}>
            <Image src={url} alt="" className="object-cover" fill={true} onLoad={() => setIsLoaded(true)} unoptimized />
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated PicturesGrid component
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
