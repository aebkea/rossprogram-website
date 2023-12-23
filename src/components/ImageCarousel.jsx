import ImageSet from './ImageSet'

import clsx from 'clsx';

import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default function ImageCarousel({className, openModal}) {
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
        const count = calculatedCount === 0 ? 5 : calculatedCount
        setCount(count)
    }, [windowSize]);

    return (
        <div className={clsx("w-full h-[calc(100vh-12.5rem)] ml-4 mx-auto flex flex-col justify-between", fade === 'out' ? "animate-[fadeOut_900ms_ease-in-out_1_forwards]" : "animate-[fadeIn_900ms_ease-in-out_1]", ...className)}>
            <ImageSet count={count} index={index} openModal={openModal} />
        </div>
    )
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}