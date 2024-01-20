import clsx from 'clsx';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useWindowSize } from '@/lib/utils';

import img1 from "@/images/side/_MG_0686.jpg"
import img2 from "@/images/side/_MG_0693.jpg"
import img3 from "@/images/side/_MG_0699.jpg"
import img4 from "@/images/side/9E8A0414.jpg"
import img5 from "@/images/side/9E8A0582.jpg"
import img6 from "@/images/side/9E8A0941.jpg"
import img7 from "@/images/side/9E8A2861.jpg"
import img8 from "@/images/side/9E8A1091.jpg"
import img9 from "@/images/side/9E8A1558.jpg"
import img12 from "@/images/side/_MG_0664.jpg"

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img12]
shuffle(images)

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function ImageSet({ count, index, openModal }) {
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
        <div key={index} onClick={() => openModal(image)} className="relative w-56 left-3 aspect-[3/2] rounded-lg shadow-md overflow-hidden ring-1 ring-slate-200/50 dark:ring-slate-950/50 transition ease-in-out delay-50 hover:scale-105 duration-300 cursor-pointer">
          <Image src={image} alt="" fill={true} placeholder="blur" sizes="224px" quality="50" className="object-cover" />
        </div>
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

export default function ImageCarousel({ className, openModal }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState('in')
  const [count, setCount] = useState(0)

  const windowSize = useWindowSize()

  useEffect(() => {
    const interval = setInterval(async () => {
      setFade('out')
      await delay(1000)
      setIndex(prevIndex => prevIndex + 1);
      await delay(50)
      setFade('in')
    }, 10000);

    return () => {
      clearInterval(interval)
    }
  }, []);

  useEffect(() => {
    const calculatedCount = Math.floor((windowSize.height - 110) / 182)
    // Change max count if number of images changes
    if (calculatedCount > images.length) {
      setCount(images.length)
    } else if (calculatedCount < 1) {
      setCount(1)
    } else {
      setCount(calculatedCount)
    }
  }, [windowSize]);

  return (
    <div className={clsx("w-full h-[calc(100vh-12.5rem)] mx-auto flex flex-col justify-between", fade === 'out' ? "animate-[fadeOut_900ms_ease-in-out_1_forwards]" : "animate-[fadeIn_900ms_ease-in-out_1]", ...className)}>
      <ImageSet count={count} index={index} openModal={openModal} />
    </div>
  )
}