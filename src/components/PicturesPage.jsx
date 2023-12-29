// import { search, mapImageResources } from "@/lib/cloudinary"
import { useState, useEffect } from "react";
import Image from "next/image";
// import { CldImage } from 'next-cloudinary';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { scale } from "@cloudinary/url-gen/actions/resize";

import ImageModal from "@/components/ImageModal";

export function PicturesPage({ year }) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
  });

  const [imageOpen, setImageOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageWidth, setImageWidth] = useState(null)
  const [imageHeight, setImageHeight] = useState(null)

  function openImageModal(image) {
    setImageWidth(image.width)
    setImageHeight(image.height)
    setSelectedImage(image.url)
    setImageOpen(true)
  }

  const [images, setImages] = useState([])
  const [nextCursor, setNextCursor] = useState(undefined)
  const [totalCount, setTotalCount] = useState(0)
  const [activeFolder, setActiveFolder] = useState("2023")
  
  useEffect(() => {(async function run() {
      const results = await fetch('/api/cloudinary/search', {
        method: 'POST',
        body: JSON.stringify({
          expression: `folder="2023" AND resource_type=image`
        })
      })
      .then(r => r.json())

      console.log(results)

      setImages(results.images);
      setNextCursor(results.nextCursor);
      setTotalCount(results.totalCount);
    })();
  }, []);


  return (
    <>
      <ImageModal open={imageOpen} setOpen={setImageOpen} image={selectedImage} unoptimized={false} width={imageWidth} height={imageHeight} />
      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-2 pr-0 lg:pr-4 xl:pr-0">
        {images && images.map((image) => {
          const cldImage = cld.image(image.publicId)
            .resize(scale().width(512))
            .quality('auto')
            .format('auto')
          const url = cldImage.toURL()
          return (
            <ul key={image.assetId} className="">
              <div onClick={() => openImageModal(image)}>
                <div className="flex flex-col h-fit transition ease-in-out delay-50 hover:scale-105 duration-300 cursor-pointer">
                  <div className="relative grow w-full aspect-[3/2] rounded-md sm:rounded-xl overflow-hidden">
                    <Image src={url} alt="" className="object-cover" fill={true} unoptimized />
                  </div>
                </div>
              </div>
            </ul>
          )
        })}
      </div>
    </>
  )
}