import ImageSet from './ImageSet'

import clsx from 'clsx';

import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'


export default function ImageCarousel({className}) {
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
        <div className={clsx(...className)}>
            <div key={index} className="w-[95%] mx-auto flex flex-col gap-4 animate-carouselFade">
                <ImageSet count={3} index={index} />
            </div>
        </div>
    )
}