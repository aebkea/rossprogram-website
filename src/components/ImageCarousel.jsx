import ImageSet from './ImageSet'

import clsx from 'clsx';

import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'


export default function ImageCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => prevIndex + 1);
        }, 10000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <div className="hidden xl:w-[95%] xl:mx-auto xl:flex xl:flex-col xl:gap-4 xl:animate-carouselFade">
            <ImageSet count={3} index={index} />
        </div>
    )
}