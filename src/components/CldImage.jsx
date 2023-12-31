import Image from "next/image";

import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

// eat unoptimized prop to prevent overriding
export function CldImage({ src, width, quality, format, transformation, fill, unoptimized, ...props }) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
  });

  const cldImage = cld.image(src)
  if (width) cldImage.resize(scale().width(width));
  if (quality) cldImage.quality(quality);
  if (format) cldImage.format(format);
  if (transformation) cldImage.addTransformation(transformation);

  const url = cldImage.toURL().split("?")[0];

  return (
    <Image src={url} unoptimized={true} width={!fill ? width : undefined} fill={fill} {...props} />
  );
}