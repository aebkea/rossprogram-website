import ImageSet from './ImageSet'

import clsx from 'clsx';

import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default function ImageCarousel({className}) {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState('in')

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

    return (
        <div className={clsx(...className)}>
            <div className={clsx("w-[95%] mx-auto flex flex-col gap-4", fade === 'out' ? "animate-[fadeOut_900ms_ease-in-out_1_forwards]" : "animate-[fadeIn_900ms_ease-in-out_1]")}>
                <ImageSet count={3} index={index} />
            </div>
        </div>
    )
}