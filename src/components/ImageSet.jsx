import Image from 'next/image';
import { useState } from 'react';

import img1 from "@/images/side/_MG_0686.jpg"
import img2 from "@/images/side/_MG_0693.jpg"
import img3 from "@/images/side/_MG_0699.jpg"
import img4 from "@/images/side/9E8A0414.jpg"
import img5 from "@/images/side/9E8A0582.jpg"
import img6 from "@/images/side/9E8A0941.jpg"
import img7 from "@/images/side/9E8A2861.jpg"
import { useEffect } from 'react';

const images = [img1, img2, img3, img4, img5, img6, img7]
shuffle(images)

export default function ImageSet({count, index, openModal}) {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const indexArray = [(count * index) % (images.length), (count * (index + 1)) % (images.length)]
    if (indexArray[0] < indexArray[1]) {
      setRandomImages(images.slice(...indexArray));
    } else {
      setRandomImages([...images.slice(indexArray[0], images.length), ...images.slice(0, indexArray[1])])
    }
  }, [count, index]);

  return (
    <>
      {randomImages.map((image, index) => (
        <button key={index} onClick={() => openModal(image)} className="relative w-56 aspect-[3/2] rounded-lg ring-1 ring-slate-200 dark:ring-slate-800 shadow-md overflow-hidden transition ease-in-out delay-50 hover:scale-110 duration-300">
          <Image src={image} fill={true} sizes="224px" className="object-cover" />
        </button>
      ))}
    </>
  )
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}